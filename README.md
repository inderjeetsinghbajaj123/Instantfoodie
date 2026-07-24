# InstantFoodie 🍔

InstantFoodie is a full-stack food ordering web application built using the MERN stack. It allows users to browse restaurants, explore food items, manage their cart, place orders, and manage favourite foods. The application also provides restaurant and admin-level functionalities with role-based access control.

---

## 🚀 Features

## 👤 User Features

- User registration and login
- JWT-based authentication
- Secure cookie-based session management
- Browse available restaurants
- View food items by category
- Add food items to cart
- Update cart quantity
- Place orders
- View order history
- Add/remove favourite food items
- Manage user profile

---

## 🍽️ Restaurant Features

- Restaurant owner authentication
- Create and manage restaurants
- Add new food items
- Update food item details
- Manage food availability
- View restaurant-related orders

---

## 🛡️ Admin Features

- Admin role-based authentication
- Manage users
- Manage restaurants
- Monitor application activities

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript
- Axios

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cookie Parser
- CORS
- dotenv

---

# 📂 Project Structure

```text
Instantfoodie/
│
├── client/                    # Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Backend Application
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   │
│   ├── index.js
│   │── scripts/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>

cd Instantfoodie
```

---

# Backend Setup

Navigate to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

NODE_ENV=development
```

Start backend server:

```bash
npm run dev
```

---

# Frontend Setup

Open a new terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

# 🔗 API Modules

## Authentication

- Register User
- Login User
- Logout User
- JWT Authentication

## User

- Get Profile
- Update Profile
- Manage Favourite Items

## Restaurant

- Create Restaurant
- Get Restaurants
- Update Restaurant Details

## Food Items

- Add Food Item
- Update Food Item
- Get Food Items
- Filter By Category

## Cart

- Add Item To Cart
- Update Quantity
- Remove Item

## Orders

- Place Order
- Get User Orders
- Update Order Status

---

# 🔐 Authentication & Authorization

- JWT token-based authentication
- HTTP-only cookies for security
- Role-based access control:
  - User
  - Restaurant
  - Admin

---

# 🤝 Contribution Guidelines

1. Create a feature branch

```bash
git checkout -b feature-name
```

2. Make your changes

3. Commit changes

```bash
git add .
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📌 Future Improvements

- Online payment integration
- Real-time order tracking
- Restaurant analytics dashboard
- Push notifications
- Advanced search and recommendations

---

# 👨‍💻 Team

Built by the InstantFoodie Development Team ❤️