import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { PiUserSoundLight } from "react-icons/pi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RangeSlider } from "./lib/RangeSlider";
import Amazon from "./assets/amazon_logo.jpg";
import JobCard from "./components/JobCard";
import { axiosInstance } from "./lib/axios";
interface Job {
  jobTitle: string;
  jobDescription: string;
  maxSalary: string;
  createdAt: string; // Add this line to include createdAt
}


const locations = ["Bengalore", "Hyderabad", "Mumbai", "Pune", "Chennai", "Others"];
const jobTypes = ["Internship", "Full-time", "Partime", "Contract"];
const jobData: Job[] = [{
  jobTitle: "Software Engineer",
  jobDescription: "Develop and maintain software applications.",
  maxSalary: "120",
  createdAt: "2023-10-01T12:00:00Z", // Example date
}]

const getJobs = async (
  keyword = "",
  location: string,
  jobType: string,
  salaryRange: any
) => {
  try {
    let link = `/jobs?keyword=${keyword}&maxSalary[gte]=${salaryRange.min}&maxSalary[lte]=${salaryRange.max}`;

    if (location && jobType)
      link = `/jobs?keyword=${keyword}&location=${location}&maxSalary[gte]=${salaryRange.min}&maxSalary[lte]=${salaryRange.max}&jobType=${jobType}`;
    else if (location) {
      link = `/jobs?keyword=${keyword}&location=${location}&maxSalary[gte]=${salaryRange.min}&maxSalary[lte]=${salaryRange.max}`;
    }
    else if (jobType) {
      link = `/jobs?keyword=${keyword}&jobType=${jobType}&maxSalary[gte]=${salaryRange.min}&maxSalary[lte]=${salaryRange.max}`;
    }

    const { data } = await axiosInstance.get(link);

    return data.job;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const App = () => {
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 150 });
  const [loading, setloading] = useState(false);
  const [jobs, setJobs] = useState(jobData);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setloading(true);
    getJobs(keyword, location, jobType, salaryRange)
      .then((job) => setJobs(job))
      .catch((err) => console.log(err));
    setloading(false);
  }, [keyword, location, jobType, salaryRange, reload]);

  console.log(jobs);

  return (
    <div className="bg-violet-50 w-full min-h-screen pt-2">
      <Navbar setReload = {setReload}/>

      <div className="flex bg-white min-h-20 items-center max-sm:flex-col shadow-sm shadow-violet lg:px-16 px-5">
        <div className="flex lg:pr-10 relative w-full items-center border-r-2 border-neutral-100">
          <CiSearch className="absolute top-4.5 left-5 text-lg text-neutral-400" />

          <input
            type="text"
            id="salaryRange"
            name="minSalary"
            className="pl-9 lg:pl-14 border-none block w-full px-3 py-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by Job Title, Role"
          />
        </div>

        <div className="w-full relative border-r-2 border-neutral-100">
          <div className="relative">
            <CiLocationOn
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 pointer-events-none"
              size={20}
            />
            <select
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full text-neutral-500 px-10 py-4  focus:outline-none sm:text-sm appearance-none"
            >
              <option value="" disabled>
                Preferred Location
              </option>
              {locations.map((loc) => (
                <option key={loc} value={loc} className="">
                  {loc}
                </option>
              ))}
            </select>
            <HiOutlineChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        <div className="w-full relative border-r-2 border-neutral-100">
          <div className="relative">
            <PiUserSoundLight
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700 pointer-events-none"
              size={20}
            />
            <select
              id="jobType"
              name="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="mt-1 block w-full text-neutral-500 px-10 py-4  focus:outline-none sm:text-sm appearance-none"
            >
              <option value="" disabled>
                Job Type
              </option>
              {jobTypes.map((loc) => (
                <option key={loc} value={loc} className="">
                  {loc}
                </option>
              ))}
            </select>
            <HiOutlineChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none"
              size={20}
            />
          </div>
        </div>
        <div className="w-full h-14 lg:pl-8 lg:pr-4 flex flex-col gap-3 pt-2">
          <div className="flex justify-between items-center font-semibold">
            <div className="max-md:text-xs text-sm text-neutral-600">
              Salary Per Month
            </div>
            <div className="">
              <span className="text-sm max-md:text-xs text-gray-600">₹{salaryRange.min}k</span>
              {"-"}
              <span className="text-sm max-md:text-xs text-gray-600">₹{salaryRange.max}k</span>
            </div>
          </div>
          <RangeSlider
            min={0}
            max={150}
            onChange={(values) => setSalaryRange(values)}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-6 sm:px-20 max-sm:px-2">
        
        {loading ? <div className="font-bold">loading...</div>:  jobs.map((job, ind) => (
          <JobCard
            key={ind}
            companyLogo={Amazon}
            datePosted={job.createdAt}
            jobTitle={job.jobTitle}
            experience={"1-3 yr Exp"}
            jobType={"Onsite"}
            maxSalary={job.maxSalary}
            description={job.jobDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
