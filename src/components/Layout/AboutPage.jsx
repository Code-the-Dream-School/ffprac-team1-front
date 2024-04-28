import React from 'react';
import { Avatar, Tooltip } from '@material-tailwind/react';

const AboutPage = () => {

  return (
    <div className="contanier-primary flex flex-col text-gray xl:px-60">
        <h2 className="text-center text-2xl text-green/85 pb-8">About Page</h2>
        <div className="border border-transparent rounded-lg bg-gray/5 px-8 py-6 mb-4">
            <p className="text-xl text-gray">DevConnexion is a platform created to aspire developers, web designers, testers, and other IT professionals to showcase their projects and profiles. Our platform provides a dynamic environment where users can engage with and contribute to a thriving community of tech enthusiasts.</p>
        </div>
        <div className="border border-transparent rounded-lg bg-gray/5 px-8 py-6 mb-4">
            <p className="text-xl text-green/85">Mentors:</p>
            <div className="flex flex-row flex-wrap py-6">
                <div className="flex flex-col pr-10">
                    <Tooltip content={`Saul Castilio`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741902/Team_pictures/uw6wehbhui0ntwppc8ax.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">Saul Castilio</p>
                </div>
                <div className="flex flex-col pr-10">
                    <Tooltip content={`JD Fitzmartin`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741902/Team_pictures/w1brjotxamlvcpbrkk8e.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">JD Fitzmartin</p>
                </div>
            </div>
        </div>
        <div className="border border-transparent rounded-lg bg-gray/5 px-8 py-6 mb-4">
            <p className="text-xl text-green/85">Team:</p>
            <div className="flex flex-row flex-wrap py-6">
                <div className="flex flex-col pr-10">
                    <Tooltip content={`Mariya Doronkina`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741902/Team_pictures/dpow6bxakybvznrdtvpj.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">Mariya Doronkina</p>
                </div>
                <div className="flex flex-col pr-10">
                    <Tooltip content={`Daria Sidorko`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741902/Team_pictures/e42g1w95bkfecchslqyd.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">Daria Sidorko</p>
                </div>
                <div className="flex flex-col pr-10">
                    <Tooltip content={`Aigul Yedigeyeva`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741902/Team_pictures/z7ssc7xbmv0cpkugph82.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">Aigul Yedigeyeva</p>
                </div>
                <div className="flex flex-col pr-10">
                    <Tooltip content={`Anna Solovykh`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741902/Team_pictures/d44rjxxhbdycfjsp6yyq.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">Anna Solovykh</p>
                </div>
                <div className="flex flex-col pr-10">
                    <Tooltip content={`Yelena Japarova`}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="{profile.profile._id}"
                            src="https://res.cloudinary.com/dqhoyu7rj/image/upload/v1713741903/Team_pictures/n9nbfbo75pcva8jn4yav.jpg"
                            className="border-2 border-gray h-32 min-w-32 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                    </Tooltip>
                    <p className="text-center pt-2">Yelena Japarova</p>
                </div>
            </div>
        </div>

        <div className="border border-transparent rounded-lg bg-gray/5 px-8 py-6 mb-4 flex flex-col">
            <p className="text-xl text-green/85 pb-4">Project Links:</p>
            <a href="https://github.com/Code-the-Dream-School/ffprac-team1-front" target="_blank" className="">
                <i className="fas fa-link fa-md pr-2" />  DevConnexion GitHub Front End</a>
            <a href="https://github.com/Code-the-Dream-School/ffprac-team1-back" target="_blank" className="break-normal">
                <i className="fas fa-link fa-md pr-2" />  DevConnexion GitHub Back End</a>
            <a href="https://dev-connexion-g6sv.onrender.com/api-docs/#/" target="_blank" className="break-normal">
                <i className="fas fa-link fa-md pr-2" />  DevConnexion API</a>
            
        </div>

    </div>
  );
};

export default AboutPage;
