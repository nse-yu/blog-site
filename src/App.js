import ResourceProvider from "./components/ResourceProvider";
import Top from "./components/top/top";

function App() {
  return (
    <>
      <ResourceProvider>
        <Top />
      </ResourceProvider>
    </>   
  );
}

export default App;
