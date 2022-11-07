import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Article from "./components/article/article";
import Top from "./components/top/top";
import EditTop from "./components/edit/edit_top";
import { baseThemes } from "./theme"
import { ThemeProvider } from "@emotion/react";
import Categories from "./components/Categories";
import SearchResult from "./components/SearchResult";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ThemeProvider theme={baseThemes}><Top /></ThemeProvider>,
      children: [
        {
          path: "/category/:tabName",
          element: <ThemeProvider theme={baseThemes}><Categories /></ThemeProvider>,
        },
        {
          path: "/article/:articleID",
          element: <Article />,
        },
        {
          path: "/search",
          element: <ThemeProvider theme={baseThemes}><SearchResult /></ThemeProvider>,
        }
      ]
    },
    {
      path: "/edit/:articleID",
      element: <EditTop />,
    },
    {
      path: "/edit/",
      element: <EditTop />,
    }
  ])
  
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
