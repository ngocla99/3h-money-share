import { getMeApi } from "@/api/services/auth";
import { getGroupApi } from "@/api/services/group";
import { CreateGroupForm } from "@/components/forms/create-group-form";
import { MembersTableShell } from "@/components/shells/members-table-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { Settings, UserRound } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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
      <div className="flex w-[55rem]">
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
    <div className="max-w-60 py-9 px-6 border-r border-slate-300">
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

const MembersTab = () => {
  const { data: members } = useQuery({
    queryKey: ["group", "65f7b2f50421b8c39655f5d4"],
    queryFn: () => getGroupApi("65f7b2f50421b8c39655f5d4"),
    select: ({ data }) => {
      return data.members.map(({ userId, ...rest }) => ({
        ...rest,
        _id: userId._id,
        email: userId.email,
        name: userId.name,
      }));
    },
  });

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    select: ({ data }) => data,
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold">Members</h2>
      <p className="text-muted-foreground mt-2 mb-8">
        View and manage group members
      </p>
      <Tabs defaultValue="members" orientation="vertical">
        <TabsList variant="tab" className="">
          <TabsTrigger variant="tab" value="members">
            Members
          </TabsTrigger>
          <TabsTrigger variant="tab" value="invitations">
            Invitations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <MembersTableShell
            dataTable={{ data: members || [], pageCount: 1 }}
            user={user}
          />
        </TabsContent>
        <TabsContent value="invitations">Hello</TabsContent>
      </Tabs>
    </div>
  );
};

const SettingsTab = () => {
  return <div>Member Tab</div>;
};
