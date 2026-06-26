import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

export default function RequestResetForm({
  email,
  setEmail,
  loading,
  error,
  message,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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
        Send Reset Code
      </Button>

    </form>
  );
}