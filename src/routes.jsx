import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import MainLayout from "./Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>},
        {path:"/reviewExtracted",element:<ReviewExtracted/>}
    ]
  },

]);

export default router;
