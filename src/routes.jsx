import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import Login from "./pages/Login";
import QualificationInputs from "./pages/QualificationInputs";
import TechnicalConfirmation from "./pages/TechnicalConfirmation";
import Mainlayout from "./layout/Mainlayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout/>,
    children:[
        {path:"/upload",element:<UploadPage/>},
        {path:"/ReviewExtracted",element:<ReviewExtracted/>},   
        {path:"/QualificationInputs",element:<QualificationInputs/>},
        {path:"/TechnicalConfirmation",element:<TechnicalConfirmation/>},
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  }

]);

export default router;
