import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import Routes from "@/routes";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
