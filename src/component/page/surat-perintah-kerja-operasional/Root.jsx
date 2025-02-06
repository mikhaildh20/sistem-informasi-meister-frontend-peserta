import { useState } from "react";
import SuratPerintahKerjaOperasionalIndex from "./Index";
import SuratPerintahKerjaOperasionalDetailEksternal from "./DetailEksternal";
import SuratPerintahKerjaOperasionalDetailInternal from "./DetailInternal";
import SuratPerintahKerjaOperasionalGambarDetail from "./GambarDetail";
import SuratPerintahKerjaOperasionalScheduling from "./Scheduling";

export default function SuratPerintahKerjaOperasional() {
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return (
          <SuratPerintahKerjaOperasionalIndex
            onChangePage={handleSetPageMode}
          />
        );
      case "detailEksternal":
        return (
          <SuratPerintahKerjaOperasionalDetailEksternal
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      case "detailInternal":
        return (
          <SuratPerintahKerjaOperasionalDetailInternal
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      case "gambarDetail":
        return (
          <SuratPerintahKerjaOperasionalGambarDetail
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      case "scheduling":
        return (
          <SuratPerintahKerjaOperasionalScheduling
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
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
