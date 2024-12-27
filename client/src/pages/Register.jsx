import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
              <p className="mt-2 text-sm text-gray-600">
                Please fill in the details below to create a new user account
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <RegisterForm />
              <div className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
