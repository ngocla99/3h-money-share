import { AddBillForm } from "@/components/forms/add-bill-form";
import { Shell } from "@/components/shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewBill() {
  return (
    <Shell>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add Bill</CardTitle>
          <CardDescription>Add a new bill for your group</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBillForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
