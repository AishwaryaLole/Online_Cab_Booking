import { Outlet } from "react-router-dom";
import PassengerSidebar from "../components/passenger/PassengerSidebar";

function PassengerLayout() {
  return (
    <div className="flex">
      <PassengerSidebar />

      <main className="ml-64 flex-1 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default PassengerLayout;