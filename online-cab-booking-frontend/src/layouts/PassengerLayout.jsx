import { Outlet } from "react-router-dom";
import Sidebar from "../components/passenger/Sidebar";
import TopNavbar from "../components/passenger/TopNavbar";

export default function PassengerLayout() {
  return (
    <div className="flex h-screen bg-[#F8F5FF]">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <TopNavbar />

        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}