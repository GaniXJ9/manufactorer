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
        breadcrumb: "Главная",
        title: "Главная",
      },
      children: [
        {
          path: "/profile",
          element: <Profile />,
          handle: {
            breadcrumb: "Профиль",
            title: "Профиль",
          },
        },
        {
          path: "/",
          element: <Main />,
          handle: {
            breadcrumb: "Главная",
            title: "Главная",
          },
        },
        {
          path: "/leads",
          element: <Leads />,
          handle: {
            breadcrumb: "Перевозки",
            title: "Перевозки",
          },
        },
        {
          path: "/leads/:id",
          element: <LeadDetails />,
          handle: {
            breadcrumb: "Перевозка",
            breadcrumbParents: [{ to: "/leads", label: "Перевозки" }],
            title: "Перевозки",
          },
        },
        {
          path: "/distributors",
          element: <Distributors />,
          handle: {
            breadcrumb: "Грузовладельцы и дистрибьюторы",
            title: "Грузовладельцы и дистрибьюторы",
          },
        },
      ],
    },
  ],
  {
    basename: "/manufacturer",
  },
);
