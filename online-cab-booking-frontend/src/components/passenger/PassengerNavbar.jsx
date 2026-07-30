import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function PassengerNavbar() {
  return (
    <header className="passenger-navbar">

      <div>
        <h2>Passenger Dashboard</h2>
        <p>Book your ride quickly and safely.</p>
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="profile-box">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>Passenger</h4>
            <span>Welcome Back</span>
          </div>
        </div>

      </div>

    </header>
  );
}

export default PassengerNavbar;