import React from "react";
import "./footer.css";

function footer() {
  return (
    <>
      <footer className="fadeInUp col-md-12"></footer>
      <h5 className="text-center copyright">
        {" "}
        Made with{" "}
        <span role="img" aria-label="Heart">
          ❤️
        </span>{" "}
        by Oleg Khrapavitsky
      </h5>
    </>
  );
}
export default footer;
