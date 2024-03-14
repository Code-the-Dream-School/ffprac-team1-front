import React from 'react';

const LandingPage = () => (
  <div class="flex flex-row items-center h-screen bg-black pb-28">
    <div className="basis-1/2">
      <div className="w-3/4 mx-auto">
        <h3 className="text-2xl mb-4 text-blue"><span className="font-bold text-blue">DevConnexion:</span> Personal Journey into the World of Professional Development</h3>
        <p className="font-sans font-light mb-8">Welcome to DevConnection — a platform created specifically for aspiring developers, web designers, and testers, among others. Here, at the intersection of technology and creativity, you embark on your exciting journey into professional development.</p>
        <input type="text"  placeholder="Search your first project here" className="search-area w-3/4"></input> 
      </div>
    </div>
    <div className="basis-1/2">
      <div className="w-3/5 mx-auto px-8 ">
        <h1 className="text-center text-xl pb-6">Sign In</h1>     
        <input type="text"  placeholder="Email" className=" input-area  mb-4"></input> 
        <input type="text"  placeholder="Password" className="input-area mb-4"></input>
        <button className="btn-primary" >Sign In</button>
        <h6 className="text-center">Don't have an account? <a className="font-bold text-blue underline hover:cursor-pointer" onClick={()=>document.getElementById('my_modal_2').showModal()}>Sign Up</a></h6>
      </div>
    </div> 
    
    {/* DaisyUI Modal */}
    <dialog id="my_modal_2" className="modal bg-black/50">
      <div className="modal-box bg-black p-8 border border-blue/10">
        <h3 className="font-bold text-lg pb-10 text-2xl text-center">Sign Up</h3>
        <div className="flex flex-row mb-6">
          <input type="text"  placeholder="First Name" className=" input-area  mb-4 mr-4"></input> 
          <input type="text"  placeholder="Last Name" className=" input-area  mb-4 ml-4"></input> 
        </div>
      <input type="text"  placeholder="Email" className=" input-area  mb-4"></input> 
      <input type="text"  placeholder="Password" className=" input-area  mb-8"></input> 
      <button className="btn-primary mr-4">Sign Up</button> 
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </div>
);

export default LandingPage;

