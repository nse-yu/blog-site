import { BrowserRouter, Route, Routes } from "react-router-dom";
import Article from "./components/article/article";
import Top from "./components/top/top";
import EditTop from "./components/edit/edit_top";
import AsideNav from "./components/nav/aside_nav";
import Cards from "./components/cards/Cards";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top/>}>
            <Route path="/category/:tabName" element={
              <><Cards grid={true} edit={false}/><AsideNav /></>
            }/>
            <Route path="/article/:articleID" element={<Article />}/>
          </Route>
          <Route path="/edit/:articleID" element={<EditTop />} />
          <Route path="/edit/" element={<EditTop />} />
        </Routes>
      </BrowserRouter>
    </>   
  );
}

export default App;
