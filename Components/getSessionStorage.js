import React, { useState, useEffect } from "react";

function getSessionStorage(key){
    const [data, setData] = useState();

    useEffect(function(){
        const value = sessionStorage.getItem(key)
        setData(value)
    })
    return data
}

export default getSessionStorage