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
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const toast = useToast();
  const { token, user } = useAuth();
  const { company, refresh } = useUser();
  const [editorValue, setEditorValue] = useState(company?.description);
  const [editorError, setEditorError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    label: company?.pays,
    value: company?.pays,
  });
  const { uploadFile, downloadUrl } = useStorage();
  const { data: activityAreaInfo, isLoading } = useQuery(
    ["activityAreaInfo", company?.secteurId, token],
    () => GetSecteur(company?.secteurId, token)
  );
  const handleUpdateCompany = async (values, actions) => {
    setSubmitting(true);
    if (!editorError && !selectError) {
      const { user_id } = user;
      let downloadURL = "";
      if (image) {
        const path = `companyImages/${user_id}/${image.name}`;
        await uploadFile(image, path);
        downloadURL = await downloadUrl(path);
      }
      let companyData = {
        ...(downloadURL && { logo: downloadURL }),
        nom: values.companyName,
        pays: selectedCountry.value,
        adresse: values.companyAddress,
        siteWeb: values.companyWebsite,
        description: editorValue,
        secteurId: values.companyActivity,
      };
      UpdateSociete(company.id, companyData, token)
        .then((res) => {
          refresh();
          handleEditClick();
          toast({
            description: "Company information has been modified successfully.",
            position: "bottom-left",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            description: err.message,
            position: "bottom-left",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };
  const {
    values,
    errors,
    touched,
    isSubmitting: isCompanySubmitting,
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
            companyWebsite: "",
          }
        : {
            companyName: company?.nom,
            companyAddress: company?.adresse,
            companyActivity: company?.secteurId,
            companyWebsite: company?.siteWeb,
          },
    validationSchema: companySchema,
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
              disabled={isCompanySubmitting}
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
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectError={selectError}
            setSelectError={setSelectError}
            image={image}
            setImage={setImage}
            errors={errors}
            touched={touched}
            editorValue={editorValue}
            setEditorValue={setEditorValue}
            editorError={editorError}
            setEditorError={setEditorError}
            isSubmitting={submitting}
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
              <div className="flex items-center">
                <FaEdit />
                <span className="ml-1">Edit</span>
              </div>
            </button>
          </div>
          {company?.logo ? (
            <img
              src={company?.logo}
              alt={company?.nom}
              className="mb-1 w-24 h-24 rounded-full object-cover font-light"
            />
          ) : null}

          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("companyInfo.companyName")}
            </label>
            <p className="text-gray-500 text-sm">{company?.nom}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Company state
            </label>
            <p className="text-gray-500 text-sm">{company?.pays}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("companyInfo.companyAddress")}
            </label>
            <p className="text-gray-500 text-sm">{company?.adresse}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("companyInfo.activityArea")}
            </label>
            <p className="text-gray-500 text-sm">{activityAreaInfo?.nom}</p>
          </div>
          <div className="mb-1">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("companyInfo.companyWebsite")}
            </label>
            <Link
              to={company?.siteWeb}
              target="_blank"
              className="text-indigo-600 hover:text-indigo-900"
            >
              {company?.siteWeb}
            </Link>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("companyInfo.companyDescription")}
            </label>
            <p
              className="mb-2 text-gray-500 text-sm"
              dangerouslySetInnerHTML={{ __html: company?.description }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CompanyInfo;
