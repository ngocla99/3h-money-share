import { getMeApi } from "@/api/services/auth";
import { getGroupApi } from "@/api/services/group";
import { InvitationsTableShell } from "@/components/shells/invitations-table-shell";
import { MembersTableShell } from "@/components/shells/members-table-shell";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

export const MembersTab = () => {
  const { data: group } = useQuery({
    queryKey: ["group", "65f7b2f50421b8c39655f5d4"],
    queryFn: () => getGroupApi("65f7b2f50421b8c39655f5d4"),
    select: ({ data }) => data,
  });

  const members = group.members.map(({ userId, ...rest }) => ({
    ...rest,
    _id: userId._id,
    email: userId.email,
    name: userId.name,
  }));

  const invitedMembers = group.pendingInvitations;

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
          <ScrollArea className="h-[500px]">
            <MembersTableShell
              dataTable={{ data: members || [], pageCount: 1 }}
              user={user}
            />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="invitations">
          <ScrollArea className="h-[500px]">
            <div className="flex items-center justify-between mt-8">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Individual invitations</h3>
                <p className="text-sm text-muted-foreground">
                  Manually invite members and manage existing invitations.
                </p>
              </div>
              <Button>
                <UserPlus className="size-4 mr-2" />
                Invite
              </Button>
            </div>
            <InvitationsTableShell
              dataTable={{ data: invitedMembers || [], pageCount: 1 }}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
