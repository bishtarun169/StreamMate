import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { API_BASE } from "../config/api";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import RequestResetForm from "../components/auth/RequestResetForm";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "", confirmPassword: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  const setF = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const setS = (k, v) => setStatus((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    const endpoint = step === 1 ? "/api/auth/forgot-password" : "/api/auth/reset-password";
    if (step === 2 && form.newPassword !== form.confirmPassword) {
      return setStatus({ loading: false, error: "Passwords do not match", message: "" });
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setStatus({ loading: false, error: "", message: data.message || (step === 1 ? "Code sent to your email!" : "Password reset! Redirecting...") });
      setTimeout(() => { if (step === 1) { setStep(2); setStatus({ loading: false, error: "", message: "" }); } else navigate("/login"); }, 1200);
    } catch (err) {
      setStatus({ loading: false, error: err.message, message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <AuthCard className="relative z-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm transition">
          <FaChevronLeft size={12} /> Back to Login
        </Link>
        <AuthHeader title="StreamMate" subtitle={step === 1 ? "Account Recovery" : "Create New Password"} highlight />
        {step === 1 ? (
          <RequestResetForm email={form.email} setEmail={(v) => setF("email", v)} loading={status.loading} error={status.error} message={status.message} onSubmit={handleSubmit} />
        ) : (
          <ResetPasswordForm email={form.email} otp={form.otp} setOtp={(v) => setF("otp", v)} newPassword={form.newPassword} setNewPassword={(v) => setF("newPassword", v)} confirmPassword={form.confirmPassword} setConfirmPassword={(v) => setF("confirmPassword", v)} showPassword={showPwd} setShowPassword={setShowPwd} showConfirmPassword={showConfirmPwd} setShowConfirmPassword={setShowConfirmPwd} loading={status.loading} error={status.error} message={status.message} onSubmit={handleSubmit} />
        )}
      </AuthCard>
    </div>
  );
}
