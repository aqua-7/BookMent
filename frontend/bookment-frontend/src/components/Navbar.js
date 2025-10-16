import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar(){
  const { token, logout, userEmail } = useAuth();

  return (
    <div className="navbar">
      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        <Link to="/" style={{color:"white", textDecoration:"none"}}><strong>📚 BookMent</strong></Link>
        <span className="small">Manage books simply</span>

        <div style={{marginLeft:12}}>
          <Link to="/" style={{color:"white", textDecoration:"none", marginRight:8}}>Home</Link>
          {token && <Link to="/dashboard" style={{color:"white", textDecoration:"none"}}>Dashboard</Link>}
        </div>
      </div>

      <div>
        {token ? (
          <>
            <span className="small" style={{color:"#cbd5e1", marginRight:12}}>{userEmail}</span>
            <button className="btn btn-primary" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login"><button className="btn btn-primary">Login</button></Link>
        )}
      </div>
    </div>
  );
}
