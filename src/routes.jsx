import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import Login from "./pages/Login";
import QualificationInputs from "./pages/QualificationInputs";
import Profile from "./pages/Profile";
import Mainlayout from "./layout/Mainlayout";
import TechnicalConfirmation from "./pages/TechnicalConfirmation";
import BGsummary from "./pages/BGsummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { path: "/upload", element: <UploadPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/ReviewExtracted", element: <ReviewExtracted /> },
      { path: "/QualificationInputs", element: <QualificationInputs /> },
      { path: "/TechnicalConfirmation", element: <TechnicalConfirmation /> },
      { path: "/BGsummary", element: <BGsummary /> },
      { path: "/upload/:project_id", element: <UploadPage /> },
      { path: "/ReviewExtracted/:projectId", element: <ReviewExtracted /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const loginRoute = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
