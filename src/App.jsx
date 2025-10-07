import { RouterProvider } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { router } from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
