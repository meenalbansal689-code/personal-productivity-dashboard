import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; /*Outlet is a placeholder where nested child routes render*/

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          marginLeft: "220px",
          flex: 1,
          padding: "20px"
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}