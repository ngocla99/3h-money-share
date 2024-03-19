import { Plus, Settings2 } from "lucide-react";
import { Icons } from "./icons";
import { useCreateGroupModal } from "./modals/group/create-group-modal";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
} from "./ui/navigation-menu";

export const GroupSwitcher = () => {
  const { setShowCreateGroupModal, CreateGroupModal } = useCreateGroupModal();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Group</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <div className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
              <Icons.logo className="size-6" aria-hidden="true" />
              <div className="mb-2 mt-4 text-lg font-medium">Group Name</div>
              <p className="text-sm leading-tight text-muted-foreground">
                Group description
              </p>
              <span className="sr-only">Group</span>
            </div>
          </li>
          <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-sm font-medium leading-none flex">
                  <Settings2 className="mr-2 size-4" />
                  Manage Group
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Edit Group</DialogHeader>
              </DialogContent>
            </Dialog>
          </li>
          <li className="block select-none space-y-1 p-3 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus-text-accent-foreground">
            <button
              className="text-sm font-medium leading-none flex"
              onClick={() => setShowCreateGroupModal(true)}
            >
              <Plus className="mr-2 size-4" />
              Create Group
            </button>
          </li>
        </ul>
      </NavigationMenuContent>
      <CreateGroupModal />
    </NavigationMenuItem>
  );
};