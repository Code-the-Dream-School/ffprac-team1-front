
import { PencilSquareIcon } from '@heroicons/react/24/outline'

 const EditIcon = ({openModalButtonText}) => {
    return (
      <>
        <span className="text-blue/50 hover:text-blue hover:cursor-pointer ">{openModalButtonText}</span>
        <PencilSquareIcon  strokeWidth="1"  className="h-6 w-6 ml-2 mb-2 stroke-blue/50 inline hover:stroe-blue hover:cursor-pointer"/>
        
      </>
    )
  }

  export default EditIcon