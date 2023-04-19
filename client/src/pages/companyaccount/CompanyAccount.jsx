import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyForm from "../../components/companyform/CompanyForm";
import Layout from "../../components/layout/Layout";
import { CreateSociete } from "../../lib/fetch";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";

const CompanyAccount = () => {
  const [image, setImage] = useState("");
  const { token, user } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleCreateCompany = async (values, actions) => {
    const { user_id } = user;
    const path = `companyImages/${user_id}/${image.name}`;
    await uploadFile(image, path);
    const downloadURL = await downloadUrl(path);
    let companyData = {
      logo: downloadURL,
      nom: values.companyName,
      adresse: values.companyAddress,
      description: values.companyDescription,
      userId: user_id,
    };
    CreateSociete(companyData, token)
      .then((res) => {
        console.log(res);
        navigate(from, { replace: true });
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
      companyName: "",
      companyAddress: "",
      companyActivity: "",
      companyDescription: "",
    },
    onSubmit: handleCreateCompany,
  });
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <CompanyForm
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              image={image}
              setImage={setImage}
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

export default CompanyAccount;
