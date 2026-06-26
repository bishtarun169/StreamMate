import Input from "../ui/Input";
import PasswordField from "./PasswordField";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

export default function ResetPasswordForm({
  email,

  otp,
  setOtp,

  newPassword,
  setNewPassword,

  confirmPassword,
  setConfirmPassword,

  showPassword,
  setShowPassword,

  showConfirmPassword,
  setShowConfirmPassword,

  loading,

  error,
  message,

  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">

      <Input
        type="email"
        value={email}
        disabled
      />

      <Input
        placeholder="6-digit Reset Code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        required
        className="text-center tracking-[0.35em] font-mono"
      />

      <PasswordField
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PasswordField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />

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

      <Button
        type="submit"
        loading={loading}
        fullWidth
      >
        Reset Password
      </Button>

    </form>
  );
}