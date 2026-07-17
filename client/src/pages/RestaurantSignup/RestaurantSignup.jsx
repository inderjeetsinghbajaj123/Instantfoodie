import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";



const RestaurantSignup = () => {

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { register, authLoading } = useAuth();



  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");



    const result = await register({

      fullName,

      email,

      password,

      role: "restaurant", 

    });



    if (result.success) {

      navigate("/restaurant");

    } else {

      setError(result.error);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">

      <form

        onSubmit={handleSubmit}

        className="w-full max-w-md bg-zinc-900/75 backdrop-blur-xl border border-amber-500/10 rounded-3xl p-8 shadow-2xl"

      >

        <h2 className="text-2xl font-extrabold text-white mb-2 text-center">

          🍴 Partner with InstantFoodie

        </h2>

        <p className="text-neutral-400 mb-6 text-center text-sm">

          Register your restaurant to start receiving orders.

        </p>



        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}



        <input

          type="text"

          required

          value={fullName}

          onChange={(e) => setFullName(e.target.value)}

          placeholder="Owner Full Name"

          className="w-full bg-neutral-950/40 rounded-xl px-4 py-3 mb-4 text-white placeholder:text-neutral-600 outline-none border border-neutral-800 focus:border-amber-500"

        />



        <input

          type="email"

          required

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          placeholder="Business Email"

          className="w-full bg-neutral-950/40 rounded-xl px-4 py-3 mb-4 text-white placeholder:text-neutral-600 outline-none border border-neutral-800 focus:border-amber-500"

        />



        <input

          type="password"

          required

          value={password}

          onChange={(e) => setPassword(e.target.value)}

          placeholder="Password"

          className="w-full bg-neutral-950/40 rounded-xl px-4 py-3 mb-6 text-white placeholder:text-neutral-600 outline-none border border-neutral-800 focus:border-amber-500"

        />



        <button

          type="submit"

          disabled={authLoading}

          className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 rounded-xl disabled:opacity-50"

        >

          {authLoading ? "Registering..." : "Register Restaurant"}

        </button>



        <p className="text-center text-neutral-400 text-xs sm:text-sm mt-6">

          Are you a customer?{" "}

          <Link to="/signup" className="text-amber-500 font-bold hover:underline ml-1">

            Sign up here

          </Link>

        </p>

        <p className="text-center text-neutral-400 text-xs sm:text-sm mt-6">

          Already a partner?{" "}

          <Link to="/login" className="text-amber-500 font-bold hover:underline ml-1">

            Log in

          </Link>

        </p>

      </form>

    </div>

  );

};



export default RestaurantSignup;
