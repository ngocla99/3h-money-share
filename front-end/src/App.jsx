import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import Routes from "@/routes";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
