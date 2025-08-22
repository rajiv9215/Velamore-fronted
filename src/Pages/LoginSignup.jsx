import React, { useState } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔁 Unified login/signup handler
  const submitForm = async () => {
    setIsLoading(true);
    const url = `http://localhost:4000/${state === "Login" ? "login" : "signup"}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("❌ Network/server error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="w-full min-h-[90vh] bg-[#fce3fe] pt-[100px]">
      <div className="w-[90%] max-w-[550px] bg-white mx-auto px-5 py-8 sm:px-10 box-border">
        <h1 className="text-[28px] font-semibold mb-2 sm:mb-4">{state}</h1>

        <div className="flex flex-col gap-6 mt-4 sm:gap-4">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              className="h-[60px] w-full px-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg sm:h-[50px] sm:text-base sm:px-3"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="h-[60px] w-full px-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg sm:h-[50px] sm:text-base sm:px-3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="h-[60px] w-full px-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg sm:h-[50px] sm:text-base sm:px-3"
          />
        </div>

        <button
          onClick={submitForm}
          className="w-full h-[60px] bg-[#ff4141] text-white text-[22px] font-medium mt-8 sm:h-[50px] sm:text-[17px]"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Continue"}
        </button>

        <p className="mt-5 text-[#5c5c5c] text-[16px] font-medium">
          {state === "Login" ? (
            <>
              Create an account?{" "}
              <span
                className="text-[#ff4141] font-semibold cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-[#ff4141] font-semibold cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </>
          )}
        </p>

        <div className="flex items-center gap-2 mt-4 text-[#5c5c5c] text-[15px] font-medium">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
