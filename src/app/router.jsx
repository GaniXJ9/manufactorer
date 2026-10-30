import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/app-layout";
import Main from "../pages/main";
import Leads from "../pages/leads";
import Distributors from "../pages/distributors";
import LeadDetails from "../pages/leads/lead-details";
import Profile from "../pages/profile";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        // <AuthGuard>
        <AppLayout />
        // </AuthGuard>
      ),
      handle: {
        breadcrumb: "nav.home",
        title: "nav.home",
      },
      children: [
        {
          path: "/profile",
          element: <Profile />,
          handle: {
            breadcrumb: "nav.profile",
            title: "nav.profile",
          },
        },
        {
          path: "/",
          element: <Main />,
          handle: {
            breadcrumb: "nav.home",
            title: "nav.home",
          },
        },
        {
          path: "/leads",
          element: <Leads />,
          handle: {
            breadcrumb: "nav.leads",
            title: "nav.leads",
          },
        },
        {
          path: "/leads/:id",
          element: <LeadDetails />,
          handle: {
            breadcrumb: "nav.lead",
            breadcrumbParents: [{ to: "/leads", label: "nav.leads" }],
            title: "nav.leads",
          },
        },
        {
          path: "/distributors",
          element: <Distributors />,
          handle: {
            breadcrumb: "nav.partners",
            title: "nav.partners",
          },
        },
      ],
    },
  ],
  {
    basename: "/manufacturer",
  },
);
