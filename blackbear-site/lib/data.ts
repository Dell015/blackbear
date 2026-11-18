/* ------------------------------------------------------------------
   Black Bear Kitchen + Coffee — site content
   Source: their current menu boards (Assets/02-menu-boards/illustrated),
   Instagram/Facebook profile, branch cards and posts.
   Anything not confirmed by Black Bear is marked PLACEHOLDER or
   `confirmed: false` and shown in the UI as "to confirm".
------------------------------------------------------------------- */

export type Tag = "fav" | "sig" | "veg";

export const brand = {
  name: "Black Bear",
  sub: "Kitchen + Coffee",
  est: 2020,
  home: "Isabela, PH",
  tagline: "Bear Hugs & Bold Brews",
  email: "blackbearcoffeeph@gmail.com",
  phone: "0917 558 2327",
  instagram: "https://www.instagram.com/blackbearcoffeeph",
  instagramHandle: "@blackbearcoffeeph",
  facebook: "https://www.facebook.com/BlackBearCoffeeIsabela",
  serviceCharge: "Subject to 5% service charge",
};

/* ----------------------------- Menu ----------------------------- */

export type Price = number | null; // null = not offered in that size
export type FoodItem = { name: string; price: number; tags?: Tag[]; note?: string; kcal?: number };
export type DrinkItem = { name: string; prices: Price[]; tags?: Tag[]; note?: string; kcal?: number };

export type FoodSection = { id: string; title: string; script?: string; image?: string; items: FoodItem[]; note?: string };
export type DrinkSection = {
  id: string;
  title: string;
  script?: string;
  image?: string;
  sizes: string[]; // column headers
  items: DrinkItem[];
  note?: string;
};

export const sizeLegend = [
  { name: "Black Bear", desc: "Hot" },
  { name: "Grizzly Bear", desc: "16oz iced" },
  { name: "Polar Bear", desc: "22oz iced" },
];

export const food: FoodSection[] = [
  {
    id: "brunch",
    title: "Breakfast & Brunch",
    script: "Club",
    image: "poster-brunch-club-big-brunch-tocino",
    items: [
      { name: "Black Bear Signature Pancakes, Classic", price: 180 },
      { name: "Black Bear Signature Pancakes, Mini", price: 230 },
      { name: "Pork Belly Tocino", price: 280 },
      { name: "Adobo Belly Bowl", price: 280 },
      { name: "Daing na Bangus & Danggit", price: 330, tags: ["fav"] },
      { name: "Camper's Corned Beef", price: 350 },
      { name: "Bear Necessities Big Brunch", price: 390 },
      { name: "Daddy Bear's Steaksilog", price: 620 },
    ],
  },
  {
    id: "lunch",
    title: "Lunch & Dinner",
    image: "poster-lunch-dinner-inasal-sarciado",
    items: [
      { name: "Grilled Chicken Inasal", price: 285 },
      { name: "Country Fried Chicken", price: 295 },
      { name: "Fish Sarsiado", price: 310 },
      { name: "Crispy Huntsman Chops", price: 320, tags: ["fav"] },
      { name: "Loco Moco", price: 330, tags: ["fav"] },
      { name: "Wagyu Salpicao", price: 360 },
    ],
  },
  {
    id: "bites",
    title: "Bear Bites",
    image: "poster-bear-bites",
    items: [
      { name: "Classic Fries", price: 195 },
      { name: "Bear Fries", price: 235 },
      { name: "Spam Fries", price: 225 },
      { name: "Overload Nachos", price: 295, tags: ["fav"] },
      { name: "Chicken Drumettes & Dips", price: 285 },
      { name: "Bonfire Buffalo Chicken", price: 315 },
    ],
  },
  {
    id: "salad-wrap",
    title: "Salad, Wrap & More",
    image: "poster-salad-and-wrap",
    items: [
      { name: "Grilled Chicken Caesar Salad", price: 340, kcal: 598 },
      { name: "Mango Chicken Inasal Salad", price: 360, kcal: 350 },
      { name: "Breakfast Wrap", price: 280, kcal: 912 },
      { name: "Mango Chicken Inasal Wrap", price: 300 },
      { name: "Grilled Chicken Wrap", price: 320 },
      { name: "Cheesesteak Wrap", price: 350 },
      { name: "BB French Toast", price: 165 },
      { name: "Cabin Clubhouse Sandwich", price: 285, tags: ["fav"] },
    ],
  },
  {
    id: "pasta",
    title: "Pasta & Noodles",
    image: "food-mama-bears-baked-spaghetti",
    items: [
      { name: "Tinapa Pasta", price: 240 },
      { name: "Pancit Canton", price: 250 },
      { name: "Lookout Carbonara", price: 260 },
      { name: "Mama Bear's Spaghetti", price: 270, tags: ["sig"] },
      { name: "Shrimp Alfredo", price: 280 },
      { name: "Pesto Chicken Pasta", price: 290 },
      { name: "Truffle Pasta with Wagyu", price: 320, tags: ["fav"] },
      { name: "Truffle Pasta, Veg", price: 270, tags: ["veg"] },
    ],
  },
  {
    id: "pizza",
    title: "Crafted Focaccia Pizza",
    items: [
      { name: "Carni-Bear", price: 430 },
      { name: "Omni-Bear", price: 370 },
      { name: "Camper's Delight 4 Cheese", price: 460 },
    ],
  },
];

