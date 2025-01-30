// import React, { useState } from "react";
// import upload from "../../utils/upload";
// import "./Register.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";
// // import path from path
// import * as path from 'node:path';

import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    resume: null,
    country: "",
    isSeller: false,
    desc: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = "";
      let resumeUrl = "";

      if (file) {
        imgUrl = await upload(file);
      }

      if (user.isSeller && user.resume) {
        resumeUrl = await upload(user.resume);
      }

      await newRequest.post("/auth/register", {
        ...user,
        img: imgUrl,
        resume: resumeUrl,
      });

      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label>Username</label>
          <input name="username" type="text" placeholder="johndoe" onChange={handleChange} />

          <label>Email</label>
          <input name="email" type="email" placeholder="email" onChange={handleChange} />

          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} />

          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label>Country</label>
          <input name="country" type="text" placeholder="India" onChange={handleChange} />

          <button type="submit">Register</button>
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label>Phone Number</label>
          <input name="phone" type="text" placeholder="+1 234 567 890" onChange={handleChange} />

          {user.isSeller && (
            <>
              <label>Freelancer Resume</label>
              <input name="resume" type="file" onChange={(e) => setUser(prev => ({ ...prev, resume: e.target.files[0] }))} />
            </>
          )}

          <label>Description</label>
          <textarea name="desc" placeholder="A short description of yourself" cols="30" rows="10" onChange={handleChange}></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;