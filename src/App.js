import { BrowserRouter, Route, Routes } from "react-router-dom";
import Article from "./components/article/article";
import Top from "./components/top/top";
import EditTop from "./components/edit/edit_top";
import { useResource } from "./components/ResourceProvider";
import Root from "./Root";

function App() {
  const {tabs_json} = useResource()
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/category/:tabName" element={<Top />} />
          <Route path="/edit/:articleID" element={<EditTop />} />
          <Route path="/edit/" element={<EditTop />} />
          <Route path="/article/:articleID" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </>   
  );
}

export default App;
