import { useEffect, useMemo, useState } from "react";
import { adminService } from "../../services/adminService";
import Loader from "../../components/common/Loader";
import { toast } from "react-toastify";

export default function UsersTable({ role, title }) {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminService.listUsers().then((all) => setUsers(role ? all.filter((u) => u.role === role) : all))
      .finally(() => setLoading(false));
  };
  useEffect(load, [role]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return users.filter((u) => !s || u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s));
  }, [users, q]);

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    try { await adminService.deleteUser(id); toast.success("Deleted"); load(); }
    catch (e) { toast.error(e?.friendlyMessage || "Failed"); }
  };

  if (loading) return <Loader />;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…"
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr>
            <th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Email</th>
            <th className="p-3">Phone</th><th className="p-3">Role</th><th className="p-3">Verified</th><th className="p-3"></th>
          </tr></thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-3">#{u.id}</td><td className="p-3">{u.name}</td><td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone}</td><td className="p-3">{u.role}</td>
                <td className="p-3">{u.isVerified ? "Yes" : "No"}</td>
                <td className="p-3 text-right">
                  <button onClick={() => remove(u.id)} className="rounded-md bg-destructive px-3 py-1 text-xs text-destructive-foreground">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No users found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
