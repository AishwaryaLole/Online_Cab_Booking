export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 py-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} CabGo. Powered by OpenStreetMap contributors.
    </footer>
  );
}