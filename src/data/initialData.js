export const dealerInfo = {
  name: "Shri Krishna Motors",
  tagline: "Used Car • Buy • Sell • Exchange",
  established: "2021",
  md: "Abhishek Verma",
  address: "Hawai Adda, In Front of Chiyanki, Ranchi Road, Daltonganj Kutchary, Daltonganj, Palamu – 822101, Jharkhand",
  city: "Daltonganj, Jharkhand",
  phone: "+91 93042 35814",
  phone2: "+91 79031 91067",
  email: "shreekrishnamotors19@gmail.com",
  instagram: "https://instagram.com/shreekrishnamotors19",
  facebook: "https://facebook.com/shreekrishnamotors19",
  whatsapp: "https://wa.me/919304235814",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM",
  rating: "4.4",
  reviewsCount: "140+",
  mapQuery: "Shree Krishna Motors Daltonganj Ranchi Road Chiyanki",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14592.549244670208!2d84.072218!3d24.037145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398c715555555555%3A0x123456789abcdef!2sShree%20Krishna%20Motors%20Daltonganj!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const initialCars = [
  {
    id: "car-nexon",
    title: "Tata Nexon XZ+ (O) Diesel",
    brand: "Tata",
    model: "Nexon XZ+",
    model_year: 2022,
    fuel: "Diesel",
    transmission: "Manual",
    range_driven: 24500,
    ownership: "1st Owner",
    accidental: "Non-Accidental Certified",
    mileage: "21.5 km/l",
    price: 875000,
    starting_bid: 780000,
    current_bid: 815000,
    bid_enabled: true,
    status: "Available",
    photos: [
      "/images/cars/tata-nexon/nexon-1.jpg",
      "/images/cars/tata-nexon/nexon-2.jpg",
      "/images/cars/tata-nexon/nexon-3.jpg"
    ],
    video: "",
    description: "Immaculate Tata Nexon XZ+ in deep royal blue. Single hand owner, 100% genuine service records from Tata Motors Daltonganj. Equipped with Harman premium sound system, electric sunroof, projector headlamps, cooled glovebox, and dual front airbags. Non-accidental certified with active comprehensive insurance.",
    insurance_validity: "Nov 2026",
    rc_status: "Verified & Transferable (JH-03)",
    created_date: "2026-08-28T10:00:00Z"
  },
  {
    id: "car-swift",
    title: "Maruti Suzuki Swift VXi",
    brand: "Maruti",
    model: "Swift VXi",
    model_year: 2021,
    fuel: "Petrol",
    transmission: "Manual",
    range_driven: 31000,
    ownership: "1st Owner",
    accidental: "Non-Accidental Certified",
    mileage: "22.8 km/l",
    price: 540000,
    starting_bid: 470000,
    current_bid: 500000,
    bid_enabled: true,
    status: "Available",
    photos: [
      "/images/cars/maruti-swift/swift-1.jpg",
      "/images/cars/maruti-swift/swift-2.jpg",
      "/images/cars/maruti-swift/swift-3.jpg"
    ],
    video: "",
    description: "Sizzling Solid Fire Red Maruti Suzuki Swift VXi. Excellent fuel efficiency, flawless mechanical and suspension condition. Fitted with OEM touchscreen audio, central locking, reverse parking sensors, power windows on all 4 doors, and brand new Michelin tires.",
    insurance_validity: "Oct 2026",
    rc_status: "Verified (JH-03)",
    created_date: "2026-08-29T12:30:00Z"
  }
];

export const initialBids = [
  {
    id: "bid-101",
    car_id: "car-nexon",
    car_title: "Tata Nexon XZ+ (O) Diesel",
    bidder_name: "Rahul Tiwari",
    bidder_phone: "+91 98351 44521",
    bidder_email: "rahul.tiwari@gmail.com",
    amount: 815000,
    status: "Active Top Bid",
    created_date: "2026-09-02T14:20:00Z"
  },
  {
    id: "bid-102",
    car_id: "car-nexon",
    car_title: "Tata Nexon XZ+ (O) Diesel",
    bidder_name: "Pramod Singh",
    bidder_phone: "+91 87091 12345",
    bidder_email: "pramod.singh@yahoo.com",
    amount: 790000,
    status: "Outbid",
    created_date: "2026-09-01T10:15:00Z"
  },
  {
    id: "bid-103",
    car_id: "car-swift",
    car_title: "Maruti Suzuki Swift VXi",
    bidder_name: "Pooja Kumari",
    bidder_phone: "+91 70045 66781",
    bidder_email: "pooja.k@gmail.com",
    amount: 500000,
    status: "Active Top Bid",
    created_date: "2026-09-03T16:10:00Z"
  }
];

export const initialSellRequests = [
  {
    id: "req-201",
    car_name: "Kia Seltos HTX Plus",
    brand: "Kia",
    model_year: 2022,
    fuel: "Diesel",
    range_driven: 32000,
    ownership: "1st Owner",
    expected_price: 1150000,
    photos: ["/images/cars/mahindra-xuv700/xuv700-1.jpg"],
    seller_name: "Manish Pandey",
    seller_phone: "+91 91223 44556",
    seller_email: "manish.pandey@gmail.com",
    status: "Pending",
    notes: "Very neat condition, single hand driven in Daltonganj town.",
    created_date: "2026-09-01T09:30:00Z"
  },
  {
    id: "req-202",
    car_name: "Hyundai i20 Asta 1.2",
    brand: "Hyundai",
    model_year: 2020,
    fuel: "Petrol",
    range_driven: 45000,
    ownership: "2nd Owner",
    expected_price: 520000,
    photos: ["/images/cars/maruti-swift/swift-1.jpg"],
    seller_name: "Suresh Gupta",
    seller_phone: "+91 93041 88990",
    seller_email: "suresh.gupta@rediffmail.com",
    status: "Reviewed",
    notes: "Want to exchange with Nexon or XUV700.",
    created_date: "2026-08-30T14:00:00Z"
  }
];

export const initialUsers = [
  {
    id: "user-owner",
    full_name: "Abhishek Verma (Managing Director)",
    email: "shreekrishnamotors19@gmail.com",
    phone: "+91 93042 35814",
    role: "owner",
    created_date: "2021-04-15T00:00:00Z"
  },
  {
    id: "user-admin-1",
    full_name: "Rajesh Kumar (Inventory Manager)",
    email: "admin.daltonganj@shreekrishnamotors.com",
    phone: "+91 79031 91067",
    role: "admin",
    created_date: "2022-06-10T10:00:00Z"
  },
  {
    id: "user-visitor-1",
    full_name: "Rahul Tiwari (Buyer)",
    email: "rahul.tiwari@gmail.com",
    phone: "+91 98351 44521",
    role: "visitor",
    created_date: "2026-07-12T10:00:00Z"
  },
  {
    id: "user-visitor-2",
    full_name: "Amit Sharma (Bidder)",
    email: "amit.sharma.daltonganj@gmail.com",
    phone: "+91 94311 88902",
    role: "visitor",
    created_date: "2026-08-01T15:30:00Z"
  }
];

export const galleryImages = [
  {
    id: "gal-1",
    url: "/images/about/dealership-showroom.jpg",
    title: "Shri Krishna Motors Showroom Delivery Yard",
    date: "Aug 2026"
  },
  {
    id: "gal-2",
    url: "/images/cars/mahindra-xuv700/xuv700-1.jpg",
    title: "Mahindra XUV700 Handover Ceremony",
    date: "July 2026"
  },
  {
    id: "gal-3",
    url: "/images/cars/tata-nexon/nexon-1.jpg",
    title: "Certified Tata Nexon XZ+ Ready for Delivery",
    date: "June 2026"
  },
  {
    id: "gal-4",
    url: "/images/hero/fortuner-hero.jpg",
    title: "Premium Lineup at Ranchi Road Yard",
    date: "May 2026"
  },
  {
    id: "gal-5",
    url: "/images/cars/maruti-swift/swift-1.jpg",
    title: "Satisfied Buyer with Certified Swift",
    date: "April 2026"
  },
  {
    id: "gal-6",
    url: "/images/cars/honda-city/city-1.jpg",
    title: "Honda City ZX Multi-Point Inspection Passed",
    date: "March 2026"
  }
];
