import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Button, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import PrimaryButton from "../buttons/PrimaryButton";
function EditStatusModal({ isOpen, handleOpenModal }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleChangeStatus = (values, actions) => {
    console.log("values", values);
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Change application status :
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
                <option value="">Select application status</option>
                <option value="T1">Pending</option>
                <option value="T2">Accepted</option>
                <option value="T3">Refused</option>
              </select>
              <div className="flex flex-row-reverse">
                <Button onClick={handleOpenModal}>Cancel</Button>
                <PrimaryButton type="submit">Save</PrimaryButton>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditStatusModal;
