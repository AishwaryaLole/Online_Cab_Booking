import "../../styles/DashboardHeader.css";

function DashboardHeader() {
  const userName = localStorage.getItem("userName") || "Passenger";

  const currentHour = new Date().getHours();

  let greeting = "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="dashboard-header">

      <div>
        <h1>
          {greeting}, {userName} 👋
        </h1>

        <p>
          Welcome back! Ready to book your next ride?
        </p>
      </div>

      <div className="dashboard-date">
        <span>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

    </div>
  );
}

export default DashboardHeader;