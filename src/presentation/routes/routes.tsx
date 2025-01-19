import CertificateAddPage from "@pages/certificate/CertificateAddPage";
import CertificateEditPage from "@pages/certificate/CertificateEditPage";
import CertificatePage from "@pages/certificate/CertificatePage";
import CustomerPage from "@pages/customer/CustomerPage";
import DashboardPage from "@pages/dashboard/DashboardPage";
import LoginPage from "@pages/login/LoginPage";
import MemoAddPage from "@pages/memo/MemoAddPage";
import MemoEditPage from "@pages/memo/MemoEditPage";
import MemoPage from "@pages/memo/MemoPage";
import MemoUpgradeCertificatePage from "@pages/memo/MemoUpgradeCertificatePage";
import MemoUpgradeOriginPage from "@pages/memo/MemoUpgradeOriginPage";
import TrashPage from "@pages/trash/TrashPage";

type TRoutes = { path: string; isAuth: boolean; element: JSX.Element }[];

const routes: TRoutes = [
  {
    path: "/",
    isAuth: false,
    element: <LoginPage />,
  },
  {
    path: "/login",
    isAuth: false,
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    isAuth: true,
    element: <DashboardPage />,
  },
  {
    path: "/certificate",
    isAuth: true,
    element: <CertificatePage />,
  },
  {
    path: "/certificate/add",
    isAuth: true,
    element: <CertificateAddPage />,
  },
  {
    path: "/certificate/edit/:id",
    isAuth: true,
    element: <CertificateEditPage />,
  },
  {
    path: "/memo",
    isAuth: true,
    element: <MemoPage />,
  },
  {
    path: "/memo/edit/:id",
    isAuth: true,
    element: <MemoEditPage />,
  },
  {
    path: "/memo/upgrade/certificate/:id",
    isAuth: true,
    element: <MemoUpgradeCertificatePage />,
  },
  {
    path: "/memo/upgrade/memo-origin/:id",
    isAuth: true,
    element: <MemoUpgradeOriginPage />,
  },
  {
    path: "/memo/add",
    isAuth: true,
    element: <MemoAddPage />,
  },
  {
    path: "/customer",
    isAuth: true,
    element: <CustomerPage />,
  },
  {
    path: "/trash",
    isAuth: true,
    element: <TrashPage />,
  },
];

export default routes;
