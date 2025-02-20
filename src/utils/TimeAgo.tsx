import { useState, useEffect } from "react";

const getTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let unit in intervals) {
    const count = Math.floor(seconds / intervals[unit]);
    if (count > 0) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(new Date(timestamp)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(new Date(timestamp)));
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [timestamp]);

  console.log(timeAgo)

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
