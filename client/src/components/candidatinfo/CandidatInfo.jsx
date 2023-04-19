import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";
import { UpdateCandidat } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import CandidatForm from "../candidatform/CandidatForm";
import { Link } from "react-router-dom";
import { useStorage } from "../../context/StorageContext";

const CandidatInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const { token, user } = useAuth();
  const { candidate, refresh } = useUser();
  console.log(candidate);
  const { uploadFile, downloadUrl } = useStorage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedValues, setSelectedValues] = useState(null);
  const handleUpdateCandidat = async (values, actions) => {
    const qualificationsValue = selectedValues.map((option) => option.value);
    const qualifications = qualificationsValue.join(",");
    const { user_id } = user;
    const path = `candidatResumes/${user_id}/${selectedFile?.name}`;
    selectedFile && (await uploadFile(selectedFile, path));
    const downloadURL = await downloadUrl(path);
    let candidatData = {
      niveau: values.niveau,
      specialite: values.speciality,
      competences: qualifications,
      cv: downloadURL,
    };
    UpdateCandidat(candidate.id, candidatData, token)
      .then((res) => {
        refresh();
        handleEditClick();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: !candidate
      ? {
          speciality: "",
        }
      : {
          speciality: candidate?.specialite,
        },
    onSubmit: handleUpdateCandidat,
    enableReinitialize: true,
  });
  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end mb-1">
            <button
              type="submit"
              className="text-primary hover:text-secondary mr-2"
            >
              Save
            </button>
            <button className="hover:text-red-600" onClick={handleEditClick}>
              Cancel
            </button>
          </div>
          <CandidatForm
            values={values}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              Candidate Info :
            </h4>
            <button
              onClick={handleEditClick}
              className="text-primary hover:text-secondary"
            >
              <FaEdit />
            </button>
          </div>

          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Education level:
            </label>
            <p className="text-gray-500 text-sm">{candidate?.niveau}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Speciality:
            </label>
            <p className="text-gray-500 text-sm">{candidate?.specialite}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Qualification:
            </label>
            <p className="text-gray-500 text-sm">{candidate?.competences}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              CV:
            </label>
            <Link
              to={candidate?.cv}
              className="text-blue-500 hover:text-blue-700"
            >
              View CV
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default CandidatInfo;
