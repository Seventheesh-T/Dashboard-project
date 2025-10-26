// src/Pages/NotFound.jsx
import React from "react";
import FuzzyText from "./components/FuzzyText"; // adjust if needed

function Error() {
  const hoverIntensity = 0.5;
  const enableHover = true;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white text-white flex-column">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        fontSize="clamp(3rem, 10vw, 10rem)"
        color="#05dd50cc"
      >
        404
      </FuzzyText>
      <p className="mt-4 fs-5 text-black-50">Sorry, page not found</p>
    </div>
  );
}

export default Error;
