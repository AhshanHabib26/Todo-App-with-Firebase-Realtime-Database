import { RouterProvider } from "react-router-dom";
import { routers } from "./router/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={routers} />
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
