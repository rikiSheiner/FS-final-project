import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className={styles.container}>
      <h1>Welcome to our website</h1>
      <h3>Here you can find your albums, posts etc...</h3>
      <h3>Enjoy!!</h3>
      <div className={styles.links}>
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
        <Link to="/register" className={styles.link}>
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
