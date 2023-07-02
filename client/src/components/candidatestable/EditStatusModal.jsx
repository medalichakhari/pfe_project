import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { UpdateCandidature } from "../../lib/fetch";
import { useTranslation } from "react-i18next";

function EditStatusModal({ isOpen, handleOpenModal, candidacy, refetch }) {
  const { t } = useTranslation();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { token } = useAuth();
  const handleChangeStatus = (values, actions) => {
    let candidatureData = {
      etat: values.status,
      userId: candidacy.candidat?.userId,
      message: `Your candidacy to ${candidacy.offre?.titre} has been ${values.status}`,
    };
    UpdateCandidature(candidacy.id, candidatureData, token)
      .then((res) => {
        console.log(res);
        refetch();
        handleOpenModal();
      })
      .catch((err) => {
        console.log(err);
      });
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
      status: "",
    },
    onSubmit: handleChangeStatus,
  });
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleOpenModal}
        isCentered={true}
        onEsc={handleOpenModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("editStatusModal.candidacyStatus")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                {t("editStatusModal.changeStatus")}
              </label>
              <select
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="status"
                id="status"
                placeholder="Please select your status"
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="flex flex-row-reverse">
                <button
                  onClick={handleOpenModal}
                  className="ml-2 text-white rounded-full py-1.5 px-5 md:py-1.5 md:px-5 bg-gradient-to-br hover:bg-gradient-to-r transition-all duration-300 from-red-500 to-red-700 hover:bg-blend-darken"
                >
                  {t("cancel")}
                </button>
                <PrimaryButton type="submit">{t("save")}</PrimaryButton>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditStatusModal;
