import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";

function DeleteAlertDialog({
  label,
  isOpen,
  handleOpenDeleteModal,
  handleDelete,
}) {
  const cancelRef = useRef();

  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleOpenDeleteModal}
        isCentered={true}
        onEsc={handleOpenDeleteModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {label}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <button
                onClick={handleDelete}
                className="mr-2 text-white rounded-full py-1.5 px-5 md:py-1.5 md:px-5 bg-gradient-to-br hover:bg-gradient-to-r transition-all duration-300 from-red-500 to-red-700 hover:bg-blend-darken"
              >
                Proceed
              </button>
              <button
                ref={cancelRef}
                onClick={handleOpenDeleteModal}
                className="border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full py-1.5 px-5 md:py-1.5 md:px-5"
              >
                Cancel
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default DeleteAlertDialog;
