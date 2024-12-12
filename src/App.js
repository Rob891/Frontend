
// import { render } from 'ejs';

import React, { useState } from 'react';
import Header from './app.jsx';


function App() {

  // keeps track wether user clicks sign or log in
  const [mode, setMode] = useState("normal");

  

  return ( 
    <div className="App">

      <Header/> 
      
      { /*{ mode === "normal" && (

        <div class="default">

          <button type="button" id = "SignIn"onClick={ () => setMode("signingIn") }>Sign in</button>

          <button type="button" id = "LogIn" onClick={ () => setMode("loggingIn") }>Log in</button>

          <button type="button" id = "GoBack" onClick={ () => setMode("goBack") }>Go Back</button>

        </div>

      )}


      { mode === "signingIn" && (
        <div className="signIn">
          
          <h2>Sign In</h2>

          <label htmlFor="newUsername"><b>New Username</b></label>
          <input type="text" placeholder="Enter New Username" name="newUsername" required />
          <br />

          <label htmlFor="newPassword"><b>New Password</b></label>
          <input type="password" placeholder="Enter New Password" name="newPassword" required />
          <br />

          <button type="submit">Sign Up</button>

          <button type="button" onClick={ () => setMode("goBack") }>Go Back</button>
        
        </div>

      )}

      { mode === "loggingIn" && (

        <div className="logIn">

          <h2>Log In</h2>

          <label htmlFor="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" required />
          <br />

          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required />
          <br />

          <button type="submit">Log In</button>
          <label>
            <input type="checkbox" defaultChecked name="remember" /> Remember me
          </label>

          <button type="button" onClick={ () => setMode("goBack") }>Go Back</button>

        </div>

      )}

      { mode === "goBack" && (

        <div class = "goBack">

          <button type="button" onClick={ () => setMode("signingIn") }>Sign in</button>
          <button type="button" onClick={ () => setMode("loggingIn") }>Log in</button>
          <button type="button" onClick={ () => setMode("goBack") }>Go Back</button>

        </div>

      )}  */}

    </div>
  );
}

export default App;
