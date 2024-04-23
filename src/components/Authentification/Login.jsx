import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../util/fetchData";
import { useAuth } from '../../AuthContext';
import RegistrationModal from "../Modal_Components/RegistrationModal";

const Login = () => {
  const { isLoggedIn, loginUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
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
      if (result.status === 200) {
        loginUser(true)
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

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto min-h-[83vh]">
      <div className="text-2xl text-center text-green/80 pb-10 pt-[30%] xl:pt-[50%]">Sign In</div>
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
        <h6 className="text-center">
          Don't have an account? 
          <span className="font-bold text-blue underline hover:cursor-pointer pl-2" onClick={openRegistrationModal}>
            Sign Up
          </span>
        </h6>
      </form>
      {isRegistrationModalOpen && <RegistrationModal onClose={closeRegistrationModal} />}
    </div>
  );
};

export default Login;
