import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import UploadImage from "../shared/UploadImage";
import CompanyForm from "../companyform/CompanyForm";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";

const CompanyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const { company } = useUser();
  console.log(company);
  const handleUpdateCompany = async (values, actions) => {
    console.log("companyId", company.id);
    let companyData = {
      nom: values.companyName,
      adresse: values.companyAddress,
      description: values.companyDescription,
    };
    UpdateSociete(company.id, companyData, token)
      .then((res) => {
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
    initialValues: !company
      ? {
          companyName: "",
          companyAddress: "",
          companyActivity: "",
          companyDescription: "",
        }
      : {
          companyName: company?.nom,
          companyAddress: company?.adresse,
          companyActivity: company?.secteur?.nom,
          companyDescription: company?.description,
        },
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
              Save
            </button>
            <button className="hover:text-red-600" onClick={handleEditClick}>
              Cancel
            </button>
          </div>
          <CompanyForm
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            image={image}
            setImage={setImage}
          />
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              Company Info :
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
              Company logo:
            </label>
            <GoogleIcon />
            {/* <img
            src={companyImage}
            alt={companyName}
            className="w-full mb-4 rounded-lg"
          /> */}
          </div>

          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Company name:
            </label>
            <p className="text-gray-500 text-sm">{company?.nom}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Company Address:
            </label>
            <p className="text-gray-500 text-sm">{company?.adresse}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Company Activity area:
            </label>
            <p className="text-gray-500 text-sm">{}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Company Description:
            </label>
            <p className="mb-2 text-gray-500 text-sm">
              {values.companyDescription}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyInfo;
