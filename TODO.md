# RentEase - Dual Checkout Flow Implementation

## Steps

### Frontend

- [x] 1. Update `client/src/pages/ProductDetails.jsx` - Rent Now buttons to pass product via navigate state
- [x] 2. Update `client/src/pages/Checkout.jsx` - detect rentNow mode, use checkoutItems for all calculations, conditional clearCart
- [x] 2b. Update `client/src/pages/NewArrivals.jsx` - Rent Now passes product state (was showing cart items)
- [x] 2c. Update `client/src/pages/OffersDeals.jsx` - Rent Now passes product state (was showing cart items)
- [x] 2d. Update `client/src/pages/NewArrivals.jsx` - fetch products with `condition: "new"` instead of `isNewArrival`
- [x] 2e. Update `backend/src/controllers/productController.js` - add `condition` query filter support

### Backend

- [x] 3. Update `backend/src/controllers/orderController.js` - support rentNow single-item order creation
- [x] 4. Update `backend/src/controllers/paymentController.js` - only clear cart when NOT rentNow
- [x] 4b. Remove `Cart.deleteMany` from `placeOrder` - cart only cleared after successful payment (preserves cart on failure)

### Frontend

- [x] 5b. Update `client/src/pages/Checkout.jsx` - on checkout failure, redirect to `/cart` without clearing cart

### My Orders Page

- [x] 8. Create `client/src/pages/Orders.jsx` - My Orders page fetching GET /orders
- [x] 9. Add `/orders` route in `client/src/routes/AppRoutes.jsx`
- [x] 10. Create `client/src/services/orderService.js` - order service helpers

### Track Order Page

- [x] 11. Create `client/src/pages/TrackOrder.jsx` - Track Order page with status timeline from activityLog
- [x] 12. Add `/orders/track/:id` route in `client/src/routes/AppRoutes.jsx`
- [x] 13. Add "Track Order" button on each order card in `client/src/pages/Orders.jsx`
- [x] 14. Add "Track Order" link in `client/src/components/layout/DesktopNavbar.jsx`

### Help Page

- [x] 15. Create `client/src/pages/Help.jsx` - Help & Support page with FAQs and contact form
- [x] 16. Add `/help` route in `client/src/routes/AppRoutes.jsx`
- [x] 17. Wire "Help" link in `client/src/components/layout/DesktopTopbar.jsx`
- [x] 18. Create `backend/src/models/SupportTicket.js` - support ticket model
- [x] 19. Create `backend/src/controllers/helpController.js` - FAQ, submit ticket, get tickets
- [x] 20. Create `backend/src/routes/helpRoutes.js` - help routes
- [x] 21. Register `/api/help` in `backend/src/app.js`

### Testing

- [ ] 5. Verify cart checkout flow (full cart) works
- [ ] 6. Verify Rent Now checkout flow (single product, cart untouched)
- [ ] 7. Verify cart is NOT cleared and user is redirected to /cart when checkout fails
