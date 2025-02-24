# Project Assumptions and Design Decisions

## 📌 Project Description

This project is a web application built with **Next.js** that allows users to manage posts. It includes the following functionalities:

- **CRUD Operations**: Create, read, update, and delete posts.
- **Swagger API Documentation**: Provides a visual and interactive way to explore API endpoints.
- **Confirmation Modal**: Used for critical actions (e.g., deleting a post).
- **Automatic Redirection**: Redirects users from `/` to `/posts`.
- **State Management for Post Deletion**: The parent component dynamically updates the post list after a post is deleted instead of reloading the page.
- **Database Seeding**: Uses Prisma to seed the database with initial data.
- **Deployment on Vercel**: The application is deployed on **Vercel** at:
  
  [https://gcastro-challenge.vercel.app/](https://gcastro-challenge.vercel.app/)

---

## **📌 Installation & Setup**

### **Clone the Repository**
```bash
git clone https://github.com/gcastro0690/gcastro-streaver-challenge.git
cd gcastro-challenge
```

---

## **📌 Design Decisions and Assumptions**

### **1️⃣ Next.js as the Main Framework**

- **Why Next.js?** Chosen for its native TypeScript support, dynamic routing, and server-side rendering (SSR).
- **API & Pages Structure:**
  - API routes are organized under `/pages/api/`.
  - Application pages are placed in `/pages/`.

### **2️⃣ Prisma ORM for Database Management**

- **Prisma is used as the ORM** to interact with the database.
- **Defined Model in **``:
  ```prisma
  model Post {
    id      Int    @id @default(autoincrement())
    title   String
    body    String
    userId  Int
  }
  ```
- Prisma Client is generated using:
  ```bash
  npx prisma generate
  ```
- **Seeding the Database:**
  - The database is seeded with initial data using Prisma's `db seed` functionality.
  - The seed script is located in `prisma/seed.ts` and runs automatically during deployment.
  - Example seed data includes default users and posts.
  ```bash
  yarn prisma db seed
  ```

### **3️⃣ API Documentation with Swagger**

- **Swagger UI has been integrated** to provide a user-friendly documentation interface for the API.
- **Additional endpoints have been added** beyond the required ones to allow better visibility of available operations in Swagger.
- This ensures a better developer experience by making the API easily testable and browsable.
- **Accessing the Swagger documentation:**
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

### **4️⃣ Reusable Confirmation Modal**

A **ConfirmationModal** component was created to handle actions requiring user confirmation (e.g., deleting a post). It receives the following props:

- `message`: The message displayed in the modal.
- `isOpen`: Controls whether the modal is visible.
- `onClose`: Function executed when the modal is closed.
- `onConfirm`: Function executed when the action is confirmed.

### **5️⃣ Automatic Redirection from `/` to `/posts`**

To ensure users are always directed to the **posts page**, redirection is implemented in two ways:

- **Server-side redirection** via `next.config.js`.
- **Client-side redirection** using `useRouter` from Next.js.

### **6️⃣ State Management for Post Deletion**

- Instead of reloading the page, posts are removed dynamically from the **state in the parent component**.
- A callback (`onPostDeleted`) is passed from the parent to the `PostCard` component to update the UI instantly upon successful deletion.

### **7️⃣ Unit Testing**

- **Configured Jest and React Testing Library** to ensure code reliability.
- **Mocked components and functions** to isolate test cases.
- **Tested scenarios include**:
  - Rendering the `PostCard` component.
  - Opening and closing the confirmation modal.
  - Interacting with the "Yes" and "No" buttons.
  - API calls to delete a post.
  - Handling API failures gracefully and showing appropriate error messages.
  - Ensuring that `onPostDeleted` is triggered when a post is deleted.

### **8️⃣ Styling with Tailwind CSS**

- Tailwind CSS is used for styling.
- Utility classes ensure a **consistent and responsive design**.

### **9️⃣ Project Structure**

The project follows Next.js conventions:

```
/pages      # Application pages & API routes
/components # Reusable UI components
/prisma     # Prisma configuration & schema
/tests      # Unit tests
```

---

## **🚀 Future Improvements**

- **UI/UX Enhancements:** Improve the design and user experience by refining styles, adding animations, and ensuring better layout consistency.
- **Authentication & Authorization:** Implement a proper authentication system with role-based permissions.
- **Pagination:** Add pagination for better performance with large datasets.
- **Search & Filters:** Implement post search and filtering.
- **Integration Tests:** Extend testing to cover full user workflows.
- **Database Optimization:** Evaluate database indexing strategies for better performance.