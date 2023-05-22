import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import CompanyForm from "./CompanyForm";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";
import { GetSecteur, UpdateSociete } from "../../lib/fetch";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { useTranslation } from "react-i18next";
import { companySchema } from "../../utils/validationSchemas";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const { token, user } = useAuth();
  const { company, refresh } = useUser();
  const [image, setImage] = useState(company?.logo);
  const { uploadFile, downloadUrl } = useStorage();
  const { data: activityAreaInfo, isLoading } = useQuery(
    ["activityAreaInfo", company?.secteurId, token],
    () => GetSecteur(company?.secteurId, token)
  );
  const handleUpdateCompany = async (values, actions) => {
    const { user_id } = user;
    const path = `companyImages/${user_id}/${image.name}`;
    image && (await uploadFile(image, path));
    const downloadURL = await downloadUrl(path);
    let companyData = {
      logo: downloadURL,
      nom: values.companyName,
      adresse: values.companyAddress,
      description: values.companyDescription,
    };
    UpdateSociete(company.id, companyData, token)
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
    initialValues:
      !company || isLoading
        ? {
            companyName: "",
            companyAddress: "",
            companyActivity: "",
            companyDescription: "",
          }
        : {
            companyName: company?.nom,
            companyAddress: company?.adresse,
            companyActivity: company?.secteurId,
            companyDescription: company?.description,
          },
          validationSchema : companySchema,
    onSubmit: handleUpdateCompany,
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
              {t("save")}
            </button>
            <button className="hover:text-red-600" onClick={handleEditClick}>
              {t("cancel")}
            </button>
          </div>
          <CompanyForm 
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            image={image}
            setImage={setImage}
            errors={errors}
            touched={touched}
          />
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              {t("companyInfo.companyInformation")}
            </h4>
            <button
              onClick={handleEditClick}
              className="text-primary hover:text-secondary"
            >
              <FaEdit />
            </button>
          </div>
          {company?.logo ? (
            <img
              src={company?.logo}
              alt={company?.nom}
              className="mb-1 w-24 h-24 rounded-full object-cover font-light"
            />
          ) : null}

          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
            {t("companyInfo.companyName")}
            </label>
            <p className="text-gray-500 text-sm">{company?.nom}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
            {t("companyInfo.companyAddress")}
            </label>
            <p className="text-gray-500 text-sm">{company?.adresse}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
            {t("companyInfo.activityArea")}
            </label>
            <p className="text-gray-500 text-sm">{activityAreaInfo?.nom}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
            {t("companyInfo.companyDescription")}
            </label>
            <p className="mb-2 text-gray-500 text-sm">{company?.description}</p>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyInfo;
