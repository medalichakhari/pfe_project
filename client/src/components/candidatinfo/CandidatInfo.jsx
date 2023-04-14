import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";
import { UpdateCandidat } from "../../lib/fetch";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import CandidatForm from "../candidatform/CandidatForm";

const CandidatInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const { token } = useAuth();
  const { candidat, refresh } = useUser();

  const handleUpdateCandidat = async (values, actions) => {
    console.log("candidatId", candidat.id);
    let candidatData = {
        grade: values.grade,
        speciality: values.speciality,
        };
    UpdateCandidat(candidat.id, candidatData, token)
      .then((res) => {
        refresh();
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
    initialValues:
      !candidat || isLoading
        ? {
            grade: "",
            speciality: "",
          }
        : {
            grade: company?.grade,
            speciality: company?.speciality,
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
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              Candidat Info :
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
              Candidat grade:
            </label>
            <p className="text-gray-500 text-sm">{candidat?.nom}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Candidat speciality:
            </label>
            <p className="text-gray-500 text-sm">{candidat?.speciality}</p>
          </div>
        </>
      )}
    </>
  );
};

export default CandidatInfo;
