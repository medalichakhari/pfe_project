import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";
import { UpdateCandidat } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import CandidatForm from "../candidatform/CandidatForm";
import { Link } from "react-router-dom";
import { useStorage } from "../../context/StorageContext";
import { useTranslation } from "react-i18next";
import { candidatSchema } from "../../utils/validationSchemas";
import { useToast } from "@chakra-ui/react";

const CandidatInfo = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const toast = useToast();
  const { token, user } = useAuth();
  const { candidate, refresh } = useUser();
  const { uploadFile, downloadUrl } = useStorage();
  const [selectedFile, setSelectedFile] = useState(candidate?.cv);
  const skillsArray = candidate?.competences
    ?.split(",")
    .map((skill) => skill.trim());
  const mappedSkills = skillsArray?.map((skill) => ({
    label: skill,
    value: skill,
  }));
  const [selectedValues, setSelectedValues] = useState(mappedSkills);
  const [selectError, setSelectError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleUpdateCandidat = async (values, actions) => {
    setSubmitting(true);
    if (!selectError) {
      const qualificationsValue = selectedValues.map((option) => option.value);
      const qualifications = qualificationsValue.join(",");
      const { user_id } = user;

      let downloadURL = candidate.cv;
      if (selectedFile instanceof File) {
        const path = `candidatResumes/${user_id}/${selectedFile?.name}`;
        await uploadFile(selectedFile, path);
        downloadURL = await downloadUrl(path);
      }

      let candidatData = {
        niveau: values.educationLevel,
        specialite: values.speciality,
        competences: selectedValues ? qualifications : candidate.competences,
        experience: values.experience,
        portfolio: values.portfolioUrl,
        cv: downloadURL,
      };
      UpdateCandidat(candidate.id, candidatData, token)
        .then((res) => {
          refresh();
          handleEditClick();
          toast({
            description:
              "Candidate information has been modified successfully.",
            position: "bottom-left",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            description: err.message,
            position: "bottom-left",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.log(err);
        });
    }
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
          educationLevel: "",
          speciality: "",
          experience: "",
          portfolioUrl: "",
        }
      : {
          educationLevel: candidate?.niveau,
          speciality: candidate?.specialite,
          experience: candidate?.experience,
          portfolioUrl: candidate?.portfolio,
        },
    validationSchema: candidatSchema,
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
              disabled={isSubmitting}
            >
              {t("save")}
            </button>
            <button className="hover:text-red-600" onClick={handleEditClick}>
              {t("cancel")}
            </button>
          </div>
          <CandidatForm
            values={values}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            selectedValues={selectedValues}
            selectError={selectError}
            setSelectError={setSelectError}
            submitting={submitting}
            setSelectedValues={setSelectedValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              {t("candidateInfo.candidateInformation")}
            </h4>
            <button
              onClick={handleEditClick}
              className="text-primary hover:text-secondary"
            >
              <div className="flex items-center">
                <FaEdit />
                <span className="ml-1">Edit</span>
              </div>
            </button>
          </div>

          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("candidateInfo.educationLevel")}
            </label>
            <p className="text-gray-500 text-sm">{candidate?.niveau}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("candidateInfo.speciality")}
            </label>
            <p className="text-gray-500 text-sm">{candidate?.specialite}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("candidateInfo.qualifications")}
            </label>
            <p className="text-gray-500 text-sm">{candidate?.competences}</p>
          </div>
          {candidate?.portfolio && (
            <div className="mb-1">
              <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
                {t("candidateInfo.portfolioUrl")}
              </label>
              <Link
                to={candidate?.portfolio}
                target="_blank"
                className="text-indigo-600 hover:text-indigo-900"
              >
                {candidate?.portfolio}
              </Link>
            </div>
          )}
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("candidateInfo.experience")}
            </label>
            <p className="text-gray-500 text-sm">{candidate?.experience}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("candidateInfo.curriculumVitae")}
            </label>
            <Link
              to={candidate?.cv}
              target="_blank"
              className="text-blue-500 hover:text-blue-700"
            >
              {t("candidateInfo.view")}
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default CandidatInfo;
