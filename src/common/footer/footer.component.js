import React from "react";

import "./footer.styles.scss";

const footer = footer => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; CYAN TEAM {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default footer;
