import {BrowserRouter,Route,Routes} from 'react-router-dom';
import React from 'react';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
<div className="App">
    <ToastContainer />
<BrowserRouter>
<Routes>
  <Route path="/" exact element={<LogIn />} />
  <Route path="/sign-up" exact element={<SignUp />} />
  <Route path="/home" exact element={<Home />} />
  <Route path="/*" element={<LogIn />}/>
</Routes>

</BrowserRouter>
</div>
  );

}

export default App;
