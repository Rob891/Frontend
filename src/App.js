
// import { render } from 'ejs';

import React, { useState } from 'react';
import Header from './app.jsx';


// function App() {
//   // Keeps track of whether the user clicks sign in or log in
//   const [mode, setMode] = useState("normal");
//   <link ref="stylesheet" href="App.css"></link>

//   return (
//     <div className="App">
//       {/* Pass mode and setMode to Header */}
//       <Header mode={mode} setMode={setMode} />

//       {/* Render content based on the mode */}
//       <div className="content">
//         {mode === "normal" && <h2>Welcome to Premier League Fantasy!</h2>}

//         {mode === "signingIn" && (
//           <div className="signIn">
//             <h2>Sign In</h2>
//             <label htmlFor="newUsername"><b>New Username</b></label>
//             <input
//               type="text"
//               placeholder="Enter New Username"
//               name="newUsername"
//               required
//             />
//             <br />
//             <label htmlFor="newPassword"><b>New Password</b></label>
//             <input
//               type="password"
//               placeholder="Enter New Password"
//               name="newPassword"
//               required
//             />
//             <br />
//             <button type="submit">Sign Up</button>
//             <button type="button" onClick={() => setMode("normal")}>Go Back</button>
//           </div>
//         )}

//         {mode === "loggingIn" && (
//           <div className="fullscreen-container">
//             <h1 class="login-title">Welcome</h1>
//             <form class = "form">

//               <div class = "input-group"> 
//               <label htmlFor="email"><b>Username</b></label>
//               <input type="email" placeholder="Enter Email" id="email" required/>
//               <span class="msg">Valid Email</span>
//               </div>

//               <div class = "input-group"> 
//               <label htmlFor="password"><b>Username</b></label>
//               <input type="password" placeholder="Enter Password" id="password" required/>
//               <span class="msg">Incorrect Password</span>

//               </div>

//               <button type = "submit" class = "login-button">Login</button>

//             </form>
//             <br />

//             <label htmlFor="password"><b>Password</b></label>
//             <input type="password" placeholder="Enter Password" id="password" required/>
//             <br />

//             <button type="submit">Log In</button>
//             <label>
//               <input type="checkbox" defaultChecked id="remember" /> Remember me
//             </label>
//             <button type="button" onClick={() => setMode("normal")}>Go Back</button>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

function App() {
  // Keeps track of whether the user clicks sign in or log in
  const [mode, setMode] = useState("normal");

  return (
    <div className="App">
      {/* Pass mode and setMode to Header */}
      <Header mode={mode} setMode={setMode} />

      {/* Render content based on the mode */}
      <div className="content">
        {mode === "normal" && <h2>Welcome to Premier League Fantasy!</h2>
        
        }
        
        {mode === "signingIn" && (
          <div className="fullscreen-container">
            <h1 className="login-title">Sign Up</h1>
            <form className="form">
              <div className="input-group">
                <label htmlFor="newUsername"><b>New Username</b></label>
                <input
                  type="text"
                  placeholder="Enter New Username"
                  id="newUsername"
                  required
                />
                <span className="msg">Username is required</span>
              </div>

              <div className="input-group">
                <label htmlFor="newPassword"><b>New Password</b></label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  id="newPassword"
                  required
                />
                <span className="msg">Password must be strong</span>
              </div>

              <button type="submit" className="login-button">Sign Up</button>
            </form>
            <button type="button" onClick={() => setMode("normal")}>
              Go Back
            </button>
          </div>
        )}

        {mode === "loggingIn" && (
          <div className="fullscreen-container">

            <h1 className="login-title">Welcome</h1>

            <form className="form">

              <div className="input-group">

                <label htmlFor="email"><b>Email</b></label>

                <input type="email" placeholder="Enter Email" id="email" required/>

                <span className="msg">Valid Email</span>

              </div>

              <div className="input-group">
                <label htmlFor="password"><b>Password</b></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  required
                />
                <span className="msg">Incorrect Password</span>
              </div>

              <button type="submit" className="login-button">Log In</button>
            </form>
            <button type="button" onClick={() => setMode("normal")}>
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;