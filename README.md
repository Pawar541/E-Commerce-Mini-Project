# 🛍️ E-Commerce Mini Project (Full Stack + Admin Panel)

A full-stack mini e-commerce web app built with **MERN Stack (MongoDB, Express, React, Node.js)** featuring:
- User shopping experience (browse, cart, checkout)
- Secure JWT authentication (User & Admin)
- Admin panel for product & order management (CRUD, status updates, CSV export)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Tailwind CSS + Axios + React Router |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Token) |
| Deployment | Render / Vercel compatible |
| Optional | Docker Compose for full-stack deployment |

---

## ✨ Features

### 👤 User Features
- Register & Login with JWT  
- Browse and view product details  
- Add products to cart  
- Add shipping address and checkout  
- Place orders and view order history  

### 🧑‍💼 Admin Features
- Admin login (separate route)
- Dashboard with KPIs: total products, orders, revenue, pending orders  
- Product Management (CRUD with pagination, search, import CSV)
- Order Management (filter, update status, export CSV)
- Role-based route protection (only `admin` can access admin endpoints)
- Secure JWT middleware with input validation

---

## 🧭 API Endpoints Overview

### 🔐 Authentication
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/profile` | Get admin profile (JWT protected) |

### 🛒 Products (Public)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/products` | List all products (pagination & search) |
| GET | `/api/products/:id` | Get product details |

### 🧩 Products (Admin)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/admin/products` | List products (with pagination & search) |
| POST | `/api/admin/products` | Create product |
| GET | `/api/admin/products/:id` | Get single product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product (soft/hard) |
| POST | `/api/admin/products/import` | Bulk import (CSV/JSON, optional) |

### 📦 Orders (Admin)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/admin/orders` | List orders (filterable, paginated) |
| GET | `/api/admin/orders/:id` | Get order details |
| PUT | `/api/admin/orders/:id/status` | Update order status |
| PUT | `/api/admin/orders/:id/notes` | Add admin note |
| POST | `/api/admin/orders/export` | Export selected orders to CSV |

---

## 🧑‍💻 Admin Panel UI

| Page | Features |
|------|-----------|
| **Login Page** | Email, password, sign in |
| **Dashboard** | KPI summary + quick links |
| **Products Page** | Table view, search, pagination, Add/Edit/Delete |
| **Product Form** | Create or edit product with validation |
| **Orders Page** | Table with filters (status/date/search), export to CSV |
| **Order Details** | Update status, view items, shipping info, admin notes |

---

## 🧰 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-mini-project.git
cd ecommerce-mini-project
