import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import api from "../lib/api";
import.meta.env.VITE_API_BASE_URL;

export default function SignUp() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleGetOtp = async () => {
    if (!name || !email || !dob) return toast.info("Fill name, DOB and email");
    try {
      setLoading(true);
      await api.post("/auth/register", { name, dob, email });
      toast.success("OTP sent to email");
      setOtpSent(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP + Register
  const handleSignUp = async () => {
    if (!otp) return toast.info("Enter OTP");
    try {
      setLoading(true);
      const res = await api.post("/auth/verify", { email, otp });
      localStorage.setItem("token", res.data.token);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign up">
      <div className="space-y-3">
        <TextInput label="Your Name" value={name} onChange={e=>setName(e.target.value)} />
        <TextInput label="Date of Birth" type="date" value={dob} onChange={e=>setDob(e.target.value)} />
        <TextInput label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        {!otpSent ? (
          <Button onClick={handleGetOtp} loading={loading}>Get OTP</Button>
        ) : (
          <>
            <TextInput label="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
            <Button onClick={handleSignUp} loading={loading}>Sign up</Button>
          </>
        )}
        <p className="text-center text-sm">
          Already have an account? <Link to="/signin" className="text-brand-600">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
