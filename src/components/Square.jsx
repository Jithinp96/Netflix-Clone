import React, { useMemo } from "react";

function Square () {

    const value = 2

    const sq = useMemo (() => {
        return value*value
    })

    return(
        <p>{ sq }</p>
    ); 
}

export default Square