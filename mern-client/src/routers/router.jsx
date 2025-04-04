import {
    createBrowserRouter,
    RouterProvider,
    useParams,
  } from "react-router-dom";
  import API_BASE_URL from '../config';
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import Blog from "../components/Blog";
import About from "../components/About";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import Cart from "../components/Cart";
import Payment from "../components/Payment";
import Order from "../components/Order";
import SearchResults from "../components/SearchResults";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: "/shop",
            element: <Shop/>
        },{
            path: "/blog",
            element: <Blog/>
        },{
            path: "/about",
            element: <About/>
        },{
            path: "/cart",
            element: <Cart/>
        },{
            path: "/order",
            element: <Order/>
        },{ 
            path: "/process-checkout",
            element: <Payment/>
        },{
            path: "/search",
            element: <SearchResults/>
        },{
            path: "/book/:id",
            element: <SingleBook/>,
            loader: ({params}) => fetch(`${API_BASE_URL}/book/${params.id}`)
        }
      ]
    },
    // admin routes
    {
      path: "/admin/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: "/admin/dashboard",
          element: <PrivateRoute><Dashboard/></PrivateRoute>
        },
        {
          path: "/admin/dashboard/upload",
          element: <UploadBook/>
        },
        {
          path: "/admin/dashboard/manage",
          element: <ManageBooks/>
        },
        {
          path: "/admin/dashboard/edit-books/:id",
          element: <EditBooks/>,
          loader: ({params}) => fetch(`${API_BASE_URL}/book/${params.id}`)
        }
      ]
    },{
      path: "sign-up",
      element: <Signup/>
    },{
      path: "login",
      element: <Login/>
    },{
      path: "logout",
      element: <Logout/>
    }

  ]);

  export default router;

