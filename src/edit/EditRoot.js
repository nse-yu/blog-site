import ResourceProvider from "../components/ResourceProvider";
import EditTop from "./components/top/top";

function EditRoot() {
  return (
    <>
      <ResourceProvider>
        <EditTop />
      </ResourceProvider>
    </>   
  );
}

export default EditRoot;