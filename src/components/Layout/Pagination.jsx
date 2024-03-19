import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
const Pagination = ({ currentPage, totalPages, paginate }) => {

  const next = () => {
    if (currentPage === totalPages) return;
    paginate(currentPage + 1);
  };
 
  const prev = () => {
    if (currentPage === 1) return;
    paginate(currentPage - 1);
  };
  return (
    <div className="flex items-center gap-8">
      <Button
        variant="text"
        className="flex items-center gap-2 text-[12px] py-1 px-4 uppercase hover:bg-gray/10 hover:rounded-md disabled:opacity-20 disabled:hover:bg-gray/0 "
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="font-normal h-4 w-4" /> Previous
      </Button>
      <Typography color="gray" className="font-normal font-normal text-[12px]">
        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <Button
        variant="text"
        className="flex items-center gap-2 text-[12px] uppercase py-1 px-4 hover:bg-gray/10 hover:rounded-md  disabled:opacity-20 disabled:hover:bg-gray/0 " 
        onClick={next}
        disabled={currentPage === totalPages}
      > Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> 
      </Button>
    </div>
  );
}

export default Pagination;