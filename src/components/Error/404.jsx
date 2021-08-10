import React from "react";
import { Link } from "react-router-dom";

export const Error = () => (
    <div>
        <legend>Page Not Found</legend>
        <p>The page you are looking for do not exist, maybe you went wrong way man.</p>
        <h4>I Apopogise...</h4>

        <img src="/404.jpg" />
        <p>
            <Link to="/" className="btn btn-primary">Return to Dashboard</Link>
        </p>
    </div>
);
