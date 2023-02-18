
import Head from "next/head"
import Link from 'next/link'
import Layout from '/Components/layout.js'
import React from "react"

function LogIn(){

    function handleLogIn(){
        const username = document.getElementById('name').value
        const password = document.getElementById('password').value
        const url = process.env.API_URL
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: username,
                password: password,
                source: 'login'
            })
        }
        fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data.result ==='found'){
                window.sessionStorage.setItem('name', username);
                window.location.href = '/Library'
            }
        });
    }

    return(
        <div>
            <Head>
                <title>Log In</title>
            </Head>
            <main>

            <div className="container">
            <div className="row">
                <div className="col-lg-4"/>
                <div className="col-lg-4">
                    <h1>Log In</h1>
                    <p>Username:</p>
                    <input placeholder="Username" id='name' type="text" autoComplete="off"></input>
                    <p>Password:</p>
                    <input placeholder="Password" id='password' type="password" autoComplete="off"></input>
                </div>
                <div className="col-lg-4"/>
                <div className="col-lg-4"/>
                <div className="col-lg-4">
                <button className="btn btn-primary" onClick={handleLogIn}>Log In</button>
                </div>
                <div className="col-lg-4"/>
                
            </div>
           </div>
            </main>
        </div>
        )
}

export default LogIn