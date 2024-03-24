import React from 'react';
import Search from '../Search/SearchBar.jsx';
import Registration from '../Authentification/Registration.jsx';
import Login from '../Authentification/Login.jsx';

const LandingPage = ({ setIsLoggedIn }) => (
  <div className="flex flex-row items-center h-screen bg-black pb-28">
    <div className="basis-1/2">
      <div className="w-3/4 mx-auto">
        <h3 className="text-2xl mb-4 text-blue">
          <span className="font-bold text-blue">DevConnexion:</span> Personal Journey into the World
          of Professional Development
        </h3>
        <p className="font-sans font-light mb-8">
          Welcome to DevConnexion — a platform created specifically for aspiring developers, web
          designers, and testers, among others. Here, at the intersection of technology and
          creativity, you embark on your exciting journey into professional development.
        </p>
        <Search />
      </div>
    </div>
    <div className="basis-1/2">
      <div className="w-3/5 mx-auto px-8">
        <h1 className="text-center text-xl pb-6">Sign In</h1>
        <Login setIsLoggedIn={setIsLoggedIn}/>
        <h6 className="text-center">
          Don't have an account? <span className="font-bold text-blue underline hover:cursor-pointer" onClick={() => document.getElementById('my_modal_2').showModal()}>
            Sign Up
          </span>
        </h6>
      </div>
    </div>
    {/* DaisyUI Modal */}
    <dialog id="my_modal_2" className="modal bg-black/50">
      <div className="modal-box bg-black p-8 border border-blue/10">
        <h3 className="font-bold text-lg pb-10 text-2xl text-center">Sign Up</h3>
        <Registration />
        </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
);

export default LandingPage;
