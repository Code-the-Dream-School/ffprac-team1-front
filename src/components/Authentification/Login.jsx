import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../util/fetchData";
import { useAuth } from '../../AuthContext';

const Login = () => {
  const { isLoggedIn, loginUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', form: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({
        ...errors,
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      });
      return;
    }

    try {
      const result = await login(formData);
      console.log(formData)
      if (result.status === 200) {
        const token = result.data.token;
        loginUser(token)
        navigate('/profile');
      }
    } catch (error) {
      setErrors({
        ...errors,
        form: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-area w-full"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-area w-full"
          />
          {errors.password && <div className="text-red-500">{errors.password}</div>}
        </div>
        <button type="submit" className="btn-primary">Sign In</button>
        {errors.form && <div className="text-red-500">{errors.form}</div>}
      </form>
    </div>
  );
};

export default Login;
