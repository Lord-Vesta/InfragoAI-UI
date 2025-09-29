import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import Mainlayout from "./Layout/Mainlayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>},
        {path:"/reviewExtracted",element:<ReviewExtracted/>}
    ]
  },

]);

export default router;
