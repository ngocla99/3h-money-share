import { Button } from "@/components/ui/button";
import { redirect } from "react-router-dom";

const Home = () => {
  return (
    <Button
      onClick={() => {
        return redirect("/login");
      }}
    >
      Go to Login
    </Button>
  );
};

export default Home;
