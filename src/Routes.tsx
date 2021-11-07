import PrimeVisualizer from "./PrimeVisualizer";
import { ReactLocation, Router } from "react-location";
import Home from "./Home";
import Layout from "./Layout";

const reactLocation = new ReactLocation();

const Routes = () => (
  <Router
    location={reactLocation}
    routes={[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/primevisualizer",
        element: <PrimeVisualizer />,
      },
    ]}
  >
    <Layout />
  </Router>
);
export default Routes;
