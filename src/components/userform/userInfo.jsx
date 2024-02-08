import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import UserForm from "./UserForm";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";
import { UpdateUser } from "../../lib/fetch";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { useTranslation } from "react-i18next";
import { userSchema } from "../../utils/validationSchemas";
import { useToast } from "@chakra-ui/react";

const UserInfo = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const { user, token } = useAuth();
  const { userInfo, refresh } = useUser();
  const [image, setImage] = useState(userInfo?.photo);
  const [selectedValue, setSelectedValue] = useState(userInfo?.genre);
  const [selectedCountry, setSelectedCountry] = useState({
    label: userInfo?.pays,
    value: userInfo?.pays,
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectError, setSelectError] = useState();
  const { uploadFile, downloadUrl } = useStorage();

  const handleUpdateUser = async (values, actions) => {
    setSubmitting(true);
    if (!selectError) {
      try {
        const { user_id } = user;
        let downloadURL = null;
        if (image && image instanceof File) {
          const path = `profileImages/${user_id}/${image.name}`;
          await uploadFile(image, path);
          downloadURL = await downloadUrl(path);
        }

        let userData = {
          ...(downloadURL && { photo: downloadURL }),
          nom: values.fName,
          prenom: values.lName,
          email: user.email,
          dNaissance: values.birthDate,
          paysCode: values.phoneNumberPrefix,
          pays: selectedCountry.value,
          telephone: values.phoneNumber,
          genre: selectedValue,
        };
        UpdateUser(user.user_id, userData, token)
          .then((res) => {
            refresh();
            handleEditClick();
            toast({
              description: "User information modified successfully.",
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
    initialValues: !userInfo
      ? {
          fName: "",
          lName: "",
          birthDate: "",
          phoneNumberPrefix: "+216",
          phoneNumber: "",
        }
      : {
          fName: userInfo?.nom,
          lName: userInfo?.prenom,
          birthDate: userInfo?.dNaissance,
          phoneNumberPrefix: userInfo?.paysCode,
          phoneNumber: userInfo?.telephone,
        },
    onSubmit: handleUpdateUser,
    enableReinitialize: true,
    validationSchema: userSchema,
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
          <UserForm
            image={image}
            setImage={setImage}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectError={selectError}
            setSelectError={setSelectError}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            isSubmitting={submitting}
          />
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              {t("userInfo.userInformation")}
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
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("userInfo.userPicture")}
            </label>
            <img
              src={userInfo?.photo}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full object-cover font-light"
            />
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("userInfo.userName")}
            </label>
            <p className="text-gray-500 text-sm">
              {userInfo?.nom + " " + userInfo?.prenom}
            </p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("userInfo.birthdate")}
            </label>
            <p className="text-gray-500 text-sm">{userInfo?.dNaissance}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("userInfo.gender")}
            </label>
            <p className="text-gray-500 text-sm">{userInfo?.genre}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("userInfo.country")}
            </label>
            <p className="mb-1 text-gray-500 text-sm">{userInfo?.pays}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              {t("userInfo.phoneNumber")}
            </label>
            <p className="mb-1 text-gray-500 text-sm">{userInfo?.telephone}</p>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
