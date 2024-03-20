import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../util/fetchData';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await register(formData);
      if (result.status === 200) {
        setSuccessMessage("Registration successful!");
        sessionStorage.setItem("jwtToken", result.data.token);
        setTimeout(() => navigate("/profile"), 1000);
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setErrors({ form: errorMessage });
    }
  };

  return (
    <div className="p-1 max-w-md mx-auto bg-black text-white rounded-lg shadow">
      <form onSubmit={handleRegister} className="space-y-3">
        <div className="flex justify-between space-x-6">
          <div className="flex-1">
            <label className="block">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-area w-full"
            />
            {errors.firstName && <div className="text-red-500">{errors.firstName}</div>}
          </div>

          <div className="flex-1">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-area w-full"
            />
            {errors.lastName && <div className="text-red-500">{errors.lastName}</div>}
          </div>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-area w-full"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-area w-full"
          />
          <button type="button" onClick={handleShowPassword} className="text-xs">
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <div className="text-red-500">{errors.password}</div>}
        </div>
        {errors.form && <div className="text-red-500">{errors.form}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;