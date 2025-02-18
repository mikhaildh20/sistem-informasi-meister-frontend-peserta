import { useState } from "react";
import PendaftaranPesertaMeisterIndex from "./Index";
import PendaftaranPesertaMeisterAdd from "./Add";

export default function PendaftaranPesertaMeister() {
    const [pageMode, setPageMode] = useState("index");

    function getPageMode() {
        switch (pageMode) {
        case "index":
            return <PendaftaranPesertaMeisterIndex onChangePage={handleSetPageMode} />;
        case "add":
            return <PendaftaranPesertaMeisterAdd onChangePage={handleSetPageMode} />;
        }
    }

    function handleSetPageMode(mode) {
        setPageMode(mode);
    }

    return <div>{getPageMode()}</div>;
}
