import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import Login from "./pages/Login";
import QualificationInputs from "./pages/QualificationInputs";
import Profile from "./pages/Profile";
import Mainlayout from "./Layout/MainLayout";
import TechnicalConfirmation from "./pages/TechnicalConfirmation";
import BGsummary from "./pages/BGsummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { path: "/upload", element: <UploadPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/", element: <Profile /> },
      { path: "/ReviewExtracted/:project_id", element: <ReviewExtracted /> },
      {
        path: "/QualificationInputs/:project_id",
        element: <QualificationInputs />,
      },
      {
        path: "/TechnicalConfirmation/:project_id",
        element: <TechnicalConfirmation />,
      },
      { path: "/BGsummary/:project_id", element: <BGsummary /> },
      { path: "/upload/:project_id", element: <UploadPage /> },
      { path: "/ReviewExtracted/:projectId", element: <ReviewExtracted /> },
    ],
  },
]);

export const loginRoute = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { path: "/upload", element: <UploadPage /> },
      { path: "/ReviewExtracted/:project_id", element: <ReviewExtracted /> },
      { path: "/upload/:project_id", element: <UploadPage /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
