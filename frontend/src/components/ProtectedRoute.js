import React from 'react';
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => loggedIn 
  ? children 
  : <Redirect to="/main-page" />

export default ProtectedRoute; 