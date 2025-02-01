import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import CartPage from "../pages/shop/CartPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/cartpage",
        element: <CartPage></CartPage>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
]);
export default router;
