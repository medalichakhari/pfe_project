import { FaEdit, FaTrash, FaUserFriends } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EditPostedJobModal from "./EditPostedJobModal";
import { useState } from "react";
import { DeleteOffre } from "../../lib/fetch";
import DeleteAlertDialog from "../shared/AlertDialog";
import { useAuth } from "../../context/AuthContext";

function PostedJobCard({ jobId, jobTitle, jobType, numCandidates }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);
  const handleNavigate = () => {
    navigate(`/joboffer/${jobId}/candidates`);
  };
  const handleOpenEditModal = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModel(!isOpenDeleteModel);
  };
  const handleDeleteJob = () => {
    DeleteOffre(jobId, token)
      .then((res) => {
        console.log("res", res);
        handleOpenDeleteModal();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <EditPostedJobModal
        isOpen={isOpen}
        handleOpenEditModal={handleOpenEditModal}
        jobId={jobId}
      />
      <DeleteAlertDialog
        label={"Delete Job"}
        isOpen={isOpenDeleteModel}
        handleOpenDeleteModal={handleOpenDeleteModal}
        handleDelete={handleDeleteJob}
      />
      <div className="bg-white border rounded-lg p-4 flex items-center w-[320px] mb-4">
        <div className="flex-1 cursor-pointer" onClick={handleNavigate}>
          <h2 className="text-lg font-medium mb-2">{jobTitle}</h2>
          <div className="flex items-center mb-1">
            <BsFillBriefcaseFill className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-500">{jobType}</p>
          </div>
          <div className="flex items-center">
            <FaUserFriends className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-500">{numCandidates} candidate</p>
          </div>
        </div>
        <div className="flex-none flex items-center ml-4">
          <button
            onClick={handleOpenEditModal}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FaEdit className="text-gray-500" />
          </button>
          <button className="p-1 ml-2 hover:bg-gray-100 rounded-full">
            <FaTrash
              onClick={handleOpenDeleteModal}
              className="text-gray-500 hover:text-red-500"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default PostedJobCard;
