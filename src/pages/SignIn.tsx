import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import api from "../lib/api";
import GoogleButton from "../components/GoogleButton";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle redirect from Google OAuth with token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Signed in with Google!");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGetOtp = async () => {
    if (!email) return toast.info("Enter email");
    try {
      setLoading(true);
      await api.post("/auth/request-otp", { email, purpose: "login" });
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
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
        purpose: "login",
      });

      localStorage.setItem("token", res.data.token);
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      }
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
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!otpSent ? (
          <Button onClick={handleGetOtp} loading={loading}>
            Get OTP
          </Button>
        ) : (
          <>
            <TextInput
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Keep me logged in
            </label>
            <Button onClick={handleSignIn} loading={loading}>
              Sign in
            </Button>
          </>
        )}

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* ✅ Google Sign-In */}
        <GoogleButton />

        <p className="text-center text-sm">
          Need an account?{" "}
          <Link to="/signup" className="text-brand-600">
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
