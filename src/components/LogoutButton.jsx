import { useState } from "react";
import { useContext } from "react";
import { Context } from "../Context";

export default function LogoutButton() {

    const {logOut} = useContext(Context);

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                onClick={logOut}
            >
                Log out
            </button>
            
        </>
    );
}
