# 🌐 E-Commerce-Application_Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens)
![Multer](https://img.shields.io/badge/Multer-1C1C1C?style=for-the-badge)

 
Backend for a Node.js-based e-commerce application. This project provides a complete REST API to interact with the frontend, allowing users to manage products, carts, sales, and user profiles, with data stored in MongoDB. The application is built with **Express.js** and **Mongoose** to handle cloud-based data efficiently. User authentication is managed via **JWT (JSON Web Tokens)**, and media files are stored in Base64 format in the database.

## 🌟 Features

- **Product Management**: Add, edit, or delete products with details and associated media files.
- **User Registration**: Allows users to register, edit profiles, and manage their account.
- **Cart Functionality**: Add products to the cart, manage quantities, and proceed to checkout.
- **Favorites**: Save and manage favorite products.
- **Sales**: Users can sell their products via the platform.
- **API Integration**: The app provides a seamless interaction between frontend and backend with well-documented API routes.
- **MongoDB Cloud Integration**: Uses **Mongoose Atlas** for cloud database management.

## 🛠️ Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB & Mongoose**: NoSQL database and an object data modeling (ODM) library for MongoDB and Node.js.
- **Multer**: Middleware for handling multipart/form-data, especially for file uploads.
- **JWT (JSON Web Tokens)**: Securely transmits information between the client and the server.
- **Firebase**: Optional integration for additional services like notifications or storage.

## 📂 Project Structure

Here's a look at the project structure:

```bash
📦 Backend
 ┣ 📂controllers
 ┃ ┣ 📜addCart.js
 ┃ ┣ 📜findProducts.js
 ┃ ┣ 📜mainProduct.js
 ┃ ┣ 📜saleController.js
 ┃ ┣ 📜saleJournal.js
 ┃ ┗ 📜sortProducts.js
 ┣ 📂models
 ┃ ┣ 📜image.js
 ┃ ┣ 📜Product.js
 ┃ ┗ 📜User.js
 ┣ 📂routes
 ┃ ┣ 📜cartRoutes.js
 ┃ ┣ 📜findRoutes.js
 ┃ ┣ 📜journalRoutes.js
 ┃ ┣ 📜mainRoutes.js
 ┃ ┣ 📜saleRoutes.js
 ┃ ┗ 📜sortRoutes.js
 ┣ 📂tools
 ┃ ┣ 📜CreateNewProduct.js
 ┃ ┣ 📜CreateNewUser.js
 ┃ ┗ 📜emailConfig.js
 ┣ 📂uploads
 ┣ 📜index.js
 ┣ 📜index.html
 ┣ 📜.env
 ┣ 📜package.json
 ┣ 📜package-lock.json
 ┗ 📜.gitignore


 