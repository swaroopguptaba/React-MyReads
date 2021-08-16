import React from 'react';
import { Link } from 'react-router-dom';

const NoMatchPage = ({ location }) => (
   <div>
      <h2>Page Not found</h2>
  	  <Link to='/'> Return to MyReads App </Link>
   </div>
);

export default NoMatchPage;