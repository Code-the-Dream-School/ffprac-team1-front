
import { Input } from "@material-tailwind/react";

 const CreateProject = () => {
    return (
      <div>
        <header className="text-center text-xl pb-8 font-bold text-green"> Create New Project</header>
        <div className="w-72 py-8">
          <Input label="Project Name"  className="text-gray"/>
        </div>
      </div>
    )
  }

  export default CreateProject