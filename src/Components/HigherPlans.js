import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./HigherPlans.module.scss";
const availablePlans = ["silver", "gold", "diamond", "platinum"];

const HigherPlans = ({ current }) => {
  const navigate = useNavigate();
  const currentIndex = availablePlans.findIndex((item) => item === current);

  const higherPlans = availablePlans.slice(currentIndex + 1);

  const planHandler = async (index) => {
    const upgradingPlanIndex = availablePlans.findIndex(
      (item) => item === index
    );

    if (!(upgradingPlanIndex === currentIndex + 1)) {
      alert("Please Upgrade to the previous plan first");
    } else {
      const updatingPlan = {
        plan: availablePlans[upgradingPlanIndex],
      };
      try {
        const response = await fetch(
          "http://localhost:3500/api/user/updateplan",
          {
            method: "POST",
            body: JSON.stringify(updatingPlan),
            headers: {
              authorization: `token ${window.sessionStorage.getItem(
                "accessToken"
              )}`,
              "content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          navigate(0);
          alert(
            `Plan Upgraded Successfully to ${availablePlans[upgradingPlanIndex]}`
          );
        }
      } catch (err) {
        alert("Upgrading Plan Failed");
      }
    }
  };

  return (
    <div className={classes.plans}>
      <h2>Available Higher Plans</h2>
      {current === "platinum" && (
        <p className={classes.message}>No higher Plans Available</p>
      )}
      <ul>
        {higherPlans.map((item) => (
          <li key={item} onClick={() => planHandler(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HigherPlans;
