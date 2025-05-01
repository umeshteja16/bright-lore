import { useEffect, useState } from "react";
import { auth } from "../auth/Firebase/Firebase";
import { useNavigate } from "react-router-dom";

type FirebaseUser = {
  displayName: string | null;
  email: string | null;
};

const MAX_USER_CHATS = 100;

const LoggedIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<FirebaseUser | null>(null);
  const [remainingChats, setRemainingChats] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData: FirebaseUser = {
          displayName: user.displayName,
          email: user.email,
        };
        setUserDetails(userData);

        // Remove guest chat count on login
        localStorage.removeItem("guestChatCount");

        // Fetch chat count for logged-in user
        const chatKey = `chatCount_${user.email}`;
        const used = parseInt(localStorage.getItem(chatKey) || "0", 10);
        setRemainingChats(MAX_USER_CHATS - used);
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
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
          <h1>Welcome {userDetails.displayName || "User"}</h1>
          <p>Email: {userDetails.email}</p>
          {remainingChats !== null && (
            <p>You have {remainingChats} chats remaining today.</p>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LoggedIn;
