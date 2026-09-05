import { createClient } from '@supabase/supabase-js';

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verify if actual credentials have been provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-ref') &&
  !supabaseUrl.includes('placeholder') &&
  supabaseUrl.startsWith('https://')
);

// Initialize client if configured; otherwise create safe dummy or inactive client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;

/**
 * Diagnostic helper to test Supabase connection
 */
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      configured: false,
      message: 'Supabase credentials not configured in .env.local'
    };
  }

  try {
    const { data, error } = await supabase.from('cars').select('id').limit(1);
    if (error) {
      // Table might not exist yet
      if (error.code === '42P01') {
        return {
          success: false,
          configured: true,
          tableMissing: true,
          message: 'Connected to Supabase, but "cars" table is missing. Run the schema.sql in Supabase SQL Editor.'
        };
      }
      return {
        success: false,
        configured: true,
        message: `Supabase Error: ${error.message}`
      };
    }

    return {
      success: true,
      configured: true,
      message: 'Successfully connected to Supabase live database!'
    };
  } catch (err) {
    return {
      success: false,
      configured: true,
      message: `Connection test failed: ${err.message}`
    };
  }
};

/**
 * Cars Database Operations
 */
export const dbFetchCars = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_date', { ascending: false });
  if (error) throw error;
  return data;
};

export const dbAddCar = async (car) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('cars')
    .insert([car])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const dbUpdateCar = async (id, updates) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const dbDeleteCar = async (id) => {
  if (!supabase) return null;
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

/**
 * Bids Database Operations
 */
export const dbFetchBids = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('bids')
    .select('*')
    .order('created_date', { ascending: false });
  if (error) throw error;
  return data;
};

export const dbSaveBid = async (bid) => {
  if (!supabase) return null;
  // Insert new bid
  const { data, error } = await supabase
    .from('bids')
    .insert([bid])
    .select()
    .single();
  if (error) throw error;

  // Update previous bids on this car to 'Outbid'
  await supabase
    .from('bids')
    .update({ status: 'Outbid' })
    .eq('car_id', bid.car_id)
    .neq('id', bid.id);

  // Update car current_bid in database
  await supabase
    .from('cars')
    .update({ current_bid: bid.amount })
    .eq('id', bid.car_id);

  return data;
};

export const dbResetCarBids = async (carId, startingBid) => {
  if (!supabase) return null;
  await supabase
    .from('bids')
    .update({ status: 'Archived / Reset' })
    .eq('car_id', carId);

  await supabase
    .from('cars')
    .update({ current_bid: startingBid || 0 })
    .eq('id', carId);

  return true;
};

export const dbResetAllBids = async () => {
  if (!supabase) return null;
  await supabase
    .from('bids')
    .update({ status: 'Archived / Reset' });

  // Reset cars current_bid to starting_bid
  const { data: allCars } = await supabase.from('cars').select('id, starting_bid');
  if (allCars) {
    for (const car of allCars) {
      await supabase
        .from('cars')
        .update({ current_bid: car.starting_bid || 0 })
        .eq('id', car.id);
    }
  }
  return true;
};

/**
 * Sell Requests Database Operations
 */
export const dbFetchSellRequests = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('sell_requests')
    .select('*')
    .order('created_date', { ascending: false });
  if (error) throw error;
  return data;
};

export const dbSaveSellRequest = async (requestData) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('sell_requests')
    .insert([requestData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const dbUpdateSellRequestStatus = async (id, status) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('sell_requests')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/**
 * Users Database Operations
 */
export const dbFetchUsers = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('dealership_users')
    .select('*')
    .order('created_date', { ascending: false });
  if (error) throw error;
  return data;
};

export const dbSaveUser = async (user) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('dealership_users')
    .upsert([user], { onConflict: 'email' })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const dbUpdateUserRole = async (id, role) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('dealership_users')
    .update({ role })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const dbDeleteUser = async (id) => {
  if (!supabase) return null;
  const { error } = await supabase
    .from('dealership_users')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

