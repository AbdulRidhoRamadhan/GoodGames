import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const { data } = await api({
        method: "POST",
        url: "/users/add-user",
        data: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Success",
        text: "User successfully added",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);

      Swal.fire({
        title: "Error!",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  const inputClasses =
    "block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 text-sm placeholder:text-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div>
        <label htmlFor="username" className={labelClasses}>
          Username
        </label>
        <input
          id="username"
          type="text"
          className={inputClasses}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          className={inputClasses}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClasses}>
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            type={visible ? "text" : "password"}
            className={inputClasses}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {visible ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeSlashIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          className={inputClasses}
          placeholder="Enter your phone number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="address" className={labelClasses}>
          Address
        </label>
        <textarea
          id="address"
          className={`${inputClasses} resize-none`}
          rows="3"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium shadow-sm hover:shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
