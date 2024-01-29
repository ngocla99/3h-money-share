// https://dribbble.com/shots/23157756-Management-Dashboard-Teams-List
// https://dribbble.com/shots/23145133-Contact-Modal

import { GroupsTableShell } from "@/components/shells/groups-table-shell";
import { Shell } from "@/components/shells/shell";

const data = {
  data: [
    {
      name: "Ngoc",
      email: "nemo@gmail.com",
      phone: "0975471213",
      status: "Online",
    },
  ],
  pageCount: 2,
};

const Groups = () => {
  return (
    <Shell>
      <GroupsTableShell dataTable={data} />
    </Shell>
  );
};

export default Groups;
