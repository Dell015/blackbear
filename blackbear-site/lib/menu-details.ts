/** Short editorial guides, grounded in the supplied product names and photos.
 * These are not ingredient or allergen specifications. */
export const menuKey = (category: string, name: string) => `${category}::${name}`;
export const menuDetails: Record<string, { image?: string; description: string }> = {
  "Loco Moco": { image: "food-loco-moco", description: "A comforting rice plate with a patty, egg, and gravy, pictured in Black Bear’s own post. Marked a fan favorite on the menu." },
  "Crispy Huntsman Chops": { image: "food-crispy-huntsman-chop", description: "Black Bear’s crispy chop plate, pictured with rice, corn, and a side of gravy. A fan favorite from the lunch and dinner board." },
  "Wagyu Salpicao": { image: "food-wagyu-salpicao", description: "A garlicky beef plate from the lunch and dinner board. One of the kitchen’s featured signature picks." },
  "Cabin Clubhouse Sandwich": { image: "food-cabin-clubhouse-sandwich", description: "The kitchen’s stacked clubhouse sandwich, pictured in its own product post. A fan favorite for a sandwich kind of day." },
  "Mama Bear's Spaghetti": { image: "food-mama-bears-baked-spaghetti", description: "A Black Bear signature from the pasta board, pictured baked with a golden topping. A comfort-food pick for your next stop." },
  "Americano": { image: "coffee-hot-americano", description: "A straightforward coffee-bar classic. Choose from the hot and iced sizes listed below." },
  "Cappuccino": { image: "coffee-cappuccino", description: "A coffee-and-milk classic from the Black Bear coffee bar. Available sizes and prices are listed below." },
  "Caramel Macchiato": { image: "coffee-caramel-macchiato", description: "A caramel coffee-bar pick, pictured in Black Bear’s own product post. Choose your cup size below." },
  "Latte": { image: "coffee-iced-latte-outdoor", description: "An everyday coffee-and-milk favorite. Marked a fan favorite on the coffee board, with hot and iced sizes." },
  "Spanish Latte": { image: "coffee-spanish-latte-ube-latte", description: "A Spanish latte from Black Bear’s coffee selection. The supplied photo shows the Spanish and ube lattes together." },
  "Matcha Latte": { image: "matcha-series-lineup", description: "The classic matcha pick on the board, available hot or iced. This photo shows the full Matcha Series." },
  "Dirty Matcha": { image: "matcha-dirty", description: "A layered matcha-and-coffee pick from the Matcha Series. Choose a Grizzly or Polar iced cup." },
  "Matcha Mango": { image: "matcha-mango", description: "Mango meets matcha in Black Bear’s layered iced series. Available in Grizzly and Polar cup sizes." },
  "Matcha Strawberry": { image: "matcha-strawberry", description: "A strawberry variation from the Matcha Series, pictured in its own Black Bear post. Available in two iced sizes." },
  "Matcha Ube": { image: "matcha-ube", description: "A layered ube and matcha pick from the Matcha Series. Choose from the iced sizes below." },
  "Caramel Protein Macchiato": { image: "protein-caramel-macchiato", description: "A caramel macchiato from the Protein Series. The menu lists 439 kcal for this drink." },
  "Mocha Protein Latte": { image: "protein-mocha-latte", description: "The mocha coffee pick in the Protein Series. The menu lists 559 kcal for this drink." },
  "Strawberry Protein Milk": { image: "protein-strawberry-milk", description: "A strawberry milk pick from Black Bear’s Protein Series. The menu lists 452 kcal." },
  "Matcha Protein Latte": { image: "protein-matcha-latte", description: "Matcha from the Protein Series, pictured in its own Black Bear product post. See the board’s price below." },
  "Vanilla Protein Cold Brew": { image: "protein-vanilla-cold-brew", description: "The vanilla cold-brew pick in the Protein Series. Check with the crew for preparation and ingredient details." },
  "Strawberry Dragon Fruit": { image: "refresher-strawberry-dragon-fruit", description: "A fruit refresher from the iced drinks board, with strawberry and dragon fruit in its name and product post." },
  "Tropical Guava": { image: "refresher-tropical-guava", description: "The guava refresher from Black Bear’s tropical drink selection. Choose from the sizes listed below." },
};
