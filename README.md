# 📸 Mini Insta - Premium Blog App (Test 4)

Welcome to **Mini Insta**, a modern full-stack micro-blogging platform focused on visual storytelling and seamless user interaction.

[![GitHub Repo](https://img.shields.io/badge/GitHub-test--3-blue?logo=github)](https://github.com/vikash0064/test-3)

---

# 🖼️ Application Screenshots

👉 **IMPORTANT:**
Upload your images to the `screenshots/` folder in your project, and make sure their names match the ones below (`home.png`, `register.png`, etc.).

---

## 🏠 Home Feed
![Home](screenshots/Screenshot%202026-02-23%20104233.png)

---

## 👤 Register Page
![Register](screenshots/Screenshot%202026-02-23%20104805.png)

---

## ➕ Create Post
![Create Post](screenshots/Screenshot%202026-02-23%20103136.png)

---

## 📄 Post Details View
![Post Details](screenshots/Screenshot%202026-02-23%20103237.png)

---

## 🗑️ Delete Post Action
![Delete Post](screenshots/Screenshot%202026-02-23%20105512.png)

---

# 🚀 Key Features

*   🔐 **Secure Authentication**: JWT-based login system with Bcrypt password hashing.
*   📸 **Image Upload Support**: Seamless integration with Cloudinary for fast image hosting.
*   🌙 **Dark & Light Theme**: Built-in UI themes with smooth transitions.
*   📱 **Fully Responsive**: Optimized for all devices (Mobile, Tablet, Desktop).
*   ⚡ **Fast Loading**: Optimized post feed with pagination support.
*   💬 **Social Interactions**: Like, comment, and manage posts in real-time.
*   👤 **User Profiles**: Custom user dashboards with personal post grids.

---

# 🛠️ Tech Stack

*   **Backend**: Node.js & Express.js
*   **Database**: MongoDB Atlas
*   **Template Engine**: EJS (Embedded JavaScript)
*   **Image Storage**: Cloudinary
*   **File Handling**: Multer
*   **Authentication**: JWT & Cookie-Parser

---

# 📡 API Endpoints (TEST 4)

### 👤 Register User
**POST**
```text
http://localhost:3000/register
```

### 📝 Create Post
**POST**
```text
http://localhost:3000/post
```

### 🗑️ Delete Post
**POST**
```text
http://localhost:3000/post/699be00b9a1e6d222146c4cc/delete
```

### 📄 Get Single Post
**GET**
```text
http://localhost:3000/post/6999465236facf0a696d97da
```

---

# ⚙️ Setup & Installation

### 1️⃣ Clone Repo
```bash
git clone https://github.com/vikash0064/test-3.git
cd mini-insta
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create `.env`
Create a `.env` file in the root directory and add your credentials:
```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4️⃣ Run Server
```bash
npm start
```
Open: [http://localhost:3000](http://localhost:3000)

---

# 🏗️ Image Upload Flow

1.  **Selection**: User selects an image in the frontend.
2.  **Processing**: **Multer** intercepts the file and converts it to a buffer.
3.  **Upload**: The buffer is streamed to **Cloudinary**.
4.  **Link**: Cloudinary returns a secure URL.
5.  **Save**: The URL is stored in the **MongoDB** post document.

---

# 👨‍💻 Author

**Vikash Kumar** 

---

# ⭐ Support

If you like this project:
- ⭐ **Star** the repo
- 🍴 **Fork** it
- 🧑‍💻 **Contribute**

---
