import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { API_BASE } from "../config/api";
// Auth Components
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
// UI Components
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Retrieve email if passed from Registration page state redirect
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      const savedEmail = localStorage.getItem("verify_email");
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Email verified successfully!");
        localStorage.removeItem("verify_email");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Verification failed. Check your OTP.");
      }
    } catch (err) {
      setError("Unable to connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setError("");
    setResendMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setResendMessage("Verification code resent!");
      } else {
        setError(data.message || "Failed to resend code");
      }
    } catch (err) {
      setError("Unable to connect to server");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <AuthCard className="relative z-10">
        
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm transition duration-200"
        >
          <FaChevronLeft size={12} /> Back to Login
        </Link>

        {/* Heading */}
        <AuthHeader
            title="Verify Email"
            subtitle="Please enter the 6-digit OTP sent to your email."
        />

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          
          {/* Email input */}
          <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
          />

          {/* OTP Input */}
          <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              maxLength={6}
              required
              className="text-center font-mono tracking-[0.35em]"
          />

          {/* Alert Messages */}
          {error && (
              <Alert type="error">
                  {error}
              </Alert>
          )}
          {message && (
              <Alert type="success">
                  {message}
              </Alert>
          )}
          <Alert type="info">
              {resendMessage}
          </Alert>

          {/* Submit CTA */}
          <Button
              type="submit"
              loading={loading}
              fullWidth
          >
              Verify Email
          </Button>

        </form>

        {/* Resend actions triggers */}
        <div className="mt-6 text-center text-sm text-zinc-400">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-red-400 hover:text-red-300 font-bold transition bg-transparent border-none cursor-pointer"
          >
            Resend Code
          </button>
        </div>

      </AuthCard>
    </div>
  );
}
