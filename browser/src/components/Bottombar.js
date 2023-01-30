import React from "react";

function Bottombar({theme}) {

    return (
        // Bar at the bottom of the browser showing the license
        <div className={`bottombar ${theme}`}>
            <p>
                This work is licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">Creative Commons Attribution 4.0 International License.</a>
            </p>
        </div>
    )

}

export default Bottombar