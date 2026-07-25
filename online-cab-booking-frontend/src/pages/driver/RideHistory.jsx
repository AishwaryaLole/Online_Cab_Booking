export default function DriverRideHistory() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="text-2xl font-bold">Ride history</h1>
      <p className="mt-3 text-muted-foreground">
        No driver-scoped ride history endpoint exists. Expose
        <code className="mx-1 rounded bg-muted px-1">GET /api/rides/driver/{"{driverId}"}</code>
        and this page will populate.
      </p>
    </div>
  );
}
