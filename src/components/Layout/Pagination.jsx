import React from "react";

import { Button, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
const Pagination = ({}) => {
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === 4) return;
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
  return (
    <div className="flex items-center gap-8">
      <Button
        variant="text"
        className="flex items-center gap-2 text-[12px] py-1 px-4 uppercase hover:bg-gray/10 hover:rounded-md disabled:opacity-20 disabled:hover:bg-gray/0 "
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="font-normal h-4 w-4" /> Previous
      </Button>
      <Typography color="gray" className="font-normal font-normal text-[12px]">
        Section <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">4</strong>
      </Typography>
      <Button
        variant="text"
        className="flex items-center gap-2 text-[12px] uppercase py-1 px-4 hover:bg-gray/10 hover:rounded-md  disabled:opacity-20 disabled:hover:bg-gray/0 " 
        onClick={next}
        onChange={() => onCardsUpdate()}
        disabled={active === 4}
      > Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> 
      </Button>
    </div>
  );
}

export default Pagination;