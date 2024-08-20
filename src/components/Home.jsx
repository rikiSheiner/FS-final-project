import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return <div>
    <h1>עמוד הבית</h1>
    <Link to="/home/pharmacy">Pharm</Link>

    </div>
}

export default Home;