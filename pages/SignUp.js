import Head from "next/head"
import Link from 'next/link'

import Layout from '/Components/layout.js'

function SignUp(){

    async function handleSignUp(){
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const url = 'http://localhost:3000/api/users'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password,
                source: 'signup'
            })
        }
        fetch(url, options)
        .then((response) => response.json())
        .then((data) => {console.log(data)
            if (data.success === true){
                window.sessionStorage.setItem('name', username);
                window.location.href = '/Library'
            }
        });
    }

    return(
    <div>
        <Head>
            <title>Sign Up</title>
        </Head>
        <main>
           <div className="container">
            <div className="row">
                <div className="col-lg-4"/>
                <div className="col-lg-4">
                    <h1 className="sign-up">Sign Up</h1>
                    <p>Username:</p>
                    <input placeholder="Username" id='username' type="text" autoComplete="off"></input>
                    <p>Password:</p>
                    <input placeholder="Password" id='password' type="password" autoComplete="off"></input>
                </div>
                <div className="col-lg-4"/>
                <div className="col-lg-4"/>
                <div className="col-lg-4">
                    <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
                </div>
                <div className="col-lg-4"/>
                
            </div>
           </div> 
        </main>
    </div>
    )
}

export default SignUp