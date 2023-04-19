import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CandidatForm from "../../components/candidatform/CandidatForm";
import Layout from "../../components/layout/Layout";
import { CreateCandidat } from "../../lib/fetch";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";

const CandidatAccount = () => {
  const { token, user } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedValues, setSelectedValues] = useState(null);
  const navigate = useNavigate();
  const handleCreateCandidat = async (values, actions) => {
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
      cv: downloadURL,
      userId: user_id,
    };
    CreateCandidat(candidatData, token)
      .then((res) => {
        console.log(res);
        navigate("/");
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
    },
    onSubmit: handleCreateCandidat,
  });
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <CandidatForm
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div className="flex flex-row-reverse">
              <PrimaryButton type="submit">Create</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CandidatAccount;
