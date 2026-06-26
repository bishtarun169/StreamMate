import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { API_BASE } from "../config/api";
// Auth Components
import AuthCard from "../components/auth/AuthCard";
import PasswordField from "../components/auth/PasswordField";
import AuthHeader from "../components/auth/AuthHeader";

// UI Components
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Login successful!");

        // Store JWT token sended by backend
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redirect to /home after 1 second
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        if (data.message && data.message.toLowerCase().includes("verify")) {
          if (data.email) {
            localStorage.setItem("verify_email", data.email);
          } else if (identifier.includes("@")) {
            localStorage.setItem("verify_email", identifier);
          }
        }
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Unable to connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <AuthCard className="relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm transition duration-200"
        >
        <FaChevronLeft size={12} />
          Back to Home
        </Link>

        {/* Heading */}
        <AuthHeader
            title="StreamMate"
            subtitle="Welcome back"
            highlight
          />

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email or User ID */}
          <Input
            placeholder="Email or User ID"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          {/* Password */}
          <PasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
          />

          {/* Forgot Password Link */}
          <div className="text-right text-semibold">
            <Link
              to="/forgot-password"
              className="text-xs text-red-400 hover:text-red-300 transition hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <Alert type="error">
              {error}
              {error.toLowerCase().includes("verify") && (
                <Link
                  to="/verify-email"
                  className="mt-2 block font-bold text-red-300 underline hover:text-red-200"
                >
                  Verify your email here
                </Link>
              )}
            </Alert>
          )}

          {/* Success Message */}
          {message && (
            <Alert type="success">
              {message}
            </Alert>
          )}
          {/* Login Button */}
          <Button
              type="submit"
              loading={loading}
              fullWidth
          >
              Login
          </Button>
        </form>

        <p className="text-center text-zinc-400 mt-6">
          No account?{" "}
          <Link to="/register" className="text-red-400 hover:text-red-500">
            Create an Account
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
