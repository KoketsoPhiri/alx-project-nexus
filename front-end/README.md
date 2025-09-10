## Project Documentation

## Overview

This project is a modern, responsive e-commerce application built with Next.js, React, and Redux Toolkit. It features a dynamic product catalog, a shopping cart, and a multi-step checkout process. The styling is managed using Tailwind CSS for a consistent, professional, and visually appealing user interface. The application includes key features such as user authentication, product filtering, and a persistent cart, demonstrating best practices in front-end architecture.

## Core Technologies
Next.js: A React framework for production-grade applications, enabling server-side rendering (SSR) and file-based routing.

React: The front-end library for building the user interface.

Redux Toolkit: A state management library for handling application data, including products, cart items, and user information.

Tailwind CSS: A utility-first CSS framework for rapid and consistent styling.

NextAuth.js: An open-source authentication solution for Next.js applications.

React Hot Toast: A library for displaying user-friendly toast notifications.

## Key Features Implemented
Product Catalog: Fetches product data from a local API (/pages/api/products.ts) and displays it on the homepage.

Shopping Cart: Manages adding, removing, and updating product quantities. Cart state is persisted to localStorage for continuity across sessions.

User Authentication: Integrated NextAuth.js with a GitHub provider to allow users to sign in and out. This feature provides the foundation for user-specific data like order history and a persistent cart.

Dynamic Filtering & Sorting: Users can sort products by price, rating, and name, providing a more intuitive and functional browsing experience.

Multi-Step Checkout: The checkout process is divided into logical, user-friendly steps: shipping, payment, and a final order review.

Responsive Design: The entire application is built with a mobile-first approach, ensuring it looks and functions correctly on all screen sizes.

Error Handling: Includes custom 404.tsx pages and robust handling for data-fetching errors.

Toast Notifications: Provides real-time, non-intrusive feedback to the user for actions like "Item added to cart" and "Order placed."

## Challenges and Solutions

Challenge: localStorage is not defined on the Server
The initial project attempted to read from localStorage directly when initializing the Redux store. This caused a ReferenceError during Next.js's server-side rendering (SSR), as localStorage is a browser-only API.

Solution: We refactored the code to hydrate the Redux store from localStorage only after the application has mounted on the client side. This was achieved by using a useEffect hook in the _app.tsx file, which ensures the code runs exclusively in the browser environment.

Challenge: Inconsistent Styling on New Pages
When new components and pages were added (e.g., the checkout summary), they initially had default white backgrounds and dark text, making them invisible against the new dark-themed background of the main layout.

Solution: We systematically audited and updated the Tailwind CSS classes for each component (OrderSummary.tsx, PaymentSummary.tsx, ProductCard.tsx). The primary styling change involved replacing light-themed classes (bg-white, text-gray-700) with their dark-themed counterparts (bg-slate-700, text-slate-100) to create a cohesive design system that works on both light and dark backgrounds.

Challenge: Managing Shared Components
Initially, the <Header /> component was imported and added to every single page file. As the project grew and a <Footer /> was introduced, this approach became repetitive and difficult to maintain.

Solution: We adopted the recommended Next.js architectural pattern for shared components. By moving the <Header /> and <Footer /> components into the _app.tsx file, they now automatically wrap every page in the application. This simplifies code, centralizes layout management, and ensures a consistent user interface across the entire site.
