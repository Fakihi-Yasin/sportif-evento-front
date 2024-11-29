import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false); 

    // Email validation function
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
      return emailRegex.test(email);
    };

  const Registeration = async (e) =>{
    e.preventDefault();

    console.log('working')
    if(!name || !lastname || !email || !password || !isEmailValid){
      toast.info("Please enter your info");        
      return;
    }

    try{
      const responce = await axios.post("http://localhost:3000/auth/register",{
        name,
        lastname,
        email,
        password,
      });

      if(responce.status === 201){
        toast.success("Registration successful! Virify You Email");        
        setTimeout(() => {
          navigate("/login-form");
        }, 2000); 
      }else{
        toast.error( "Registration failed.");
      }
    }catch(error){
      toast.error("Error connecting to the server");        
      console.error("Registration error:", error);    }

  }

  return (
    <div className="font-[sans-serif] relative">
      <div className="h-[240px] font-[sans-serif]">
        <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" className="w-full h-full object-cover" />
      </div>

      <div className="relative -mt-40 m-4">
        <form className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 rounded-2xl" onSubmit={Registeration}>
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-bold text-center">Register</h3>
          </div>

          <div>
            <label className="text-gray-800 text-xs block mb-2">Name</label>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="text-gray-800 text-xs block mb-2">Last Name</label>
            <input
              name="lastname"
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="text-gray-800 text-xs block mb-2">Email</label>
            <input
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(validateEmail(e.target.value)); // Validate email
              }}
              className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-gray-800 text-xs block mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter password"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"
            >
              Register
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

