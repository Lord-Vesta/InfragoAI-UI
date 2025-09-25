import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import MainLayout from "./Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>}
    ]
  },

]);

export default router;
