import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handle = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();
      setMessage(data.message);

      if (resp.ok && data.token && data.user?._id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
      } else {
        console.warn("Login failed:", data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign In</h2>

        <form className="space-y-5" onSubmit={handle}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>
          {message && (
            <p className="text-center text-red-500 text-sm">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
