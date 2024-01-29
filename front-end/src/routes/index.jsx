import { ErrorBoundary } from "@/components/error-boundary";
import { AppLayout } from "@/layout";
import SignIn from "@/pages/auth/signin";
import SignOut from "@/pages/auth/signout";
import SignUp from "@/pages/auth/signup";
import Home from "@/pages/home";
import Groups from "@/pages/groups";
import { useAuth } from "@/providers/auth-provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import NewBill from "@/pages/bills/new-bill";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "*",
      element: <div>Page not found</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <AppLayout>
          <ProtectedRoute />
        </AppLayout>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/bills/new",
          element: <NewBill />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/signout",
          element: <SignOut />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
