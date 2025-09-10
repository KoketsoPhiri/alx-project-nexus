# Amazon Clone Project Documentation

This document provides a comprehensive overview of the **E-commerce web application** project, explaining every architectural and coding decision made. The goal is to provide clarity on the project's structure and the rationale behind its implementation.

---

## 1. Project Setup and Core Technologies

### 1.1 Next.js with Pages Router
**Reasoning:** The project uses Next.js with the **Pages Router** for its straightforward, file-based routing system. This approach is ideal for a small-to-medium-sized application as it simplifies navigation and API route creation. It also offers built-in features like **server-side rendering (SSR)** and **static site generation (SSG)**, which, while not fully leveraged in this client-side-focused implementation, are powerful tools for future expansion.

### 1.2 TypeScript
**Reasoning:** **TypeScript** is used to add static typing to the project. This is a critical decision for improving code quality, reducing bugs, and enhancing developer experience. It allows us to define clear **interfaces** for our data structures (e.g., `Product`, `CartItem`), ensuring consistency and providing autocompletion and type-checking in the IDE.

### 1.3 Redux Toolkit
**Reasoning:** For state management, **Redux Toolkit** was chosen over simpler alternatives like `useState`. This is a crucial architectural decision because it provides a centralized, predictable state container.
* **Centralized State:** All application state—products, cart items, delivery options, and orders—is stored in a single **Redux store**. This eliminates the need for "prop drilling" (passing data down through multiple component layers).
* **Scalability:** As the application grows, Redux Toolkit makes it easy to manage complex state transitions and share data between disconnected components. Its use of "slices" keeps related state logic organized and manageable.

### 1.4 Tailwind CSS
**Reasoning:** **Tailwind CSS** is a utility-first CSS framework. Instead of writing custom CSS classes, we apply pre-built utility classes directly in our JSX. This speeds up development, maintains design consistency, and keeps the styling logic alongside the components they affect.

---

## 2. Project Structure Breakdown

### 2.1 `/pages`
This folder is the heart of the Next.js application, defining the routes.
* **`_app.tsx`**: This is a core Next.js file that wraps the entire application. We use it to provide the **Redux store** to all pages, making our state globally accessible. This is where the Redux Provider is configured.
* **`index.tsx`**: The main landing page. It is responsible for fetching and displaying the product catalog.
* **`checkout.tsx`**: The page where users review their cart and proceed to checkout.
* **`orders.tsx`**: A placeholder page for viewing past orders. The logic for displaying order history would be implemented here, pulling data from the Redux store.

### 2.2 `/pages/api`
This folder contains server-side API routes.
* **`products.ts`**: This file acts as a simple backend, serving the product data from a static JSON file. This approach simulates fetching data from a real database or API without the complexity of setting one up. It allows the front end to function independently.

### 2.3 `/store`
This folder is dedicated to our **Redux Toolkit** state management.
* **`store.ts`**: This file configures and exports the Redux store. It combines all the individual "slices" into a single, cohesive store.
* **`/slices`**: Each slice is a small, self-contained piece of state management logic.
    * **`productsSlice.ts`**: Handles the state of all products. It uses `createAsyncThunk` to manage the lifecycle of the API call to `pages/api/products.ts`, handling loading, success, and error states.
    * **`cartSlice.ts`**: Manages the shopping cart's state. It includes reducers to **add, remove, and update** items. It also persists the cart state to `localStorage` to ensure the cart isn't empty when the user refreshes the page.
    * **`deliveryOptionsSlice.ts`**: Contains the hardcoded delivery options and their associated costs. This could be easily modified to fetch data from an API in the future.
    * **`ordersSlice.ts`**: Manages the list of past orders. The "Place your order" button would dispatch an action to add the current cart to this slice.

### 2.4 `/components`
This folder contains reusable **UI components**.
* **`Header.tsx`**: The navigation bar. It is a shared component that displays the cart quantity, which is retrieved directly from the Redux store. This demonstrates how disconnected components can share state.
* **`ProductCard.tsx`**: A reusable component for displaying an individual product. It dispatches the `addToCart` action to add a product to the cart.
* **`OrderSummary.tsx`**: Displays the items in the cart on the checkout page. It accesses the product and delivery options state from the Redux store to calculate and display the details for each item.
* **`PaymentSummary.tsx`**: Calculates and displays the total cost of the order based on the current cart and delivery options in the Redux store.

---

## 3. Data Flow and Interactivity

### 3.1 Initial Load (Home Page)
1.  The `index.tsx` page mounts.
2.  It dispatches the **`fetchProducts`** action.
3.  The `productsSlice` handles the action, changing the status to `'loading'`.
4.  The `fetchProducts` thunk calls the `/api/products` endpoint.
5.  The API route reads `data/products.json` and sends it as a response.
6.  The thunk completes, and the `productsSlice` updates the state with the fetched data and changes the status to `'succeeded'`.
7.  The `index.tsx` component, connected to the store via `useSelector`, re-renders, displaying the products.

### 3.2 Adding to Cart
1.  A user clicks the "Add to Cart" button on a `ProductCard`.
2.  The `ProductCard` dispatches the **`addToCart`** action with the product's ID.
3.  The `cartSlice` reducer updates the cart's state in the Redux store.
4.  The `Header` component, which is listening to the cart state, automatically re-renders to display the new item count.
5.  The `cartSlice` also saves the updated cart to `localStorage` for persistence.

### 3.3 The Checkout Process
1.  A user navigates to the `checkout.tsx` page.
2.  The `OrderSummary` and `PaymentSummary` components access the cart, product, and delivery option data from the **Redux store**.
3.  The components calculate the subtotal, shipping, and tax based on the current state and display the summary.
4.  The "Place your order" button would dispatch an action to move the items from the cart to the `ordersSlice`, simulating a successful order.

This detailed documentation provides a clear roadmap of the project's architecture, demonstrating the reasoning behind each choice. It serves as a guide for anyone looking to understand or contribute to the project.