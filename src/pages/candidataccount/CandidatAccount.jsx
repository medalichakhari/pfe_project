import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CandidatForm from "@/candidatform/CandidatForm";
import Layout from "@/layout/Layout";
import { CreateCandidat } from "../../lib/fetch";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import CandidatInfo from "@/candidatinfo/CandidatInfo";
import { candidatSchema } from "../../utils/validationSchemas";

const CandidatAccount = () => {
  const [submitting, setSubmitting] = useState(false);
  const { token, user, refreshUser } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedValues, setSelectedValues] = useState(null);
  const [selectError, setSelectError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleCreateCandidat = async (values, actions) => {
    setSubmitting(true);
    const qualificationsValue = selectedValues.map((option) => option.value);
    const qualifications = qualificationsValue.join(",");
    const { user_id } = user;
    const path = `candidatResumes/${user_id}/${selectedFile?.name}`;
    selectedFile && (await uploadFile(selectedFile, path));
    const downloadURL = await downloadUrl(path);
    let candidatData = {
      niveau: values.educationLevel,
      specialite: values.speciality,
      competences: qualifications,
      experience: values.experience,
      portfolio: values.portfolioUrl,
      cv: downloadURL,
      userId: user_id,
    };
    CreateCandidat(candidatData, token)
      .then((res) => {
        refreshUser()
          .then(() => navigate(from, { replace: true }))
          .catch((err) => console.log(err));
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
    initialValues: {
      speciality: "",
      educationLevel: "",
      experience: "",
      portfolioUrl: "",
    },
    validationSchema: candidatSchema,
    onSubmit: handleCreateCandidat,
  });
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {user.roles.includes("candidat") ? (
            <CandidatInfo />
          ) : (
            <form onSubmit={handleSubmit}>
              <CandidatForm
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                selectError={selectError}
                setSelectError={setSelectError}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
              <div className="flex flex-row-reverse">
                <PrimaryButton type="submit" disabled={submitting}>
                  Create
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CandidatAccount;
