import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handle = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await resp.json();
      setMessage(data.message);
      console.log("Login Response:", data);

      if (resp.ok && data.token && data.user?._id) {
        // ✅ Save the token and actual ObjectId from MongoDB
          localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);// ✅ CORRECT: Store only the _id
        console.log("Saved userId:", data.user._id);
      } else {
        console.warn("Login failed:", data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <form className="space-y-4" onSubmit={handle}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
