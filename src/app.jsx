import React from 'react';
import './App.css';


export default function Header() {

  

    return (

       <div className="Head1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" /> 
        <link rel="stylesheet" href='App.css'></link>

        <nav>
            
            <h1 class = "logo-name"> Premier League Fantasy</h1>

            <div class = "menu" id ="nav-menu">

                <ul class="links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Conect</a></li>
                </ul>

                <div class = "logorsignin">

                <i class="fa-solid fa-circle-user"></i>
            
                <button role="button" id = "SignIn">Sign in</button>
                <button role="button" id = "login-button">Log in</button>
                <button role="button" id = "GoBack">Go Back</button>

                
                </div>

            </div>

        </nav>        
  
        </div> 



    );
  
  }


    