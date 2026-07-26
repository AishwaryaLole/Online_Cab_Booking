import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";

function PassengerLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar role="PASSENGER" />

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default PassengerLayout;