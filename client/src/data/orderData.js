import burger1 from "../assets/dishes/burger1.png";
import indian1 from "../assets/dishes/indian1.png";
import pizza1 from "../assets/dishes/pizza1.png";
import juice1 from "../assets/dishes/juice1.png";

export const activeOrder = {
  id: "ORD10234",
  status: "preparing", // "placed" | "preparing" | "out_for_delivery" | "delivered"
  placedAt: "Today, 12:45 PM",
  eta: "15-20 mins",
  items: [
    { id: 1, name: "Classic Chicken Burger", quantity: 2, price: 15.0, image: burger1 },
    { id: 2, name: "Fresh Orange Juice", quantity: 1, price: 5.0, image: juice1 },
  ],
  total: 35.0,
};

export const pastOrders = [
  {
    id: "ORD10198",
    date: "Jul 6, 2026",
    status: "delivered",
    items: [{ id: 3, name: "Chicken Tikka Masala", quantity: 1, price: 15.0, image: indian1 }],
    total: 15.0,
  },
  {
    id: "ORD10150",
    date: "Jul 2, 2026",
    status: "delivered",
    items: [{ id: 4, name: "Veggie Delight Pizza", quantity: 2, price: 15.0, image: pizza1 }],
    total: 30.0,
  },
  {
    id: "ORD10099",
    date: "Jun 28, 2026",
    status: "cancelled",
    items: [{ id: 2, name: "Fresh Orange Juice", quantity: 3, price: 5.0, image: juice1 }],
    total: 15.0,
  },
];