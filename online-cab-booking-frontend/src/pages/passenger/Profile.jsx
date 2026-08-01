import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getUserById, updateUser } from "../../services/userService";
import { forgotPassword, resetPassword } from "../../services/authService";

export default function Profile() {
  const { userId } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  // Change password (OTP based, since backend has no "current password" flow)
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (!userId) return;
    getUserById(userId)
      .then((data) => {
        setProfile(data);
        setForm({ name: data.name || "", phone: data.phone || "", email: data.email || "" });
      })
      .catch(() => toast.error("Failed to load profile."))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateUser(userId, form);
      setProfile(updated);
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleSendOtp = async () => {
    setSendingOtp(true);
    const res = await forgotPassword(form.email);
    setSendingOtp(false);
    if (res.success) {
      toast.success("OTP sent to your email.");
      setOtpSent(true);
    } else {
      toast.error(res.message || "Could not send OTP.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Enter the OTP and a new password.");
      return;
    }
    setResetting(true);
    const res = await resetPassword({ email: form.email, otp, newPassword });
    setResetting(false);
    if (res.success) {
      toast.success("Password updated successfully.");
      setOtpSent(false);
      setOtp("");
      setNewPassword("");
    } else {
      toast.error(res.message || "Could not reset password.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 gap-2">
        <Loader2 className="animate-spin" size={20} /> Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">View and update your details.</p>
      </div>

      {/* Profile summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {profile?.name?.[0]?.toUpperCase() || "P"}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{profile?.name}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail size={13} /> {profile?.email}
          </p>
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-violet-700 bg-violet-100 px-2.5 py-0.5 rounded-full">
            <ShieldCheck size={12} /> {profile?.role || "PASSENGER"}
          </span>
        </div>
      </div>

      {/* Edit profile */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        <h3 className="font-bold text-gray-900">Edit profile</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Full name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>

      {/* Change password */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-bold text-gray-900">Change password</h3>
        <p className="text-xs text-gray-500">
          For security, we'll email a one-time code to {form.email || "your email"} before you can set a new password.
        </p>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={sendingOtp}
            className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {sendingOtp ? "Sending OTP..." : "Send OTP to email"}
          </button>
        ) : (
          <form onSubmit={handleResetPassword} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">OTP</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={resetting}
              className="sm:col-span-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors w-fit"
            >
              {resetting ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
