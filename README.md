# Next.js Post Management App

## 📌 Overview
This project is a **Next.js** web application that allows users to manage posts with features such as:

- **CRUD Operations**: Create, read, update, and delete posts.
- **Swagger API Documentation**: Provides a user-friendly way to explore API endpoints.
- **Confirmation Modal**: Used for critical actions (e.g., deleting a post).
- **State Management**: Updates the UI dynamically after a post is deleted.
- **Database Seeding**: Uses Prisma to seed the database with initial data.
- **Unit Testing**: Ensures code reliability and functionality.

---

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

---

## 🛠️ Installation & Setup
### **Clone the Repository**
```bash
git clone https://github.com/gcastro0690/gcastro-streaver-challenge.git
cd gcastro-challenge
```

### **Install Dependencies**
```bash
yarn install
```

### **Set Up the Database**
```bash
yarn prisma migrate dev --name init
yarn prisma db seed
```

### **Run the Development Server**
```bash
yarn dev
```
> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📖 API Documentation (Swagger)
- **Swagger UI is integrated** to provide a user-friendly interface for API testing.
- **Extra endpoints have been added** beyond the required ones to improve API visibility.

### **Accessing the Swagger Documentation**
- Run the development server:
  ```bash
  yarn dev
  ```
- Open your browser and go to:
  ```
  http://localhost:3000/swagger
  ```
- If deployed, access it at:
  ```
  https://gcastro-challenge.vercel.app/swagger
  ```

---

## ✅ Running Tests
To run unit tests, use:
```bash
yarn test
```

---

## 🚀 Deployment
The application is deployed on **Vercel** at:
  
  [https://gcastro-challenge.vercel.app/](https://gcastro-challenge.vercel.app/)
  
  To deploy manually:
```bash
yarn vercel --prod
```

---

## 🔮 Future Improvements
- **UI/UX Enhancements** → Improve design, animations, and layout consistency.
- **Authentication & Authorization** → Add role-based access control.
- **Pagination & Search** → Improve post management for large datasets.
- **Integration Tests** → Expand test coverage for API and user interactions.
- **Database Optimization** → Implement indexing and query optimizations.

---

## 👥 Contributors
- **Gonzalo Castro** - [GitHub Profile](https://github.com/gcastro0690)

---

## 📜 License
This project is licensed under the **MIT License**.

