import { Outlet } from "react-location";

const Layout = () => {
  return (
    <div>
      {/* <div>
        <Link to="/">Home</Link>
        <Link to="/primevisualizer">Prime visualizer</Link>
      </div> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
