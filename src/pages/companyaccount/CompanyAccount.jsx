import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import CompanyForm from "@/companyform/CompanyForm";
import Layout from "@/layout/Layout";
import { CreateSociete } from "../../lib/fetch";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { companySchema } from "../../utils/validationSchemas";

const CompanyAccount = () => {
  const [image, setImage] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [editorError, setEditorError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { token, user, refreshUser } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const navigate = useNavigate();
  const handleCreateCompany = async (values, actions) => {
    if (editorError) {
      const { user_id } = user;
      const path = `companyImages/${user_id}/${image.name}`;
      await uploadFile(image, path);
      const downloadURL = await downloadUrl(path);
      let companyData = {
        logo: downloadURL,
        nom: values.companyName,
        adresse: values.companyAddress,
        pays: selectedCountry.value,
        description: editorValue,
        website: values.companyWebsite,
        secteurId: values.companyActivity,
        userId: user_id,
      };
      try {
        await CreateSociete(companyData, token);
        await refreshUser();
        navigate("/postjob");
      } catch (err) {
        console.log(err);
      }
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
    initialValues: {
      companyName: "",
      companyAddress: "",
      companyActivity: "",
      companyDescription: "",
      companyWebsite: "",
    },
    validationSchema: companySchema,
    onSubmit: handleCreateCompany,
  });
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <CompanyForm
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              image={image}
              setImage={setImage}
              errors={errors}
              touched={touched}
              editorValue={editorValue}
              setEditorValue={setEditorValue}
              selectedCountry={selectedCountry} 
              setSelectedCountry={setSelectedCountry}
              editorError={editorError}
              setEditorError={setEditorError}
              isSubmitting={isSubmitting}
            />
            <div className="flex flex-row-reverse">
              <PrimaryButton type="submit" disabled={isSubmitting}>
                Create
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyAccount;
