import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import AddExperience from './components/profile-forms/AddExperience';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import AddEducation from './components/profile-forms/AddEducation';


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
          <Alert />
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
            <Route exact path="/profile" element={
              <section className='container'>
              <Profiles />
              </section>
            }/>
            <Route
            path="/dashboard"
            element={
              <section className='container'>
                <PrivateRoute component={Dashboard} />
              </section>}
            />
            <Route
            path="/create-profile"
            element={
              <section className='container'>
                <PrivateRoute component={CreateProfile} />
              </section>}
            />
            <Route
            path="/edit-profile"
            element={
              <section className='container'>
                <PrivateRoute component={CreateProfile} />
              </section>}
            />
            <Route
            path="/add-experience"
            element={
              <section className='container'>
                <PrivateRoute component={AddExperience} />
              </section>}
            />
            <Route
            path="/add-education"
            element={
              <section className='container'>
                <PrivateRoute component={AddEducation} />
              </section>}
            />
          </Routes>

        </Fragment>
      </Router>
    </Provider>
  )};
  

export default App;
