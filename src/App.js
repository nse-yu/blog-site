import { BrowserRouter, Route, Routes } from "react-router-dom";
import Article from "./components/article/article";
import Top from "./components/top/top";
import EditTop from "./components/edit/edit_top";
import { baseThemes } from "./theme"
import { ThemeProvider } from "@emotion/react";
import Categories from "./components/Categories";
import SearchResult from "./components/SearchResult";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ThemeProvider theme={baseThemes}>
              <Top />
            </ThemeProvider>}
          >
            <Route path="/category/:tabName" element={
              <ThemeProvider theme={baseThemes}>
                <Categories />
              </ThemeProvider>
            }/>
            <Route path="/article/:articleID" element={<Article />}/>
            <Route path="/search" element={
              <ThemeProvider theme={baseThemes}>
                <SearchResult />
              </ThemeProvider>
            }/>
          </Route>
          <Route path="/edit/:articleID" element={<EditTop />} />
          <Route path="/edit/" element={<EditTop />} />
        </Routes>
      </BrowserRouter>
    </>   
  );
}

export default App;
