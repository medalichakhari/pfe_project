import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import UserForm from "./UserForm";
import { useUser } from "../../context/UserContext";
import { useFormik } from "formik";
import { GetSecteur, UpdateSociete, UpdateUser } from "../../lib/fetch";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";

const UserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const { user, token } = useAuth();
  const { userInfo, refresh } = useUser();
  const [selectedValue, setSelectedValue] = useState(userInfo?.genre);
  const handleUpdateUser = async (values, actions) => {
    let userData = {
      id: user.user_id,
      nom: values.fName,
      prenom: values.lName,
      email: user.email,
      dNaissance: values.birthDate,
      telephone: values.phoneNumber,
      adresse: values.address,
      genre: selectedValue,
    };
    UpdateUser(user.user_id, userData, token)
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
    initialValues: !userInfo
      ? {
          nom: "",
          prenom: "",
          email: "",
          dNaissance: "",
          telephone: "",
          adresse: "",
          genre: "",
        }
      : {
          nom: userInfo.fName,
          prenom: userInfo.lName,
          email: user.email,
          dNaissance: userInfo.birthDate,
          telephone: userInfo.phoneNumber,
          adresse: userInfo.address,
          genre: selectedValue,
        },
    onSubmit: handleUpdateUser,
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
          <UserForm
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
              User Info :
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
              User picture:
            </label>
            <img
              src={user?.picture}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full object-cover font-light"
            />
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Username:
            </label>
            <p className="text-gray-500 text-sm">
              {userInfo?.nom + " " + userInfo?.prenom}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Birthdate:
            </label>
            <p className="text-gray-500 text-sm">{userInfo?.dNaissance}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Gender
            </label>
            <p className="text-gray-500 text-sm">{userInfo.genre}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Phone number
            </label>
            <p className="mb-2 text-gray-500 text-sm">{userInfo?.telephone}</p>
          </div>
          <div>
            <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
              Address :
            </label>
            <p className="mb-2 text-gray-500 text-sm">{userInfo?.address}</p>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
