import React from "react";
import { RiUserAddLine } from "react-icons/ri";
import { RiBuildingLine } from "react-icons/ri";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import TimeAgo from "timeago-react";

const content = `
  A user-friendly interface lets you browse stunning photos and videos.
  Filter destinations based on interests and travel style, and create personalized recommendations.
`;

const items = content
  .split(".")
  .map((item) => item.trim())
  .filter((item) => item.length > 0);
const JobCard = ({
  key,
  companyLogo,
  datePosted,
  jobTitle,
  experience,
  jobType,
  maxSalary,
  description,
}: {
  key: number,
  companyLogo: String,
  datePosted: String,
  jobTitle: String,
  experience: String,
  jobType: String,
  maxSalary: String,
  description: String
}) => {
  return (
    <div className="p-3 bg-white flex flex-col gap-4 rounded-xl" key={key}>
      <div className="flex justify-between">
        <div className="bg-slate-200 w-fit rounded-xl">
          <img
            src={companyLogo}
            alt={`${jobTitle} logo`}
            className="h-14 w-14 rounded-full"
          />
        </div>
        <p className="bg-blue-300 h-fit p-1.5 px-2 rounded-xl text-xs"><TimeAgo datetime={datePosted}/> </p>
      </div>
      <p className="font-bold text-xl text-neutral-800">{jobTitle}</p>
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 gap-1 flex items-center">
          <RiUserAddLine />
          <p className="text-sm font-semibold">{experience} </p>
        </div>
        <div className="text-neutral-500 gap-1 flex items-center">
          <RiBuildingLine />
          <p className="text-sm font-semibold">{jobType} </p>
        </div>
        <div className="text-neutral-500 gap-1 flex items-center">
          <HiOutlineSquare3Stack3D />
          <p className="text-sm font-semibold">{Math.round((Number(maxSalary) * 12) / 100 * 100) / 100} L </p>
        </div>
      </div>
      <ul className="list-disc pl-5 space-y-1 text-gray-700 text-xs">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button className="text-white bg-sky-400 py-2 rounded-xl text-xs">Apply Now</button>
    </div>
  );
};

export default JobCard;
