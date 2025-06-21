import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registered successfully!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="FullName"
            placeholder="Full Name"
            value={formData.FullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
