import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
const Modal = ({openModalButton, modalBody}) =>  {
  const [size, setSize] = React.useState(null);
 
  const handleOpen = (value) => setSize(value);
 
  return (
    <>
      <div className="flex w-full gap-3">
        <button className="btn-primary font-[Jura] min-w-44" onClick={() => handleOpen("lg")} variant="gradient">
          { openModalButton }
        </button>
      </div>
      <Dialog
        open={
          size === "lg" 
        }
        size={size || "md"}
        handler={handleOpen}
        className="border border-black rounded-3xl"
      >
        <div className="bg-black border border-blue/30 rounded-2xl px-8 pt-8 pb-4">
          <DialogBody >
            { modalBody }
          </DialogBody>
          <footer className="flex flex-row w-full justify-end">
            <button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
              className="btn-secondary text-black w-[15%] mr-8"
            >
              <span>Cancel</span>
            </button>
            <button
              variant="gradient"
              color="green"
              onClick={() => handleOpen(null)}
              className="btn-primary text-black w-[20%]" 
            >Confirm
            </button>
          </footer>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;