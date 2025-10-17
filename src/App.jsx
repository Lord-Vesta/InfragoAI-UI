import { RouterProvider } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { loginRoute, router } from "./routes";

function App() {
  const auth = localStorage.getItem("accessToken");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {auth ? (
        <RouterProvider router={router} />
      ) : (
        <RouterProvider router={loginRoute} />
      )}
    </ThemeProvider>
  );
}

export default App;
