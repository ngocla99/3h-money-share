import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import Routes from "@/routes";

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
