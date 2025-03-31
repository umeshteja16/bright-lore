import React, { useEffect, useState } from "react";
import { auth } from "../../components/Firebase";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUsetDetails] = useState(null);
  const fetchUserdata = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      setUsetDetails(user);
    });
  };
  useEffect(() => {
    fetchUserdata();
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error: any) {
      console.log("Error Logging Out", error.message);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <h1>Welcome {userDetails.displayName}</h1>
          <p>Email: {userDetails.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default LoggedIn;
