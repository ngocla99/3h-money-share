import { Modal } from "@/components/ui/modal";
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
      <div>
        <div className="flex flex-col items-center justify-center gap-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
          <h3 className="text-lg font-medium">Download QR Code</h3>
        </div>
        <button>Close</button>
      </div>
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
