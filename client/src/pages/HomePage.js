import React from "react";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <div className="vectorContainer">
        <div className="headings">
          <h2 className="wellcometext">Welcome to</h2>

          <h1>LISTFLIX</h1>
        </div>
        <div className="vector">
          <img src={require("../images/popcorn.png")} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
