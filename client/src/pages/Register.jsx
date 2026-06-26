import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { API_BASE } from "../config/api";
// Auth Components
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import PasswordField from "../components/auth/PasswordField";
// UI Components
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isLengthMet = password.length >= 8;
  const isNumberMet = /[0-9]/.test(password);
  const isSpecialMet = /[^a-zA-Z0-9]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Client-side validation
    const userIdRegex = /^[a-zA-Z0-9_.]+$/;
    if (!userIdRegex.test(userId)) {
      setError("User ID can only contain letters, numbers, underscores, and periods");
      return;
    }

    if (userId.length < 3 || userId.length > 20) {
      setError("User ID must be between 3 and 20 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isLengthMet) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!isNumberMet || !isSpecialMet) {
      setError("Password must contain at least one number and one special character");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          userId,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        // Save email in localStorage for verification pre-fill fallback
        localStorage.setItem("verify_email", email);

        setTimeout(() => {
          navigate("/verify-email", { state: { email } });
        }, 1500);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Unable to connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
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
            subtitle="Create your account"
            highlight
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Full Name */}
         <Input
              placeholder="Full Name"
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              required
          />

          {/* User ID & Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[0.9fr_1.4fr]">
            <Input
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <PasswordField
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
          />

          {/* Password Strength Checklist */}
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  isLengthMet ? "bg-green-400" : "bg-zinc-600"
                }`}
              />
              <span>8+ Chars</span>
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  isNumberMet ? "bg-green-400" : "bg-zinc-600"
                }`}
              />
              <span>Number</span>
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  isSpecialMet ? "bg-green-400" : "bg-zinc-600"
                }`}
              />
              <span>Special</span>
            </div>
          </div>

          {/* Confirm Password */}
          <PasswordField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
          />

          {/* Error Message */}
          <Alert type="error">
              {error}
          </Alert>
          {/* Success Message */}
          <Alert type="success">
              {message}
          </Alert>

          {/* Submit Button */}
          <Button
              type="submit"
              loading={loading}
              fullWidth
          >
            Create Account
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:text-red-300">
            Login
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
