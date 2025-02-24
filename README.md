# Project: Next.js Post Management App

## 📌 Overview
This project is a **Next.js** web application that allows users to manage posts with features such as:

- **CRUD Operations**: Create, read, update, and delete posts.
- **Confirmation Modal**: Used for critical actions (e.g., deleting a post).
- **Automatic Redirection**: Redirects users from `/` to `/posts`.
- **State Management**: Parent component dynamically updates after post deletion.
- **Database Seeding**: Uses Prisma to seed the database with initial data.
- **Unit Testing**: Ensures code reliability and functionality.

## 🚀 Tech Stack
### **Frontend**
- **Next.js** → React framework with SSR & API routes.
- **TypeScript** → Static typing for better code quality.
- **Tailwind CSS** → Utility-first CSS framework for styling.

### **Backend**
- **Prisma** → ORM for database interactions.
- **Next.js API Routes** → Handles RESTful API endpoints.

### **Database**
- **SQLite** → Stores post data (hosted in `/tmp/` in Vercel since it doesn’t support SQLite natively).
- **Database Seeding** → Uses Prisma’s seed mechanism for initial data population.

### **Testing**
- **Jest** → Unit testing framework.
- **React Testing Library** → Component testing.
- **ts-jest** → TypeScript support for Jest.

## 🛠️ Project Structure
```
/pages      # Application pages & API routes
/components # Reusable UI components
/prisma     # Prisma configuration & schema
/tests      # Unit tests
```

## 🏗️ Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/gcastro0690/gcastro-streaver-challenge.git
cd gcastro-challenge
```

### **2️⃣ Install Dependencies**
```bash
yarn install
```

### **3️⃣ Set Up the Database**
```bash
yarn prisma migrate dev --name init
yarn prisma db seed
```

### **4️⃣ Run the Development Server**
```bash
yarn dev
```
> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## ✅ Running Tests
To run unit tests, use:
```bash
yarn test
```

## 🚀 Deployment
The application is deployed on **Vercel**. To deploy manually:
```bash
yarn vercel --prod
```

## 🔮 Future Improvements
- **UI/UX Enhancements** → Improve design, animations, and layout consistency.
- **Authentication & Authorization** → Add role-based access control.
- **Pagination & Search** → Improve post management for large datasets.
- **Integration Tests** → Expand test coverage for API and user interactions.
- **Database Optimization** → Implement indexing and query optimizations.

## 👥 Contributors
- **Gonzalo Castro** - [GitHub Profile](https://github.com/gcastro0690)

## 📜 License
This project is licensed under the **MIT License**.