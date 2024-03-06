import React from "react";
import MessageForm from "../components/MessageForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const Room = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  useEffect(() => {
    if (state === null || "" || undefined) {
      navigate("/");
    }
  }, []);
  if (state === null || "" || undefined) {
    return <h1>Unauthorized</h1>;
  } else {
    return (
      <div>
        <MessageForm room={state.room} />
      </div>
    );
  }
};

export default Room;
