import React, { useEffect } from "react";
import { useUserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { handleError } from "../helpers/util";

const ProtectedRouter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("USERDFD", user);
    if (!user) {
      handleError("Please login first");
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (!user) return null;
  return children;
};

export default ProtectedRouter;
