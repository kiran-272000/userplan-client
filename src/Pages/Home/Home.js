import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../Components/UI/Card";
import HigherPlans from "../../Components/HigherPlans";
import classes from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    currentPlan: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3500/api/user/getuser", {
          headers: {
            authorization: `token ${window.sessionStorage.getItem(
              "accessToken"
            )}`,
            "content-type": "application/json",
          },
        });
        if (!response.ok) {
          alert("Error fetching user data");
        }

        const data = await response.json();
        setUser({
          name: data.user.name,
          currentPlan: data.user.currentPlan,
        });
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const logoutHandler = () => {
    navigate("/");
    window.sessionStorage.clear();
  };

  const content = (
    <div className={classes.content}>
      <div className={classes.welcome}>
        Welcome <hig>{`${user.name}`}</hig>
      </div>
      <div className={classes.currentPlan}>
        Your current Plan is <hig>{`${user.currentPlan}`}</hig>
      </div>
      <div className={classes.higherPlans}>
        <HigherPlans current={user.currentPlan} />
      </div>
      <div className={classes.action}>
        <button onClick={logoutHandler}>LogOut</button>
      </div>
    </div>
  );
  return (
    <Card>
      {!isLoading && !error && content}
      {!isLoading && error && (
        <h3 className={classes.message}>Data loading Failed</h3>
      )}
      {isLoading && <h3 className={classes.message}>Loading...</h3>}
    </Card>
  );
};

export default Home;
