import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import api from "../lib/api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetOtp = async () => {
    if (!email) return toast.info("Enter email");
    try {
      setLoading(true);
      await api.post("/auth/login", { email });
      toast.success("OTP sent");
      setOtpSent(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!otp) return toast.info("Enter OTP");
    try {
      setLoading(true);
      const res = await api.post("/auth/login/verify", { email, otp });
      localStorage.setItem("token", res.data.token);
      remember && localStorage.setItem("rememberEmail", email);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in">
      <div className="space-y-3">
        <TextInput label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        {!otpSent ? (
          <Button onClick={handleGetOtp} loading={loading}>Get OTP</Button>
        ) : (
          <>
            <TextInput label="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
              Keep me logged in
            </label>
            <Button onClick={handleSignIn} loading={loading}>Sign in</Button>
          </>
        )}
        <p className="text-center text-sm">
          Need an account? <Link to="/signup" className="text-brand-600">Create one</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
