import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
const Modal = ({ openModalButton, modalBody, buttonClassName }) =>  {
  const [size, setSize] = React.useState(null);
 
  const handleOpen = (value) => setSize(value);
 
  return (
    <>
      <div className="flex w-full gap-3">
        <button className={ buttonClassName } onClick={() => handleOpen("lg")} variant="gradient">
          { openModalButton }
        </button>
      </div>
      <Dialog
        open={
          size === "lg" 
        }
        size={size || "md"}
        handler={handleOpen}
        className="border border-black rounded-3xl bg-black h-[96%]"
      >
        <div className=" h-full bg-black border border-blue/30 rounded-2xl px-8 pt-8 pb-4 ">
          <div className="text-right pb-2">
              <i className="fas fa-xmark fa-xl text-green/70 pr-2 hover:text-blue/60 hover:cursor-pointer"  onClick={() => handleOpen(null)}/>
            </div>
          <DialogBody>
            { modalBody }
          </DialogBody>
          <footer className="flex flex-row w-full justify-end">
          </footer>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;