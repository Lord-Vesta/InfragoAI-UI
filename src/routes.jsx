import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import Login from "./pages/Login";
import Mainlayout from "./Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>},
        {path:"/reviewExtracted",element:<ReviewExtracted/>}
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  }

]);

export default router;
