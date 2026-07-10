// Categories
import biryaniImg from "../assets/categories/biryani.png";
import breakfastImg from "../assets/categories/breakfast.png";
import burgerImg from "../assets/categories/burger.png";
import dessertsImg from "../assets/categories/desserts.png";
import indianImg from "../assets/categories/indian.png";
import juiceImg from "../assets/categories/juice.png";
import pizzaImg from "../assets/categories/pizza.png";

// Dishes
import breakfast1 from "../assets/dishes/breakfast1.png";
import breakfast2 from "../assets/dishes/breakfast2.png";
import breakfast3 from "../assets/dishes/breakfast3.png";
import breakfast4 from "../assets/dishes/breakfast4.png";
import breakfast5 from "../assets/dishes/breakfast5.png";
import burger1 from "../assets/dishes/burger1.png";
import indian1 from "../assets/dishes/indian1.png";
import indian2 from "../assets/dishes/indian2.png";
import indian3 from "../assets/dishes/indian3.png";
import juice1 from "../assets/dishes/juice1.png";
import pizza1 from "../assets/dishes/pizza1.png";
import biryani1 from "../assets/dishes/biryani1.png"
import dessert1 from "../assets/dishes/dessert1.png"

export const categories = [
  { id: "breakfast", name: "Breakfast", image: breakfastImg },
  { id: "indian", name: "Indian Dishes", image: indianImg },
  { id: "biryani", name: "Biryani", image: biryaniImg },
  { id: "burger", name: "Burgers", image: burgerImg },
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "desserts", name: "Desserts", image: dessertsImg },
  { id: "juice", name: "Juice", image: juiceImg },
];

export const dishes = [
  { id: 1, name: "Indli Sambar", category: "breakfast", image: breakfast1, rating: 4.5, deliveryTime: "5 mins", price: 50.0 },
  { id: 2, name: "Vada", category: "breakfast", image: breakfast2, rating: 4.3, deliveryTime: "6 mins", price: 30.0 },
  { id: 3, name: "Masal Dosa", category: "breakfast", image: breakfast3, rating: 4.4, deliveryTime: "5 mins", price: 60.0 },
  { id: 4, name: "Poha", category: "breakfast", image: breakfast4, rating: 4.6, deliveryTime: "7 mins", price: 35.0 },
  { id: 5, name: "Upma", category: "breakfast", image: breakfast5, rating: 4.5, deliveryTime: "6 mins", price: 40.0 },
  { id: 6, name: "Classic Chicken Burger", category: "burger", image: burger1, rating: 4.5, deliveryTime: "3 mins", price: 150.0 },
  { id: 7, name: "Chapati Curry", category: "indian", image: indian1, rating: 4.5, deliveryTime: "7 mins", price: 70.0 },
  { id: 8, name: "Puri Bhaji", category: "indian", image: indian2, rating: 4.4, deliveryTime: "8 mins", price: 80.0 },
  { id: 9, name: "Pav Bhaji", category: "indian", image: indian3, rating: 4.3, deliveryTime: "8 mins", price: 90.0 },
  { id: 10, name: "Strawberry Milkshake", category: "juice", image: juice1, rating: 4.6, deliveryTime: "4 mins", price: 150.0 },
  { id: 11, name: "Veggie Delight Pizza", category: "pizza", image: pizza1, rating: 4.4, deliveryTime: "7 mins", price: 150.0 },
  { id: 12, name: "Chicken Biryani", category: "biryani", image: biryani1, rating: 4.4, deliveryTime: "7 mins", price: 250.0 },
  { id: 13, name: "chocolate lava cake", category: "desserts", image: dessert1, rating: 4.4, deliveryTime: "7 mins", price: 200.0 },
];