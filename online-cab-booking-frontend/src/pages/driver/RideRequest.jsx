export default function RideRequests() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="text-2xl font-bold">Ride requests</h1>
      <p className="mt-3 text-muted-foreground">
        No backend endpoint currently returns pending ride requests for a driver.
        Expose one like <code>GET /api/rides/requests?driverId={"{id}"}</code> and this page will populate automatically.
      </p>
    </div>
  );
}
