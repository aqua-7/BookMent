import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(fullName, email, password);
        alert("Registered. Please login.");
        setIsRegister(false);
      } else {
        await login(email, password);
        nav("/");
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Error");
    }
  };

  return (
    <div style={{maxWidth:480, margin:"2rem auto"}} className="card">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={submit}>
        {isRegister && <>
          <label className="small">Full name</label>
          <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} required />
        </>}
        <label className="small">Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="small">Password</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
        <div style={{marginTop:12, display:"flex", gap:8}}>
          <button className="btn btn-primary" type="submit">{isRegister ? "Register" : "Login"}</button>
          <button type="button" className="btn" onClick={()=>setIsRegister(!isRegister)}>{isRegister ? "Switch to Login" : "Switch to Register"}</button>
        </div>
      </form>
    </div>
  );
}
