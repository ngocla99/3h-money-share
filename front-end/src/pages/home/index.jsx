import { getBillsApi } from "@/api/services/bill";
import { BillsTableShell } from "@/components/shells/bills-table-shell";
import { Shell } from "@/components/shells/shell";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: bills } = useQuery({
    queryKey: ["bills"],
    queryFn: getBillsApi,
    select: ({ data }) =>
      data.map((el, idx) => ({
        ...el,
        category: "Food",
        status: "pending",
      })),
  });

  return (
    <Shell>
      <BillsTableShell dataTable={{ data: bills ?? [], pageCount: 1 }} />
    </Shell>
  );
};

export default Home;
