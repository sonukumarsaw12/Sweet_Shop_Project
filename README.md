# 🍬 Sweet Shop Project

A full-stack **Sweet Shop Management System** built using modern web technologies and following **Test-Driven Development (TDD)** principles.  
The application supports **user authentication, admin inventory management, shopping cart, and order tracking** with a clean and responsive UI.

🔗 **Live Demo:** https://sweet-shop-sk.vercel.app/

   **Admin Panel ID:** admin@sweetshop.com
   
   **Admin Password:** admin123

---

## 📌 Project Overview

The Sweet Shop Management System allows users to browse and purchase sweets online, while admins can manage inventory and stock efficiently.

### ✨ Key Features
- User registration & login (JWT authentication)
- Admin login & secure admin dashboard
- Browse sweets with price and stock availability
- Search sweets by name or category
- Add to cart & checkout
- View order history
- Role-based access (User / Admin)
- Inventory management (Add, Update, Delete, Restock sweets)

---

## 🧑‍💻 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful APIs

### Testing
- Jest
- Supertest
- Test-Driven Development (Red → Green → Refactor)

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 🏗️ System Architecture

- **Frontend:** React (Axios for API calls)
  ↓
- **Backend:** Node.js + Express
  ↓
- **Database:** MongoDB

---

## 🔐 API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```
### 🍬 Sweets (Protected)
```http
POST   /api/sweets
GET    /api/sweets
GET    /api/sweets/search
PUT    /api/sweets/:id
DELETE /api/sweets/:id   (Admin only)
```
### 📦 Inventory (Protected)
```http
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock   (Admin only)
```


---

## 🖥️ Screenshots

Screenshots of the following are included in the repository:

- Home Page (Sweet Listing)
<img width="2862" height="1625" alt="Screenshot 2025-12-14 084317" src="https://github.com/user-attachments/assets/b6f3b343-73e5-4910-85b8-20f7acc70097" />

- User Registration & Login
<img width="2561" height="1374" alt="Screenshot 2025-12-14 084329" src="https://github.com/user-attachments/assets/fde031c0-9c26-40b2-89f2-09451f141a80" />
<img width="2060" height="1217" alt="Screenshot 2025-12-14 084338" src="https://github.com/user-attachments/assets/7f8ff54f-bbde-4d1c-94f8-99a9511dfaef" />
- Admin Login
<img width="2208" height="1315" alt="Screenshot 2025-12-14 084351" src="https://github.com/user-attachments/assets/1450748b-dfb1-427b-a4b8-e991b0822416" />
- Admin Dashboard
<img width="2732" height="1456" alt="Screenshot 2025-12-14 084437" src="https://github.com/user-attachments/assets/1c9e2915-02b1-4ca8-8a45-78a7489edc24" />

- Add / Edit / Delete Sweets
<img width="2712" height="1098" alt="Screenshot 2025-12-14 084456" src="https://github.com/user-attachments/assets/8a423a52-b73c-4239-b2cf-cdf6b63dedcf" />

- Shopping Cart
<img width="2677" height="1335" alt="Screenshot 2025-12-14 084543" src="https://github.com/user-attachments/assets/fd6dfa4a-03cd-4057-94de-b75406348e94" />
<img width="2647" height="1281" alt="Screenshot 2025-12-14 084607" src="https://github.com/user-attachments/assets/46ed0bff-c42b-4550-a6e6-b241431c324c" />

 
- Order History
<img width="2636" height="1203" alt="Screenshot 2025-12-14 084622" src="https://github.com/user-attachments/assets/19bfb8b9-fb18-4f0b-b0c1-87a356d66e36" />



---

## 🚀 Getting Started (Local Setup)

### 1) Clone the Repository
```bash
git clone https://github.com/your-username/sweet-shop-project.git
cd sweet-shop-project
```
### 2) Create a .env file:
```base
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 3) Run the backend server:
```base
npm run dev
```
### 4) Frontend Setup
```base
cd frontend
npm install
npm run dev
```
### 5) Run backend test suite:
```base
npm test
```
### ✔ Test Coverage Includes
- Authentication logic
- Sweet CRUD operations
- Inventory updates
- Role-based authorization
- Purchase & restock flows

---

## 🧠 Test-Driven Development (TDD)

This project follows **Test-Driven Development**:

- Write failing tests (**Red**)
- Implement minimum logic (**Green**)
- Refactor for clean code (**Refactor**)

Commit history reflects the **Red → Green → Refactor** workflow.

## 🤖 My AI Usage

### AI Tools Used
- ChatGPT
- GitHub Copilot

### How AI Was Used
- Generating boilerplate code for controllers and services
- Writing initial unit test structures
- Debugging backend and frontend issues
- Improving UI/UX ideas
- Structuring documentation and README

### Reflection
AI significantly improved productivity and helped maintain clean architecture.  
All AI-generated code was **reviewed, modified, and validated manually** to ensure correctness and originality.

## 📝 AI Co-Authoring in Commits

For commits involving AI assistance, the following format was used:


## 🎯 Future Improvements
- Payment gateway integration
- Order status tracking (Delivered / Cancelled)
- Admin analytics dashboard
- Email notifications
- Advanced search and filters

---

## 👤 Author

**Sonu Kumar Saw**  
🎓 B.E. Student | Full Stack Developer  
📍 Chandigarh University  
💻 Skills: MERN Stack, TypeScript, Java, SQL  

---

## ⭐ Final Notes
- Fully original implementation
- AI-assisted but human-validated
- Clean architecture and scalable design
- Production-ready deployment

👉 **Live Application:** https://sweet-shop-sk.vercel.app/
