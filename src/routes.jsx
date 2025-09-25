import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import MainLayout from "./layout/Mainlayout";
import Login from "./pages/Login";


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
