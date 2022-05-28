import { BrowserRouter, Route, Routes } from "react-router-dom";
import Article from "./components/article/article";
import Top from "./components/top/top";
import EditTop from "./components/edit/edit_top";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/tab/:tabID" element={<Top />} />
          <Route path="/edit/:articleID" element={<EditTop />} />
          <Route path="/edit/" element={<EditTop />} />
          <Route path="/article/:articleID" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </>   
  );
}

export default App;
