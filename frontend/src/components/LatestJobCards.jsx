// import React from 'react'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const LatestJobCards = ({job}) => {
//     const navigate = useNavigate();
//     return (
//         <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
//             <div>
//                 <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                 <p className='text-sm text-gray-500'>India</p>
//             </div>
//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
//                 <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//                 <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary }INR</Badge>
//             </div>

//         </div>
//     )
// }

// export default LatestJobCards


import React from 'react';
import { Badge } from './ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Company Logo and Time Posted */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-2 rounded-full">
            <img
              src={job?.company?.logo || '/default-logo.png'}
              alt="Company Logo"
              className="h-10 w-10 object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">{job?.timePosted || '24h Ago'}</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-xl mb-2 text-gray-800">{job?.title || 'Full Stack Developer'}</h1>
        <p className="text-sm text-gray-600">
          {job?.description ||
            'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized experiences.'}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.experience || '1-3 yr Exp'}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType || 'Onsite'}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary || '12 LPA'}
        </Badge>
      </div>

      {/* Apply Button */}
      <div className="mt-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCards;
