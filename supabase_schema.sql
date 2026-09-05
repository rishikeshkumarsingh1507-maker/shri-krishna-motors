-- =========================================================================
-- SHRI KRISHNA MOTORS - SUPABASE DATABASE SCHEMA & SEED DATA
-- Dealership: Shri Krishna Motors, Daltonganj, Jharkhand
-- Managing Director: Abhishek Verma
-- =========================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. CARS TABLE (Live Inventory & Certified Vehicles)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cars (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  model_year INTEGER NOT NULL,
  fuel TEXT NOT NULL DEFAULT 'Petrol',
  transmission TEXT NOT NULL DEFAULT 'Manual',
  range_driven INTEGER NOT NULL DEFAULT 0,
  ownership TEXT NOT NULL DEFAULT '1st Owner',
  accidental TEXT NOT NULL DEFAULT 'Non-Accidental Certified',
  mileage TEXT DEFAULT '18.0 km/l',
  price BIGINT NOT NULL DEFAULT 0,
  starting_bid BIGINT NOT NULL DEFAULT 0,
  current_bid BIGINT NOT NULL DEFAULT 0,
  bid_enabled BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'Available',
  photos JSONB NOT NULL DEFAULT '[]'::jsonb,
  video TEXT DEFAULT '',
  description TEXT DEFAULT '',
  insurance_validity TEXT DEFAULT 'Valid',
  rc_status TEXT DEFAULT 'Verified & Transferable (JH-03)',
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 2. BIDS TABLE (Live Digital Auctions & Bid History)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bids (
  id TEXT PRIMARY KEY,
  car_id TEXT NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  car_title TEXT NOT NULL,
  bidder_name TEXT NOT NULL,
  bidder_phone TEXT NOT NULL,
  bidder_email TEXT,
  amount BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active Top Bid',
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 3. SELL REQUESTS TABLE (Customer Inbound Vehicle Submissions)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sell_requests (
  id TEXT PRIMARY KEY,
  seller_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand TEXT,
  car_name TEXT,
  model_year TEXT,
  fuel TEXT,
  range_driven TEXT,
  ownership TEXT,
  expected_price TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 4. DEALERSHIP USERS TABLE (Accounts & Roles: Owner, Admin, Visitor)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dealership_users (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'visitor',
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 5. INQUIRIES & TEST DRIVE REQUESTS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  car_id TEXT,
  inquiry_type TEXT DEFAULT 'general',
  message TEXT,
  status TEXT DEFAULT 'New',
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allows smooth public interaction while keeping dealership secure
-- -------------------------------------------------------------------------
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sell_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealership_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- CARS: Public can read, anyone with API key can insert/update for dealership operations
CREATE POLICY "Allow public read on cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Allow public insert on cars" ON public.cars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on cars" ON public.cars FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on cars" ON public.cars FOR DELETE USING (true);

-- BIDS: Public can read bids and insert their bids
CREATE POLICY "Allow public read on bids" ON public.bids FOR SELECT USING (true);
CREATE POLICY "Allow public insert on bids" ON public.bids FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on bids" ON public.bids FOR UPDATE USING (true);

-- SELL REQUESTS: Public can submit requests; admin can read/update
CREATE POLICY "Allow public read on sell_requests" ON public.sell_requests FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sell_requests" ON public.sell_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on sell_requests" ON public.sell_requests FOR UPDATE USING (true);

-- USERS: Public can register and read user info, owner can manage and delete
CREATE POLICY "Allow public read on users" ON public.dealership_users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on users" ON public.dealership_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on users" ON public.dealership_users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on users" ON public.dealership_users FOR DELETE USING (true);

-- INQUIRIES: Public can submit contact messages and test drives
CREATE POLICY "Allow public read on inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public insert on inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- -------------------------------------------------------------------------
-- REALTIME SUBSCRIPTIONS
-- Enable Supabase Realtime for instant bid and car status broadcasting
-- -------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'bids'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'cars'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cars;
  END IF;
END $$;

-- -------------------------------------------------------------------------
-- SEED DATA: Certified Initial Cars Inventory (Retaining 2 Cars from Document)
-- -------------------------------------------------------------------------
INSERT INTO public.cars (id, title, brand, model, model_year, fuel, transmission, range_driven, ownership, accidental, mileage, price, starting_bid, current_bid, bid_enabled, status, photos, video, description, insurance_validity, rc_status, created_date)
VALUES
(
  'car-nexon',
  'Tata Nexon XZ+ (O) Diesel',
  'Tata',
  'Nexon XZ+',
  2022,
  'Diesel',
  'Manual',
  24500,
  '1st Owner',
  'Non-Accidental Certified',
  '21.5 km/l',
  875000,
  780000,
  815000,
  true,
  'Available',
  '["/images/cars/tata-nexon/nexon-1.jpg", "/images/cars/tata-nexon/nexon-2.jpg", "/images/cars/tata-nexon/nexon-3.jpg"]'::jsonb,
  '',
  'Immaculate Tata Nexon XZ+ in deep royal blue. Single hand owner, 100% genuine service records from Tata Motors Daltonganj. Equipped with Harman premium sound system, electric sunroof, projector headlamps, cooled glovebox, and dual front airbags. Non-accidental certified with active comprehensive insurance.',
  'Nov 2026',
  'Verified & Transferable (JH-03)',
  NOW() - INTERVAL '7 days'
),
(
  'car-swift',
  'Maruti Suzuki Swift VXi',
  'Maruti',
  'Swift VXi',
  2021,
  'Petrol',
  'Manual',
  31000,
  '1st Owner',
  'Non-Accidental Certified',
  '22.8 km/l',
  540000,
  470000,
  500000,
  true,
  'Available',
  '["/images/cars/maruti-swift/swift-1.jpg", "/images/cars/maruti-swift/swift-2.jpg", "/images/cars/maruti-swift/swift-3.jpg"]'::jsonb,
  '',
  'Sizzling Solid Fire Red Maruti Suzuki Swift VXi. Excellent fuel efficiency, flawless mechanical and suspension condition. Fitted with OEM touchscreen audio, central locking, reverse parking sensors, power windows on all 4 doors, and brand new Michelin tires.',
  'Oct 2026',
  'Verified (JH-03)',
  NOW() - INTERVAL '5 days'
)
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- SEED DATA: Initial Bids
-- -------------------------------------------------------------------------
INSERT INTO public.bids (id, car_id, car_title, bidder_name, bidder_phone, bidder_email, amount, status, created_date)
VALUES
('bid-101', 'car-nexon', 'Tata Nexon XZ+ (O) Diesel', 'Rahul Tiwari', '+91 98351 44521', 'rahul.tiwari@gmail.com', 815000, 'Active Top Bid', NOW() - INTERVAL '2 hours'),
('bid-102', 'car-nexon', 'Tata Nexon XZ+ (O) Diesel', 'Pramod Singh', '+91 87091 12345', 'pramod.singh@yahoo.com', 790000, 'Outbid', NOW() - INTERVAL '1 day'),
('bid-103', 'car-swift', 'Maruti Suzuki Swift VXi', 'Pooja Kumari', '+91 70045 66781', 'pooja.k@gmail.com', 500000, 'Active Top Bid', NOW() - INTERVAL '4 hours')
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- SEED DATA: Dealership Users
-- -------------------------------------------------------------------------
INSERT INTO public.dealership_users (id, full_name, email, phone, role, created_date)
VALUES
('user-owner', 'Abhishek Verma (Managing Director)', 'shreekrishnamotors19@gmail.com', '+91 93042 35814', 'owner', NOW()),
('user-admin-1', 'Rajesh Kumar (Dealership Admin)', 'admin.daltonganj@shreekrishnamotors.com', '+91 79031 91067', 'admin', NOW()),
('user-visitor-1', 'Rohan Sharma', 'rohan.sharma@gmail.com', '+91 98000 12345', 'visitor', NOW())
ON CONFLICT (id) DO NOTHING;
