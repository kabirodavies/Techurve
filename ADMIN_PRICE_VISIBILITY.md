# Admin-Gated Price Visibility Implementation

## Overview
This document describes the implementation of restricting product price visibility to admin users only. Non-admin users cannot see prices on the Shop, Product, or Cart pages, but can request a quotation instead. Once an order is in processing, users can see prices on their orders (existing logic).

## Logic
- **Admin users** (determined by `user.publicMetadata.role === "admin"` via Clerk) can see all product prices.
- **Non-admin users** cannot see prices on:
  - Shop page
  - Product page
  - Cart page
- **Non-admin users** are shown a "Request Quotation" option instead of prices.
- **Order page logic** for price visibility remains unchanged.

## Implementation Details

### 1. Admin Check Hook
- **File:** `hooks/useIsAdmin.ts`
- Provides a `useIsAdmin` hook to check if the current user is an admin using Clerk.

### 2. PriceView Component
- **File:** `components/PriceView.tsx`
- Added a `hidden` prop to allow conditional rendering of prices.

### 3. Product Card
- **File:** `components/ProductCard.tsx`
- Uses `useIsAdmin` to show price only to admins; non-admins see the existing quotation/request logic.

### 4. Product Price Section
- **File:** `components/ProductPriceSection.tsx`
- Client component for the product page that only shows price to admins.

### 5. Product Page
- **File:** `app/(client)/product/[slug]/page.tsx`
- Uses `ProductPriceSection` for price display.

### 6. Cart Page
- **File:** `app/(client)/cart/page.tsx`
- All price displays (product price, subtotal, discount, total) are only visible to admins; non-admins see only the quotation logic.

## Usage
- To check if a user is an admin, use the `useIsAdmin` hook in any client component:
  ```js
  import { useIsAdmin } from "@/hooks/useIsAdmin";
  const isAdmin = useIsAdmin();
  ```
- To hide a price for non-admins, use the `hidden` prop in `PriceView` or conditionally render price components based on `isAdmin`.

## Notes
- No new quotation button was created; existing logic is used.
- Test as both admin and non-admin to ensure the logic works as expected.
- Update any other components that render prices directly using the same pattern if needed. 