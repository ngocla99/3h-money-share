import { CreateGroupForm } from "@/components/forms/create-group-form";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useCallback, useMemo, useState } from "react";

const CreateGroupModalHelper = ({
  showCreateGroupModal,
  setShowCreateGroupModal,
}) => {
  return (
    <Modal
      showModal={showCreateGroupModal}
      setShowModal={setShowCreateGroupModal}
    >
      <>
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>
            Spread the word and gather your community!
          </DialogDescription>
        </DialogHeader>
        <CreateGroupForm setShowModal={setShowCreateGroupModal} />
      </>
    </Modal>
  );
};

export const useCreateGroupModal = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const CreateGroupModal = useCallback(() => {
    return (
      <CreateGroupModalHelper
        showCreateGroupModal={showCreateGroupModal}
        setShowCreateGroupModal={setShowCreateGroupModal}
      />
    );
  }, [showCreateGroupModal, setShowCreateGroupModal]);

  return useMemo(
    () => ({ showCreateGroupModal, setShowCreateGroupModal, CreateGroupModal }),
    [showCreateGroupModal, setShowCreateGroupModal, CreateGroupModal]
  );
};
