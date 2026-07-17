import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
