// JESUANS Engineering India Pvt. Ltd. Dataset & Solar Calculator Rules

export const COMPANY_DETAILS = {
  name: "JESUANS Engineering India Pvt. Ltd.",
  brandName: "JESUANS Solar",
  logoUrl: "https://jesuans.com/images/logo.png",
  tagline: "Solar Makes Reliable",
  heroTagline: "Powering A Sustainable Future",
  phone: "+91 91599 50009",
  email: "info@jesuans.com",
  website: "https://jesuans.com/",
  registeredAddress: "No. 76, Periyar Street, Rathinapuri, Coimbatore, Tamil Nadu, India - 641027",
  directors: [
    { name: "Anandakumar M", title: "Director & Founder" },
    { name: "Arivazhagan D", title: "Director & Founder" }
  ],
  divisions: [
    "Solar EPC Projects (Domestic, Commercial & Industrial)",
    "Solar Rooftops (On-Grid, Off-Grid & Hybrid)",
    "BESS (Battery Energy Storage Systems)",
    "EV Charging Station Division",
    "Power Trading & Solar Water Heating"
  ]
};

export const STATE_DATA = {
  33: { id: 33, name: 'Tamil Nadu', gen: 4.48, tariff: 5.50, sunHrs: 5.6, nonSub: [50000, 50000, 40000, 47000], sub: [60000, 60000, 50000, 57000], govSub: [30000, 30000, 18000], commercial: 0 },
  1:  { id: 1,  name: 'Jammu & Kashmir', gen: 3.6,  tariff: 2.27, sunHrs: 4.5, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  2:  { id: 2,  name: 'Himachal Pradesh', gen: 3.76, tariff: 5.00, sunHrs: 4.7, nonSub: [43000, 42000, 38000, 45000], sub: [53000, 52000, 48000, 55000], govSub: [33000, 33000, 19800], commercial: 0 },
  3:  { id: 3,  name: 'Punjab', gen: 4.16, tariff: 5.00, sunHrs: 5.2, nonSub: [46300, 38000, 31000, 38000], sub: [56300, 48000, 41000, 48000], govSub: [30000, 30000, 18000], commercial: 0 },
  4:  { id: 4,  name: 'Chandigarh', gen: 4.24, tariff: 5.00, sunHrs: 5.3, nonSub: [46300, 38000, 31000, 38000], sub: [56300, 48000, 41000, 48000], govSub: [30000, 30000, 18000], commercial: 0 },
  5:  { id: 5,  name: 'Uttarakhand', gen: 3.84, tariff: 5.00, sunHrs: 4.8, nonSub: [47000, 47000, 36500, 43500], sub: [57000, 57000, 46500, 53500], govSub: [30000, 30000, 18000], commercial: 0 },
  6:  { id: 6,  name: 'Haryana', gen: 4.32, tariff: 5.50, sunHrs: 5.4, nonSub: [43000, 42000, 38000, 45000], sub: [53000, 52000, 48000, 55000], govSub: [30000, 30000, 18000], commercial: 0 },
  7:  { id: 7,  name: 'Delhi (NCT)', gen: 4.40, tariff: 3.75, sunHrs: 5.5, nonSub: [47000, 47000, 36500, 43500], sub: [57000, 57000, 46500, 53500], govSub: [30000, 30000, 18000], commercial: 30000 },
  8:  { id: 8,  name: 'Rajasthan', gen: 4.64, tariff: 6.00, sunHrs: 5.8, nonSub: [60000, 45500, 34000, 41000], sub: [70000, 55500, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  9:  { id: 9,  name: 'Uttar Pradesh', gen: 4.24, tariff: 4.25, sunHrs: 5.3, nonSub: [43000, 42000, 38000, 45000], sub: [53000, 52000, 48000, 55000], govSub: [30000, 30000, 18000], commercial: 30000 },
  10: { id: 10, name: 'Bihar', gen: 4.16, tariff: 6.50, sunHrs: 5.2, nonSub: [43000, 46500, 34000, 41000], sub: [53000, 56500, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  11: { id: 11, name: 'Sikkim', gen: 3.36, tariff: 4.50, sunHrs: 4.2, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [30000, 30000, 18000], commercial: 0 },
  12: { id: 12, name: 'Arunachal Pradesh', gen: 3.52, tariff: 4.00, sunHrs: 4.4, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  13: { id: 13, name: 'Nagaland', gen: 3.44, tariff: 5.00, sunHrs: 4.3, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  14: { id: 14, name: 'Manipur', gen: 3.52, tariff: 5.00, sunHrs: 4.4, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  15: { id: 15, name: 'Mizoram', gen: 3.44, tariff: 5.00, sunHrs: 4.3, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  16: { id: 16, name: 'Tripura', gen: 3.52, tariff: 5.00, sunHrs: 4.4, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  17: { id: 17, name: 'Meghalaya', gen: 3.36, tariff: 5.00, sunHrs: 4.2, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  18: { id: 18, name: 'Assam', gen: 3.60, tariff: 5.00, sunHrs: 4.5, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  19: { id: 19, name: 'West Bengal', gen: 3.92, tariff: 5.75, sunHrs: 4.9, nonSub: [47000, 40000, 34000, 41000], sub: [57000, 50000, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  20: { id: 20, name: 'Jharkhand', gen: 4.00, tariff: 6.50, sunHrs: 5.0, nonSub: [49000, 50000, 34000, 41000], sub: [59000, 60000, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  21: { id: 21, name: 'Odisha', gen: 4.16, tariff: 5.50, sunHrs: 5.2, nonSub: [47000, 40000, 34000, 41000], sub: [57000, 50000, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  22: { id: 22, name: 'Chhattisgarh', gen: 4.32, tariff: 6.00, sunHrs: 5.4, nonSub: [45000, 45000, 34000, 41000], sub: [55000, 55000, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  23: { id: 23, name: 'Madhya Pradesh', gen: 4.48, tariff: 6.00, sunHrs: 5.6, nonSub: [45000, 45000, 34000, 41000], sub: [55000, 55000, 44000, 51000], govSub: [30000, 30000, 18000], commercial: 0 },
  24: { id: 24, name: 'Gujarat', gen: 4.64, tariff: 5.00, sunHrs: 5.8, nonSub: [37500, 35000, 31000, 38000], sub: [47500, 45000, 41000, 48000], govSub: [30000, 30000, 18000], commercial: 0 },
  27: { id: 27, name: 'Maharashtra', gen: 4.40, tariff: 6.00, sunHrs: 5.5, nonSub: [46000, 45000, 37000, 44000], sub: [56000, 55000, 47000, 54000], govSub: [30000, 30000, 18000], commercial: 0 },
  28: { id: 28, name: 'Andhra Pradesh', gen: 4.56, tariff: 6.00, sunHrs: 5.7, nonSub: [50000, 50000, 40000, 47000], sub: [60000, 60000, 50000, 57000], govSub: [30000, 30000, 18000], commercial: 0 },
  29: { id: 29, name: 'Karnataka', gen: 4.64, tariff: 6.00, sunHrs: 5.8, nonSub: [50000, 50000, 40000, 47000], sub: [60000, 60000, 50000, 57000], govSub: [30000, 30000, 18000], commercial: 0 },
  30: { id: 30, name: 'Goa', gen: 4.40, tariff: 4.05, sunHrs: 5.5, nonSub: [46000, 45000, 37000, 44000], sub: [56000, 55000, 47000, 54000], govSub: [30000, 30000, 18000], commercial: 0 },
  31: { id: 31, name: 'Lakshadweep', gen: 4.00, tariff: 5.50, sunHrs: 5.0, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  32: { id: 32, name: 'Kerala', gen: 4.16, tariff: 5.50, sunHrs: 5.2, nonSub: [50000, 50000, 40000, 47000], sub: [60000, 60000, 50000, 57000], govSub: [30000, 30000, 18000], commercial: 0 },
  34: { id: 34, name: 'Puducherry', gen: 4.40, tariff: 5.50, sunHrs: 5.5, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [30000, 30000, 18000], commercial: 0 },
  35: { id: 35, name: 'Andaman & Nicobar', gen: 3.84, tariff: 6.00, sunHrs: 4.8, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  36: { id: 36, name: 'Telangana', gen: 4.56, tariff: 6.00, sunHrs: 5.7, nonSub: [50000, 50000, 40000, 47000], sub: [60000, 60000, 50000, 57000], govSub: [30000, 30000, 18000], commercial: 0 },
  37: { id: 37, name: 'Ladakh', gen: 4.48, tariff: 6.00, sunHrs: 5.6, nonSub: [65000, 60000, 48000, 55000], sub: [75000, 70000, 58000, 65000], govSub: [33000, 33000, 19800], commercial: 0 },
  38: { id: 38, name: 'Dadra & Nagar Haveli', gen: 4.48, tariff: 5.50, sunHrs: 5.6, nonSub: [37500, 35000, 31000, 38000], sub: [47500, 45000, 41000, 48000], govSub: [30000, 30000, 18000], commercial: 0 }
};

export const RESIDENTIAL_APPLIANCES = [
  { id: 'fan', name: 'Ceiling Fan', powerkW: 0.075, defaultQty: 4, icon: 'Fan' },
  { id: 'led', name: 'LED Bulb', powerkW: 0.009, defaultQty: 6, icon: 'Lightbulb' },
  { id: 'tv', name: 'Television (LED)', powerkW: 0.08, defaultQty: 2, icon: 'Tv' },
  { id: 'fridge', name: 'Refrigerator (Single Door)', powerkW: 0.15, defaultQty: 1, icon: 'Refrigerator' },
  { id: 'washing', name: 'Washing Machine', powerkW: 0.50, defaultQty: 1, icon: 'Shirt' },
  { id: 'oven', name: 'Microwave Oven', powerkW: 1.20, defaultQty: 1, icon: 'Microwave' },
  { id: 'pump', name: 'Water Pump', powerkW: 0.75, defaultQty: 1, icon: 'Droplets' },
  { id: 'iron', name: 'Iron Box', powerkW: 1.00, defaultQty: 1, icon: 'Zap' },
  { id: 'ac1', name: 'Air Conditioner (1 Ton)', powerkW: 1.20, defaultQty: 1, icon: 'Wind' },
  { id: 'geyser', name: 'Geyser (Water Heater)', powerkW: 2.00, defaultQty: 1, icon: 'Flame' }
];

export const COMMERCIAL_APPLIANCES = [
  { id: 'c_fan', name: 'Ceiling Fan', powerkW: 0.075, defaultQty: 10, icon: 'Fan' },
  { id: 'c_tube', name: 'Tube Light (LED)', powerkW: 0.022, defaultQty: 15, icon: 'Lightbulb' },
  { id: 'c_pc', name: 'Desktop Computer', powerkW: 0.10, defaultQty: 5, icon: 'Monitor' },
  { id: 'c_print', name: 'Laser Printer', powerkW: 0.60, defaultQty: 2, icon: 'Printer' },
  { id: 'c_ac15', name: 'Air Conditioner (1.5 Ton)', powerkW: 1.50, defaultQty: 3, icon: 'Wind' },
  { id: 'c_freezer', name: 'Commercial Refrigerator / Freezer', powerkW: 0.40, defaultQty: 2, icon: 'Refrigerator' },
  { id: 'c_cooler', name: 'Water Cooler / Dispenser', powerkW: 0.10, defaultQty: 1, icon: 'Droplets' },
  { id: 'c_coffee', name: 'Coffee Machine', powerkW: 0.80, defaultQty: 1, icon: 'Coffee' },
  { id: 'c_copy', name: 'Photocopier Machine', powerkW: 1.60, defaultQty: 1, icon: 'Copy' },
  { id: 'c_projector', name: 'Projector', powerkW: 0.22, defaultQty: 1, icon: 'Projector' }
];

export const SOLAR_TIPS = [
  {
    id: 1,
    title: "Rooftop Space Availability",
    description: "Ensure shadow-free rooftop space. A 1 kW solar system typically requires 80–100 sq. ft. of usable rooftop area.",
    icon: "Square"
  },
  {
    id: 2,
    title: "Sunlight Exposure",
    description: "Rooftop should receive 4–6 hours of unshaded, direct sunlight daily. Avoid obstructions like high-rise shadows, tall trees, or water tanks.",
    icon: "Sun"
  },
  {
    id: 3,
    title: "Load Assessment",
    description: "Analyze your average monthly electricity bills to determine the precise solar system capacity (in kW) needed for maximum bill offset.",
    icon: "Gauge"
  },
  {
    id: 4,
    title: "Structural Strength",
    description: "Rooftop structure must bear panel and mounting frame weight. Flat or slightly sloped RCC roofs are ideal for long-term installation.",
    icon: "Building2"
  },
  {
    id: 5,
    title: "Grid Connection & Net Metering",
    description: "Apply for net metering with TANGEDCO / local DISCOM to send excess solar energy back to the grid and receive monthly bill credits.",
    icon: "PlugZap"
  },
  {
    id: 6,
    title: "Government Subsidy & Loans",
    description: "Residential rooftops qualify for PM Surya Ghar Muft Bijli Yojana (up to ₹78,000 subsidy). Special collateral-free green solar loans are available.",
    icon: "Coins"
  },
  {
    id: 7,
    title: "Inverter & Battery Selection",
    description: "Select On-Grid for maximum savings with net metering, Off-Grid for remote areas, or Hybrid inverters with battery backup during power cuts.",
    icon: "BatteryCharging"
  }
];

export const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: "JESUANS On-Grid Solar Power System (3kW - 10kW)",
    category: "Solar EPC Rooftop",
    image: "https://jesuans.com/images/logo.png",
    url: "https://jesuans.com/solar-rooftops.php",
    badge: "Most Popular"
  },
  {
    id: 2,
    name: "JESUANS Hybrid Solar Solution with BESS Battery Backup",
    category: "Hybrid & BESS",
    image: "https://jesuans.com/images/logo.png",
    url: "https://jesuans.com/epc-projects.php",
    badge: "Zero Power Cuts"
  },
  {
    id: 3,
    name: "JESUANS Industrial & Commercial Solar EPC Plant",
    category: "Commercial EPC",
    image: "https://jesuans.com/images/logo.png",
    url: "https://jesuans.com/landmark-projects.php",
    badge: "High ROI"
  },
  {
    id: 4,
    name: "JESUANS High-Efficiency Solar Water Heater",
    category: "Solar Thermal",
    image: "https://jesuans.com/images/logo.png",
    url: "https://jesuans.com/contact.php",
    badge: "Domestic & Commercial"
  },
  {
    id: 5,
    name: "JESUANS Agricultural Solar Pump System",
    category: "Agri Solar",
    image: "https://jesuans.com/images/logo.png",
    url: "https://jesuans.com/contact.php",
    badge: "PM KUSUM Scheme"
  },
  {
    id: 6,
    name: "JESUANS EV Charging Station Solution",
    category: "EV Infrastructure",
    image: "https://jesuans.com/images/logo.png",
    url: "https://jesuans.com/ev-division.php",
    badge: "Fast DC Charger"
  }
];

export const REVIEWS_DATA = [
  {
    id: 1,
    name: "Dr. K. Swaminathan",
    location: "Coimbatore, Tamil Nadu",
    stars: 5,
    review: "JESUANS Engineering completed our 10kW residential rooftop solar project smoothly. TANGEDCO Net Metering approval was handled by their team seamlessly. Zero electricity bill now!",
  },
  {
    id: 2,
    name: "R. Manikandan",
    location: "Tirupur, Tamil Nadu",
    stars: 5,
    review: "Installed a 50kW commercial solar EPC plant for our textile unit through JESUANS. Outstanding work quality and top-notch engineering by Mr. Dorairaj Arivazhagan & team.",
  },
  {
    id: 3,
    name: "P. Karthik",
    location: "Chennai, Tamil Nadu",
    stars: 5,
    review: "Superb execution by JESUANS Engineering! PM Surya Ghar subsidy of ₹78,000 was credited directly to our bank account. Highly reliable solar installers.",
  },
  {
    id: 4,
    name: "S. Murugan",
    location: "Madurai, Tamil Nadu",
    stars: 5,
    review: "Great customer service from Mr. Anandakumar and the JESUANS solar team. The hybrid inverter with battery backup keeps our clinic running 24/7 without power disruptions.",
  }
];

export const FAQ_DATA = [
  {
    q: "Who owns and manages JESUANS Engineering India Pvt. Ltd.?",
    a: "JESUANS Engineering India Private Limited is led by Directors Masilamani Anandakumar and Dorairaj Arivazhagan. Headquartered in Coimbatore, Tamil Nadu, JESUANS provides end-to-end Solar EPC, Rooftop Solar, BESS, and EV Charging solutions across South India."
  },
  {
    q: "How does the PM Surya Ghar Muft Bijli Yojana subsidy work in Tamil Nadu?",
    a: "Under the PM Surya Ghar scheme, residential consumers receive direct government subsidy: ₹30,000/kW for systems up to 2 kW, plus ₹18,000 for the 3rd kW (totaling ₹78,000 max). JESUANS handles complete registration, TANGEDCO net metering, and subsidy processing."
  },
  {
    q: "How much rooftop space is required per kW of solar?",
    a: "Typically, 1 kW of solar panel capacity requires approximately 80 to 100 sq. ft. of shadow-free rooftop space. A standard 3 kW residential system requires around 250–300 sq. ft."
  },
  {
    q: "What is Net Metering and how does TANGEDCO credit excess power?",
    a: "Net metering credits solar energy added to the grid. During daytime, excess solar power generated is sent to TANGEDCO grid. At night, you draw power from the grid. You are billed only for the 'net' consumption."
  },
  {
    q: "What is the simple payback period for a JESUANS rooftop solar system?",
    a: "With government subsidies and prevailing DISCOM electricity tariffs (₹5.50–₹8/unit), most residential solar systems achieve complete financial payback within 2.5 to 3.5 years. After payback, your solar energy is 100% free!"
  }
];
