import { useState } from "react";
import PermintaanPembelianIndex from "./Index";
import PermintaanPembelianAdd from "./Add";
// import PermintaanPembelianDetail from "./Detail";
// import PermintaanPembelianEdit from "./Edit";

export default function PermintaanPembelian() {
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return <PermintaanPembelianIndex onChangePage={handleSetPageMode} />;
      case "add":
        return <PermintaanPembelianAdd onChangePage={handleSetPageMode} />;
      // case "detail":
      //   return (
      //     <PermintaanPembelianDetail
      //       onChangePage={handleSetPageMode}
      //       withID={dataID}
      //     />
      //   );
      // case "edit":
      //   return (
      //     <PermintaanPembelianEdit
      //       onChangePage={handleSetPageMode}
      //       withID={dataID}
      //     />
      //   );
    }
  }

  function handleSetPageMode(mode) {
    setPageMode(mode);
  }

  function handleSetPageMode(mode, withID) {
    setDataID(withID);
    setPageMode(mode);
  }

  return <div>{getPageMode()}</div>;
}
