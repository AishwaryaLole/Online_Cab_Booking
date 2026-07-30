import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import PassengerNavbar from "../components/passenger/PassengerNavbar";
import "../styles/passengerLayout.css";

function PassengerLayout() {
  return (
    <div className="passenger-layout">

      <Sidebar role="PASSENGER" />

      <div className="passenger-content">

        <PassengerNavbar />

        <div className="page-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default PassengerLayout;