import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Settings, UserRound } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { MembersTab } from "./members-tab";

const ManageGroupModalHelper = ({
  showManageGroupModal,
  setShowManageGroupModal,
}) => {
  return (
    <Modal
      className="p-0"
      showModal={showManageGroupModal}
      setShowModal={setShowManageGroupModal}
    >
      <div className="flex w-[60rem]">
        <ManageSidebar />
        <ManageView />
      </div>
    </Modal>
  );
};

export const useManageGroupModal = () => {
  const [showManageGroupModal, setShowManageGroupModal] = useState(false);

  const ManageGroupModal = useCallback(() => {
    return (
      <ManageGroupModalHelper
        showManageGroupModal={showManageGroupModal}
        setShowManageGroupModal={setShowManageGroupModal}
      />
    );
  }, [showManageGroupModal, setShowManageGroupModal]);

  return useMemo(
    () => ({ showManageGroupModal, setShowManageGroupModal, ManageGroupModal }),
    [showManageGroupModal, setShowManageGroupModal, ManageGroupModal]
  );
};

const ManageSidebar = () => {
  return (
    <div className="min-w-52 py-9 px-6 border-r border-border">
      <div className="ml-2 mb-4 flex gap-4 items-center">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">Group name</p>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start gap-4 text-muted-foreground hover:text-accent-foreground"
      >
        <UserRound className="size-4" /> Members
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-4 text-muted-foreground hover:text-accent-foreground"
      >
        <Settings className="size-4" /> Settings
      </Button>
    </div>
  );
};

const ManageView = () => {
  return (
    <div className="w-full py-9 px-6">
      <MembersTab />
    </div>
  );
};
