import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginSelection from "./pages/LoginSelection";
import FarmerRegistration from "./pages/FarmerRegistration";
import FarmerProfile from "./pages/FarmerProfile";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerRegistration from "./pages/ConsumerRegistration";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import ProductListing from "./pages/ProductListing";
import Cart from "./pages/Cart";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import BulkOrder from "./pages/BulkOrder";
import RealTimeMarket from "./pages/RealTimeMarket";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginSelection,
  },
  {
    path: "/farmer/register",
    Component: FarmerRegistration,
  },
  {
    path: "/farmer/profile",
    Component: FarmerProfile,
  },
  {
    path: "/farmer/dashboard",
    Component: FarmerDashboard,
  },
  {
    path: "/consumer/register",
    Component: ConsumerRegistration,
  },
  {
    path: "/consumer/dashboard",
    Component: ConsumerDashboard,
  },
  {
    path: "/consumer/products/:category",
    Component: ProductListing,
  },
  {
    path: "/consumer/cart",
    Component: Cart,
  },
  {
    path: "/delivery/dashboard",
    Component: DeliveryDashboard,
  },
  {
    path: "/bulk-order",
    Component: BulkOrder,
  },
  {
    path: "/market",
    Component: RealTimeMarket,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
]);
