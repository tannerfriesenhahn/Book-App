
import React, { useState, useEffect } from "react";

    function getBooks(name){
        const [theInfo, setTheInfo] = useState([])
        const url = 'http://localhost:3000/api/users'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source: 'bookshelf',
                name: name
            })
        }

        fetch(url, options)
        .then((response)=>{return response.json()})
        .then((data)=>{
            useEffect(function(){
                setTheInfo([...data.data])
            })
        })
        return theInfo
    }

    export default getBooks