export const foodAddOns: FoodItem[] = [
  { name: "Egg", price: 30 },
  { name: "Buttercream", price: 40 },
  { name: "Cheese Sauce", price: 40 },
  { name: "Parmesan Cheese", price: 40 },
  { name: "Garlic Parmesan Sauce", price: 40 },
  { name: "Gravy", price: 40 },
  { name: "Garlic Bread", price: 40 },
  { name: "Buttered Corn", price: 70 },
  { name: "Nacho Chips", price: 100 },
  { name: "Plain Rice", price: 50 },
  { name: "Garlic Rice", price: 60 },
];

const BGP = ["Black Bear", "Grizzly", "Polar"];
const GP = ["Grizzly", "Polar"];

export const drinks: DrinkSection[] = [
  {
    id: "coffee",
    title: "Coffee",
    image: "coffee-trio-iced-hot",
    sizes: BGP,
    items: [
      { name: "Americano", prices: [110, 130, 150] },
      { name: "Cappuccino", prices: [120, 150, 170] },
      { name: "Caramel Macchiato", prices: [150, 180, 200] },
      { name: "Latte", prices: [120, 150, 170], tags: ["fav"] },
      { name: "French Vanilla Latte", prices: [140, 170, 190] },
      { name: "Hazelnut Latte", prices: [140, 170, 190] },
      { name: "Crème Brûlée Latte", prices: [140, 170, 190] },
      { name: "Spanish Latte", prices: [150, 180, 200] },
      { name: "Mocha Latte", prices: [150, 180, 200], tags: ["fav"] },
    ],
  },
  {
    id: "shaken",
    title: "Iced Shaken Espresso",
    script: "with cold cream",
    sizes: GP,
    items: [
      { name: "Daddy Bear's Maple", prices: [180, 200], tags: ["sig"] },
      { name: "Dark Chocolate", prices: [180, 200] },
    ],
  },
  {
    id: "matcha",
    title: "Matcha Series",
    image: "matcha-series-lineup",
    sizes: BGP,
    items: [
      { name: "Matcha Latte", prices: [140, 160, 190], tags: ["fav"] },
      { name: "Dirty Matcha", prices: [null, 180, 210] },
      { name: "Matcha Mango", prices: [null, 170, 200] },
      { name: "Matcha Strawberry", prices: [null, 170, 200] },
      { name: "Matcha Ube", prices: [null, 170, 200] },
    ],
  },
  {
    id: "protein",
    title: "Protein Series",
    script: "23g in every drink",
    image: "protein-series-lineup",
    sizes: ["Price"],
    note: "Add protein to any drink: +₱50 (13g whey isolate or 10g protein).",
    items: [
      { name: "Caramel Protein Macchiato", prices: [250], kcal: 439 },
      { name: "Mocha Protein Latte", prices: [250], kcal: 559 },
      { name: "Strawberry Protein Milk", prices: [230], kcal: 452 },
      { name: "Vanilla Protein Cold Brew", prices: [200], kcal: 358 },
      { name: "Matcha Protein Latte", prices: [230], kcal: 559 },
    ],
  },
  {
    id: "non-coffee",
    title: "Non Coffee",
    image: "noncoffee-green-tea-black-tea",
    sizes: BGP,
    items: [
      { name: "Milk", prices: [120, 140, 150] },
      { name: "Chocolate", prices: [140, 160, 190] },
      { name: "Ube", prices: [140, 160, 190] },
      { name: "Strawberries and Cream", prices: [null, 160, 190] },
    ],
  },
  {
    id: "blended",
    title: "Iced Blended",
    image: "frappe-mango-strawberry",
    sizes: GP,
    items: [
      { name: "Mocha", prices: [170, 200] },
      { name: "Salted Caramel", prices: [170, 200] },
      { name: "Double Mocha", prices: [180, 210], tags: ["fav"] },
      { name: "Choco Chip", prices: [180, 210] },
      { name: "Matcha", prices: [180, 210], tags: ["fav"], note: "non coffee" },
      { name: "Strawberry", prices: [170, 200], note: "non coffee" },
      { name: "Mango", prices: [170, 200], note: "non coffee" },
      { name: "Mango Strawberry", prices: [180, 210], tags: ["fav"], note: "non coffee" },
      { name: "Ube", prices: [180, 210], note: "non coffee" },
      { name: "Baby Bear's S'mores", prices: [190, 220], note: "non coffee" },
    ],
  },
  {
    id: "refreshers",
    title: "Tea & Refreshers",
    image: "refreshers-summer-lineup",
    sizes: BGP,
    note: "Teas: Hello Sunshine, Summer Bliss, Peach Oolong, Chamomile, Hibiscus Dazzler, Merry Berry.",
    items: [
      { name: "Black Bear Iced Tea", prices: [null, 140, 160] },
      { name: "Classic Lemonade", prices: [110, 130, 150], tags: ["fav"] },
      { name: "Pink Lychee Lemonade", prices: [null, 140, 160] },
      { name: "Blueberry Refresher", prices: [null, 160, 190] },
      { name: "Strawberry Dragon Fruit", prices: [null, 160, 190] },
      { name: "Tea", prices: [100, 120, 150] },
      { name: "Tropical Guava", prices: [null, 160, 190] },
      { name: "Lychee Cherry Blossom Yogurt", prices: [null, 170, 200] },
      { name: "Raspberry Banana Yogurt", prices: [null, 170, 200] },
      { name: "Mama Bear's Creamy Yogurt Lemonade", prices: [null, 170, 200], tags: ["sig"] },
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    script: "the healthy side of the bear",
    sizes: ["Grizzly"],
    items: [
      { name: "Mango N' Greens", prices: [220], kcal: 294 },
      { name: "Orange Crush", prices: [200], kcal: 302 },
      { name: "Dragon Berry", prices: [200], kcal: 237 },
      { name: "PB Banana", prices: [180], kcal: 472 },
    ],
  },
];

export const drinkAddOns: FoodItem[] = [
  { name: "Sub Oat Milk", price: 60 },
  { name: "Sub Decaf", price: 30 },
  { name: "Espresso Shot", price: 80 },
  { name: "Whey Protein", price: 50 },
  { name: "Syrup or Sauce", price: 40 },
  { name: "Chocolate Chips", price: 50 },
  { name: "Whipped Cream", price: 40 },
  { name: "Flavor Powder", price: 50 },
  { name: "Fruit Jelly", price: 20 },
  { name: "Yogurt Popping Boba", price: 20 },
];

export const readyToDrink: FoodItem[] = [
  { name: "Bottled Water", price: 50 },
  { name: "San Miguel Beer Light", price: 95 },
  { name: "San Miguel Beer Pale Pilsen", price: 95 },
];

/* ------------------------ Signature picks ------------------------ */
// Doodle-annotated spread. Notes are written in Black Bear's playful voice.
export const signatures = [
  { image: "food-loco-moco", name: "Loco Moco", price: 330, note: "fan favorite!", doodle: "heart" },
  { image: "food-crispy-huntsman-chop", name: "Crispy Huntsman Chops", price: 320, note: "crunch, then gravy", doodle: "sparkle" },
  { image: "food-cabin-clubhouse-sandwich", name: "Cabin Clubhouse Sandwich", price: 285, note: "triple decker, the works", doodle: "sun" },
  { image: "food-mama-bears-baked-spaghetti", name: "Mama Bear's Spaghetti", price: 270, note: "a Black Bear signature", doodle: "star" },
  { image: "food-wagyu-salpicao", name: "Wagyu Salpicao", price: 360, note: "garlicky + tender", doodle: "squiggle" },
] as const;

/* ---------------------------- Series ---------------------------- */
export const series = [
  { id: "protein", title: "Protein Series", line: "23g of protein in every drink. Fuel for workouts, workdays, and everything in between.", image: "protein-series-sky-hands", from: 200 },
  { id: "matcha", title: "Matcha Series", line: "Dirty, mango, strawberry, ube. Layered matcha in the Black Bear cup.", image: "matcha-series-lineup", from: 140 },
  { id: "refreshers", title: "Refreshers", line: "Dragon fruit, guava, and creamy yogurt refreshers for warm Isabela days.", image: "refreshers-summer-lineup", from: 110 },
  { id: "decaf", title: "Decaf", line: "All the coffee comfort, none of the late-night consequences. Sub decaf on any drink.", image: "decaf-entered-the-cabin", from: 30, fromLabel: "+₱30" },
  { id: "smoothies", title: "Smoothies", line: "The healthy side of the bear. Wild. Fresh. Blended.", image: "frappe-strawberry-warm-days", from: 180 },
];

/* ---------------------------- Branches ---------------------------- */
export type Hours = { open: string; close: string; days?: number[] }[]; // days 0=Sun; close may be past midnight
export type Branch = {
  id: string;
  name: string;
  short: string;
  phone?: string;
  address: string;
  addressConfirmed: boolean;
  hours: "24/7" | Hours | null; // null = to confirm
  hoursConfirmed: boolean;
  image?: string;
  mapQuery: string; // used for Google Maps directions
  map: { x: number; y: number }; // position on the trail map (viewBox 400 x 900)
  badge?: string;
  note?: string;
};

export const branches: Branch[] = [
  {
    id: "tuguegarao",
    name: "Tuguegarao",
    short: "Tuguegarao",
    address: "1F, Junction One, Balzain Hwy, East, Tuguegarao City, 3500 Cagayan",
    addressConfirmed: true,
    hours: null,
    hoursConfirmed: false,
    image: "branch-tuguegarao-map-card",
    mapQuery: "Black Bear Coffee - Junction One",
    map: { x: 238, y: 92 },
    badge: "Newest camp",
  },
  {
    id: "ilagan",
    name: "Ilagan City",
    short: "Ilagan",
    phone: "0917 500 0384",
    address: "VTU Building, National Highway, Brgy. Baligatan, Ilagan City, 3305 Isabela",
    addressConfirmed: true,
    hours: [
      { open: "07:00", close: "24:00", days: [0, 1, 2, 3, 4] },
      { open: "07:00", close: "26:00", days: [5, 6] },
    ],
    hoursConfirmed: false,
    image: "branch-ilagan-card",
    mapQuery: "Black Bear Coffee - Ilagan City",
    map: { x: 262, y: 330 },
  },
  {
    id: "roxas",
    name: "Roxas",
    short: "Roxas",
    address: "Santiago–Tuguegarao Road, Brgy. Sotero Nuesa, Roxas, 3320 Isabela",
    addressConfirmed: true,
    hours: null,
    hoursConfirmed: false,
    image: "branch-roxas-neon-sign",
    mapQuery: "Black Bear Kitchen + Coffee - Roxas",
    map: { x: 104, y: 372 },
  },
  {
    id: "cauayan-d1",
    name: "Cauayan District 1",
    short: "Cauayan D1",
    phone: "0917 558 2327",
    address: "RMQ Building, 135 National Highway, District 1, Cauayan City, 3305 Isabela",
    addressConfirmed: true,
    hours: [
      { open: "07:00", close: "24:00", days: [0, 1, 2, 3, 4] },
      { open: "07:00", close: "26:00", days: [5, 6] },
    ],
    hoursConfirmed: false,
    image: "exterior-storefront-night",
    mapQuery: "Black Bear Coffee - District 1",
    map: { x: 240, y: 528 },
    badge: "Main camp",
  },
  {
    id: "cauayan-sf",
    name: "Cauayan San Fermin",
    short: "Cauayan SF",
    phone: "0917 500 0324",
    address: "Beside PS Bank, in front of SM City Cauayan, San Fermin, Cauayan City",
    addressConfirmed: false,
    hours: [{ open: "06:00", close: "21:00" }],
    hoursConfirmed: false,
    image: "branch-cauayan-sf-conference-room",
    mapQuery: "Black Bear Kitchen + Coffee - San Fermin",
    map: { x: 300, y: 560 },
    note: "Conference room for private events",
  },
  {
    id: "alicia",
    name: "Alicia",
    short: "Alicia",
    phone: "0917 558 0004",
    address: "Alicia–San Mateo Road, Alicia, 3306 Isabela",
    addressConfirmed: true,
    hours: [{ open: "08:00", close: "22:00" }],
    hoursConfirmed: false,
    mapQuery: "Black Bear Coffee - Alicia",
    map: { x: 200, y: 676 },
  },
  {
    id: "santiago",
    name: "Santiago City",
    short: "Santiago",
    phone: "0917 562 8884",
    address: "Maharlika Highway, corner Jocson St., Brgy. Mabini, City of Santiago, 3311 Isabela",
    addressConfirmed: true,
    hours: "24/7",
    hoursConfirmed: true,
    image: "branch-santiago-card",
    mapQuery: "Black Bear Kitchen + Coffee - Santiago City",
    map: { x: 140, y: 818 },
    badge: "Open 24/7",
  },
];

/* ----------------------------- Cakes ----------------------------- */
export const cakes: { id: string; name: string; image?: string }[] = [
  { id: "blueberry-cheesecake", name: "Blueberry Cheesecake" },
  { id: "dark-chocolate", name: "Dark Chocolate Cake", image: "cake-dark-chocolate" },
  { id: "biscoff-cheesecake", name: "Biscoff Cheesecake", image: "cake-biscoff-cheesecake-slice" },
  { id: "mocha-tiramisu", name: "Mocha Tiramisu", image: "cake-mocha-tiramisu" },
  { id: "sans-rival", name: "Sans Rival Cake" },
  { id: "belgian-cookie-cheesecake", name: "Belgian Cookie Cheesecake" },
  { id: "ube-royale", name: "Ube Royale Cake", image: "cake-ube-slice-with-coffee" },
  { id: "carrot-walnut", name: "Carrot Walnut Cake" },
  { id: "elborn-cheesecake", name: "Elborn Cheesecake", image: "cake-elborn-cheesecake" },
  { id: "ube-bibingka", name: "Ube Bibingka Cake", image: "cake-ube-bibingka" },
];

// Sample day, copied from their "Cake Story" (Nov 17, 2026). Staff would update this daily.
export const cakeStoryDate = "2026-11-17";
export const cakeStory: Record<string, string[]> = {
  "cauayan-d1": ["blueberry-cheesecake", "dark-chocolate", "biscoff-cheesecake", "mocha-tiramisu"],
  "cauayan-sf": ["dark-chocolate", "sans-rival", "belgian-cookie-cheesecake"],
  santiago: ["mocha-tiramisu", "dark-chocolate", "ube-royale", "blueberry-cheesecake"],
  alicia: ["mocha-tiramisu", "sans-rival", "blueberry-cheesecake", "dark-chocolate", "carrot-walnut"],
  roxas: ["carrot-walnut", "dark-chocolate", "biscoff-cheesecake", "blueberry-cheesecake"],
  ilagan: ["ube-royale", "dark-chocolate"],
};

/* ---------------------------- Gallery ---------------------------- */
export const gallery = [
  "interior-mural-tent-patches",
  "ghost-shoot-08-group",
  "interior-lounge-bear-window",
  "coffee-latte-art-pour",
  "interior-bernie-poster-wall",
  "ghost-shoot-04-table",
  "interior-communal-table",
  "staff-kitchen-team-02",
  "exterior-logo-window-sign",
  "ghost-shoot-06-bar",
  "interior-counter-menu-boards",
  "coffee-espresso-shots",
  "interior-bear-hugs-wall-sign",
  "ghost-shoot-01-logo-sign",
  "exterior-green-door-entrance",
];

export const campfireNotes = [
  { image: "thankful-01-friends", title: "Thankful series" },
  { image: "payday-deserves-a-treat", title: "Payday deserves a treat" },
  { image: "campaign-new-year-reset", title: "New Year Reset" },
  { image: "campaign-i-choose-meme", title: "I choose…" },
  { image: "campaign-barista-secrets", title: "Barista Secrets" },
  { image: "campaign-just-one-scoop", title: "Just one scoop" },
  { image: "protein-go-hard-gym", title: "Go hard. Bear strong." },
  { image: "decaf-and-chill", title: "Decaf & Chill" },
];
