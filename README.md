# 🛍️ ProShop Ecommerce

A full-featured eCommerce application built using the **MERN stack** (MongoDB, Express, React, Node.js) with support for:

- User authentication
- Admin dashboard
- Product management
- Order management
- PayPal payment integration
- Image upload with Multer

---

## 📦 Project Structure

proshop-ecommerce/
├── backend/ # Express + MongoDB API
├── frontend/ # React.js client
├── .env # Environment variables
├── server.js # Main server file
└── README.md

---

## 🚀 Features

- JWT authentication with protected routes
- Admin panel with CRUD operations
- PayPal SDK integration
- Multer image uploads
- Pagination, search, and filtering
- Redux Toolkit with RTK Query
- Responsive UI with React-Bootstrap

---

## 🛠️ Installation & Setup

# Root + frontend dependencies
npm install
npm install --prefix frontend

| Script                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm start`            | Start Express server (backend only)        |
| `npm run server`       | Run backend with nodemon                   |
| `npm run client`       | Start React client only                    |
| `npm run dev`          | Run both backend and frontend concurrently |
| `npm run build`        | Build frontend for production              |
| `npm run data:import`  | Seed sample products/users                 |
| `npm run data:destroy` | Delete all products/orders/users           |


### 1. Clone the repository

```bash
git clone https://github.com/SrishylamBurla/proshop-ecommerce.git
cd proshop-ecommerce

