import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <WishlistProvider>
          <AppRoutes />
        </WishlistProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
