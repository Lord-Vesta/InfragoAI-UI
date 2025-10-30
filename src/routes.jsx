import { createBrowserRouter } from "react-router";
import UploadPage from "./pages/UploadPage";
import ReviewExtracted from "./pages/ReviewExtracted";
import Login from "./pages/Login";
import QualificationInputs from "./pages/QualificationInputs";
import Profile from "./pages/Profile";
import TechnicalConfirmation from "./pages/TechnicalConfirmation";
import BGsummary from "./pages/BGsummary";
import Mainlayout from "./Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { path: "/upload", element: <UploadPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/", element: <Profile /> },
      { path: "/reviewextracted/:project_id", element: <ReviewExtracted /> },
      {
        path: "/qualificationinputs/:project_id",
        element: <QualificationInputs />,
      },
      {
        path: "/technicalconfirmation/:project_id",
        element: <TechnicalConfirmation />,
      },
      { path: "/bgsummary/:project_id", element: <BGsummary /> },
      { path: "/upload/:project_id", element: <UploadPage /> },
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
      { path: "/reviewextracted/:project_id", element: <ReviewExtracted /> },
      { path: "/upload/:project_id", element: <UploadPage /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
