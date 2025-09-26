import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import Login from "./pages/Login";
import MainLayout from "./Layout/MainLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>}
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  }

]);

export default router;
