
import React, { useState } from "react";

 const UploadImage = () => {

    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
      <>
        <header className="text-center text-xl pb-6 font-bold text-green"> Upload Image</header>
        <input type="file" onChange={(e) => handleChange(e)} className="hover:cursor-pointer"/>
        <div className=" content-center">
          <header className="text-center text-ld pb-6 font-bold text-gray"> Image preview</header>
          <img src={file} className=" h-56 w-56 rounded-full bject-cover object-center bg-black" />
        </div>
      </>
    )
  }

  export default UploadImage