# E-commerce website

This is a simplified e-commerce web app built as a portfolio project to demonstrate proficiency in modern web development technologies. The application features a product browsing page, a shopping cart, and a basic checkout flow.

## 🚀 Live Demo

[Link to your live demo, if available]

## 📋 Features

- **Product Catalog**: Browse a list of products with details like ratings and prices.
- **Shopping Cart**: Add products to a persistent shopping cart.
- **Checkout Process**: Review items, select a delivery option, and view an order summary.
- **State Management**: The application state is managed centrally using Redux Toolkit.
- **Local API**: Products are fetched from a local API endpoint to simulate a backend service.

---

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Utilities**: [Day.js](https://day.js.org/) for date manipulation

---

## 🛠️ Installation & Setup

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/amazon-clone-nextjs.git](https://github.com/your-username/amazon-clone-nextjs.git)
    cd amazon-clone-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:3000`.

---

## 📁 Project Structure

The project follows a modular structure to keep the code organized and maintainable.

amazon-clone-nextjs/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ...
├── data/                # Static data files (e.g., products.json)
├── pages/               # Next.js pages and API routes
│   ├── api/
│   │   └── products.ts    # Local API endpoint
│   ├── _app.tsx
│   ├── checkout.tsx
│   ├── index.tsx
│   └── orders.tsx
├── public/              # Static assets (images, icons)
├── store/               # Redux store and slices
│   ├── slices/
│   │   ├── cartSlice.ts
│   │   └── productsSlice.ts
│   └── store.ts
├── styles/              # Tailwind CSS and global styles
├── types/               # TypeScript type definitions
└── utils/               # Helper functions


---

## 🚀 Key Architectural Decisions

- **Pages Router**: The project uses the Next.js Pages Router for simple and intuitive file-system routing.
- **Client-Side Rendering (CSR)**: The home page and checkout page are primarily rendered on the client to interact with the Redux store and `localStorage`.
- **API Routes**: A simple Next.js API route (`pages/api/products.ts`) is used to serve product data, separating the data layer from the UI.
- **Redux for State**: Redux Toolkit is the chosen state management library for its predictability and ease of use, especially with asynchronous data fetching.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.

---

## More info on the project :
y moving the cart logic to the Redux cartSlice.ts, we achieve a more robust and scalable solution:

Centralized State: The cart state is now part of the global Redux store, making it accessible from any component without prop drilling.

Predictable Updates: All changes to the cart state must go through a defined Redux action (addToCart, removeFromCart), which makes state updates predictable and easier to debug.

Decoupling: The components are now decoupled from the data storage mechanism. They simply dispatch actions to the store, and the Redux slice handles the interaction with localStorage behind the scenes.

In short, the functionality of data/cart.ts has been absorbed by store/slices/cartSlice.ts, which is a more modern and efficient way to handle application state in a complex React application.

## REDUX :

State Management (Redux Toolkit)
The application's entire state is managed by a single Redux store, which is divided into "slices."

productsSlice: Manages the list of products. It uses a createAsyncThunk to fetch data from the local /api/products endpoint.

cartSlice: Handles all shopping cart logic. Actions like addToCart and removeFromCart are dispatched to modify the cart state, which is also persisted to localStorage.

deliveryOptionsSlice: Stores the available delivery options, which are used to calculate shipping costs during checkout.

ordersSlice: Manages past orders. When a user "places an order," the cart contents are moved to this slice, and the cart is cleared.

Pages and Components
pages/index.tsx (Home Page): Displays all available products. It dispatches the fetchProducts action on mount to load data into the Redux store. Each product is rendered using the <ProductCard> component.

pages/checkout.tsx (Checkout Page): Presents a detailed view of the shopping cart. It is composed of two main components:

<OrderSummary>: Displays the list of products in the cart, allowing the user to update quantities and select a delivery option.

<PaymentSummary>: Calculates and displays the total cost, including item price, shipping, tax, and the final order total.

pages/orders.tsx (Orders Page): A placeholder page to view past orders. The logic for displaying order history would be implemented here, pulling data from the ordersSlice.

## DeliveryOptions:

The data/deliveryOptions.ts file has been incorporated into the Redux store and is no longer needed. The delivery options data is now managed directly within the store/slices/deliveryOptionsSlice.ts file.

Why the Change?
In a small, simple project, storing static data like delivery options in a separate file is acceptable. However, in an application using a state management library like Redux, it's a better practice to keep all state-related data and logic within the Redux store.

By moving the data into deliveryOptionsSlice.ts, we ensure that:

Consistency: All application state, whether dynamic (like the cart) or static (like delivery options), is managed in one centralized location.

Scalability: If you ever need to fetch delivery options from a server or change them based on certain conditions, the logic is already in the correct place, ready to be updated with an asynchronous thunk.

Cohesion: The slice contains both the initial data and any future logic for managing that data, keeping related concerns together.

This change is a key part of migrating the project to a more robust and scalable architecture using Redux Toolkit.

## ORDERS :

The data/orders.ts file is not included in the new project structure because the orders data is now managed by a Redux slice for centralized state management. This is a key part of the migration from a simple project structure to a more robust, scalable architecture.

Why the Change?
In a Redux-based application, all state—including order history—should be handled within the Redux store. This approach offers several benefits over using a separate data file:

Centralized Control: The ordersSlice.ts serves as the single source of truth for all order data. This makes it easier to track changes and debug issues.

Predictable State Updates: Any change to the order list (e.g., adding a new order) must be done through a Redux action (addOrder), ensuring that state transitions are predictable and follow a clear pattern.

Decoupling: The components (like the orders.tsx page) don't need to know where the data comes from. They simply select data from the Redux store, and the store handles the underlying data logic.

In short, the functionality of data/orders.ts is now handled by store/slices/ordersSlice.ts. This is a more modern and efficient way to manage application state, especially for features like order history that will grow over time.
