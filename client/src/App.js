import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <section className="container"><Alert/></section>
          <Routes>
            <Route exact path="/" element={<Landing />}/>

            <Route exact path="/register" element={
              <section className='container'>
              <Register />
              </section>
            }/>
            <Route exact path="/login" element={
              <section className='container'>
              <Login />
              </section>
            }/>
          </Routes>

        </Fragment>
      </Router>
    </Provider>
  )};
  

export default App;
