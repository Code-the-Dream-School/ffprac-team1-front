import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
<footer className="bg-black p-4 flex-1 bottom-0">
  <p className="text-center text-blue/40"> 
    Copyright &copy; 2024 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    Designed by DevConnexion  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="/About">Meet the Team</a>
  </p>
</footer>
  );
};

export default Footer;
