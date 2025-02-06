import { lazy } from "react";

const Beranda = lazy(() => import("../page/beranda/Root"));
const MasterAlatMesin = lazy(() => import("../page/master-alat-mesin/Root"));

const routeList = [
  {
    path: "/",
    element: <Beranda />,
  },
  {
    path: "/master_alat_mesin",
    element: <MasterAlatMesin />,
  },
];

export default routeList;
