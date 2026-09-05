-- Reference to root schema file
-- Run this SQL in your Supabase project's SQL Editor (https://supabase.com/dashboard/project/_/sql)
\i ../supabase_schema.sql

-- -------------------------------------------------------------------------
-- SEED DATA: Certified Initial Cars Inventory
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
),
(
  'car-scorpio-n',
  'Mahindra Scorpio-N Z8L Diesel 4x4',
  'Mahindra',
  'Scorpio-N Z8L',
  2023,
  'Diesel',
  'Automatic',
  18200,
  '1st Owner',
  'Non-Accidental Certified',
  '16.2 km/l',
  2150000,
  1950000,
  2025000,
  true,
  'Available',
  '["/images/cars/mahindra-scorpio-n/scorpio-1.jpg", "/images/cars/mahindra-scorpio-n/scorpio-2.jpg", "/images/cars/mahindra-scorpio-n/scorpio-3.jpg"]'::jsonb,
  '',
  'Flagship Mahindra Scorpio-N Z8L 4x4 Automatic in deep metallic Napoli Black. Powered by the potent 2.2L mHawk diesel engine generating 175 PS & 400 Nm torque. Features Sony 12-speaker 3D immersive audio, electric sunroof, dual-zone climate control, rich coffee-black leatherette upholstery, wireless smartphone charger, and intelligent 4XPLOR terrain modes. Fully verified non-accidental with active manufacturer warranty.',
  'Jan 2027',
  'Verified & Transferable (JH-03)',
  NOW() - INTERVAL '3 days'
),
(
  'car-creta',
  'Hyundai Creta SX (O) Diesel AT',
  'Hyundai',
  'Creta SX (O)',
  2023,
  'Diesel',
  'Automatic',
  22400,
  '1st Owner',
  'Non-Accidental Certified',
  '18.5 km/l',
  1580000,
  1420000,
  1490000,
  true,
  'Available',
  '["/images/cars/hyundai-creta/creta-1.jpg", "/images/cars/hyundai-creta/creta-2.jpg", "/images/cars/hyundai-creta/creta-3.jpg"]'::jsonb,
  '',
  'Top-of-the-line Hyundai Creta SX (O) Diesel Automatic in pristine Titan Grey metallic. Equipped with voice-controlled panoramic sunroof, ventilated front seats, 10.25-inch touchscreen infotainment with premium Bose 8-speaker sound system, digital instrument cluster, 6 airbags, and electronic parking brake with auto-hold. Non-accidental certified with zero claims.',
  'Dec 2026',
  'Verified & Transferable (JH-03)',
  NOW() - INTERVAL '2 days'
)
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- SEED DATA: Initial Bids
-- -------------------------------------------------------------------------
INSERT INTO public.bids (id, car_id, car_title, bidder_name, bidder_phone, bidder_email, amount, status, created_date)
VALUES
('bid-101', 'car-nexon', 'Tata Nexon XZ+ (O) Diesel', 'Rahul Tiwari', '+91 98351 44521', 'rahul.tiwari@gmail.com', 815000, 'Active Top Bid', NOW() - INTERVAL '2 hours'),
('bid-102', 'car-nexon', 'Tata Nexon XZ+ (O) Diesel', 'Pramod Singh', '+91 87091 12345', 'pramod.singh@yahoo.com', 790000, 'Outbid', NOW() - INTERVAL '1 day'),
('bid-103', 'car-swift', 'Maruti Suzuki Swift VXi', 'Pooja Kumari', '+91 70045 66781', 'pooja.k@gmail.com', 500000, 'Active Top Bid', NOW() - INTERVAL '4 hours'),
('bid-104', 'car-scorpio-n', 'Mahindra Scorpio-N Z8L Diesel 4x4', 'Vikramaditya Sahay', '+91 94311 88990', 'vikram.sahay@gmail.com', 2025000, 'Active Top Bid', NOW() - INTERVAL '1 hour'),
('bid-105', 'car-creta', 'Hyundai Creta SX (O) Diesel AT', 'Alok Ranjan Singh', '+91 93344 11223', 'alok.singh@gmail.com', 1490000, 'Active Top Bid', NOW() - INTERVAL '30 minutes')
ON CONFLICT (id) DO NOTHING;
