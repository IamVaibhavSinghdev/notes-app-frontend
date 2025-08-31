import React from "react";

const GoogleButton: React.FC = () => {
  const handleLogin = () => {
    // Redirect user to backend Google OAuth route
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
