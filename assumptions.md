# Project Assumptions and Design Decisions

## 📌 Project Description
This project is a web application built with **Next.js** that allows users to manage posts. It includes the following functionalities:

- **CRUD Operations**: Create, read, update, and delete posts.
- **Unit Testing**: Ensures code quality and functionality.


## **📌 Design Decisions and Assumptions**

### **1️⃣ Next.js as the Main Framework**
- **Why Next.js?** Chosen for its native TypeScript support, dynamic routing, and server-side rendering (SSR).
- **API & Pages Structure:**  
  - API routes are organized under `/pages/api/`.  
  - Application pages are placed in `/pages/`.

### **2️⃣ Prisma ORM for Database Management**
- **Prisma is used as the ORM** to interact with the database.
- **Defined Model in `schema.prisma`**:
  ```prisma
  model User {
    id    Int    @id @default(autoincrement())
    name  String
    email String @unique
    posts Post[]
    }

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

### **3️⃣ Reusable Confirmation Modal**
A **ConfirmationModal** component was created to handle actions requiring user confirmation (e.g., deleting a post). It receives the following props:

- `message`: The message displayed in the modal.
- `isOpen`: Controls whether the modal is visible.
- `onClose`: Function executed when the modal is closed.
- `onConfirm`: Function executed when the action is confirmed.

### **4️⃣ Automatic Redirection from `/` to `/posts`**
To ensure users are always directed to the **posts page**, redirection is implemented in two ways:

- **Server-side redirection** via `next.config.js`.
- **Client-side redirection** using `useRouter` from Next.js.

### **5️⃣ Unit Testing**
- **Configured Jest and React Testing Library** to ensure code reliability.
- **Mocked components and functions** to isolate test cases.

### **6️⃣ Styling with Tailwind CSS**
- Tailwind CSS is used for styling.
- Utility classes ensure a **consistent and responsive design**.

### **7️⃣ Project Structure**
The project follows Next.js conventions:

```
/pages      # Application pages & API routes
/components # Reusable UI components
/prisma     # Prisma configuration & schema
/tests      # Unit tests
```

---

## **📌 Tools and Technologies**

### **Frontend**
- **Next.js** → React framework with SSR.
- **TypeScript** → Static typing for better code management.
- **Tailwind CSS** → Styling with utility-first approach.
- **React Testing Library** → Unit testing for React components.

### **Backend**
- **Prisma** → ORM for database interactions.
- **Next.js API Routes** → Used for RESTful endpoints.

### **Database**
- **SQLite** → Used as the database.
- **Since Vercel does not support SQLite natively, the database file is stored in the `/tmp/` directory to enable temporary use during deployments.**
- **Database Seeding** → The database is seeded with initial data using Prisma's seed mechanism to ensure consistent test and dev environments.

### **Testing**
- **Jest** → Main testing framework.
- **React Testing Library** → Component testing.
- **ts-jest** → TypeScript support for Jest.

### **Other Tools**
- **Husky** → Runs tests before each commit.
- **lint-staged** → Runs tests only on modified files.

---

## **📌 Additional Assumptions**
- **Authentication:** Not implemented for simplicity. It is assumed that `userId` is obtained through some authentication context.
- **Responsive Design:** The UI is designed to be responsive for both mobile and desktop users.
- **Error Handling:** Basic error handling is in place for API requests (e.g., when deleting a post).
- **Deployment:** The app is deployed on **Vercel**, leveraging Next.js's built-in CI/CD capabilities., leveraging Next.js's built-in CI/CD capabilities.

---

## **🚀 Future Improvements**
- **UI/UX Enhancements:** Improve the design and user experience by refining styles, adding animations, and ensuring better layout consistency.
- **Authentication & Authorization:** Implement a proper authentication system with role-based permissions.
- **Pagination:** Add pagination for better performance with large datasets.
- **Search & Filters:** Implement post search and filtering.
- **Integration Tests:** Extend testing to cover full user workflows.
- **Database Optimization:** Evaluate database indexing strategies for better performance.
