import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { API_BASE } from "../config/api";

import AuthHeader from "../components/auth/AuthHeader";
import AuthCard from "../components/auth/AuthCard";
import RequestResetForm from "../components/auth/RequestResetForm";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "OTP sent.");
        // Transition to Step 2
        setTimeout(() => {
          setStep(2);
          setMessage("");
        }, 1000);
      } else {
        setError(data.message || "Email address not found.");
      }
    } catch (err) {
      setError("Unable to connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Reset failed. Check recovery code.");
      }
    } catch (err) {
      setError("Unable to connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setError("");
      setMessage("");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <AuthCard className="relative z-10">
        
        {/* Back Link */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm transition duration-200 cursor-pointer bg-transparent border-none"
        >
          <FaChevronLeft size={12} />
          {step === 2 ? "Back to Step 1" : "Back to Login"}
        </button>

        {/* Heading */}
           <AuthHeader
              title="Forgot Password"
              subtitle={
                step === 1
                  ? "Enter your email to receive a reset code."
                  : "Enter the reset code and your new password."
              }
            />

        {step === 1 ? (
        <RequestResetForm
          email={email}
          setEmail={setEmail}
          loading={loading}
          error={error}
          message={message}
          onSubmit={handleRequestCode}
        />
        ) : (
        <ResetPasswordForm
          email={email}

          otp={otp}
          setOtp={setOtp}

          newPassword={newPassword}
          setNewPassword={setNewPassword}

          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}

          showPassword={showPassword}
          setShowPassword={setShowPassword}

          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}

          loading={loading}

          error={error}
          message={message}

          onSubmit={handleResetPassword}
        />
      )}

    </AuthCard>
    </div>
  );
}
