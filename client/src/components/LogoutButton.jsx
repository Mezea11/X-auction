import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext.jsx";

export default function LogOutButton() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext);

  async function logOut() {
    try {
      await fetch("/api/login", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      //reset user to null
      setUser(null);

      //navigate('/'); // if we keep this navigate as a comment, we stay on the same page unless we are on protected mypage
      console.log("Logout successful!");
    } catch (error) {
      "Error logging out!" + error;
    }
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={logOut}>
        Log out
      </button>
    </>
  );
}
