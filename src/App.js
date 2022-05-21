import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResourceProvider from "./components/ResourceProvider";
import Top from "./components/top/top";
import EditTop from "./edit/edit_top";

function App() {
  return (
    <>
      <ResourceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/edit" element={<EditTop />} />
          </Routes>
        </BrowserRouter>
      </ResourceProvider>
    </>   
  );
}

export default App;
