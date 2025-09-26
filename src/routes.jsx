import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import Mainlayout from "./Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>}
    ]
  },

]);

export default router;
