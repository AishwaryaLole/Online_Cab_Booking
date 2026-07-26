import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";

function DriverLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar role="DRIVER" />

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default DriverLayout;