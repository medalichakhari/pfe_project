import { FaEdit, FaTrash, FaSuitcase, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PostedJobCard({jobId, jobTitle, jobType, numCandidates }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/joboffer/${jobId}/candidates`);
  };
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center w-[320px] mb-4">
      <div className="flex-1 cursor-pointer" onClick={handleNavigate}>
        <h2 className="text-lg font-medium mb-2">{jobTitle}</h2>
        <div className="flex items-center mb-1">
          <FaSuitcase className="mr-2 text-gray-500" />
          <p className="text-sm text-gray-500">{jobType}</p>
        </div>
        <div className="flex items-center">
          <FaUserFriends className="mr-2 text-gray-500" />
          <p className="text-sm text-gray-500">{numCandidates} candidate</p>
        </div>
      </div>
      <div className="flex-none flex items-center ml-4">
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <FaEdit className="text-gray-500" />
        </button>
        <button className="p-1 ml-2 hover:bg-gray-100 rounded-full">
          <FaTrash className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}

export default PostedJobCard;
