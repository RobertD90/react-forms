import React, { useState } from "react";
// export default function Authenticate({ token }) {


const Authenticate = ({ token }) => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        try {
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/signup",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            setSuccessMessage(result.message);
            console.log(`Thank you for authenticating!`, result.username)
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
    );
}

export default Authenticate

