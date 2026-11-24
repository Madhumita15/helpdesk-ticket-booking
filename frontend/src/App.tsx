import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./Routes/Routes";
import { Toaster } from "sonner";
import QueryClientProviderPage from "./services/provider/QueryClientProvider";

function App() {
  return (
    <QueryClientProviderPage>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={Routes} />
    </QueryClientProviderPage>
  );
}

export default App;
