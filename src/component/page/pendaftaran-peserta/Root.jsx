import { useState, useEffect } from "react";
import PendaftaranPesertaMeisterIndex from "./Index";
import PendaftaranPesertaMeisterAdd from "./Add";

export default function PendaftaranPesertaMeister({
    pageMode,
    setPageMode,
    handleToggleButton,
    }) {
    useEffect(() => {
        if (pageMode === "index") {
        handleToggleButton(true); 
        } else if (pageMode === "add") {
        handleToggleButton(false); 
        }
    }, [pageMode, handleToggleButton]);

    function getPageMode() {
        switch (pageMode) {
        case "index":
            return <PendaftaranPesertaMeisterIndex onChangePage={setPageMode} />;
        case "add":
            return <PendaftaranPesertaMeisterAdd onChangePage={setPageMode} />;
        default:
            return null;
        }
    }

    return <div>{getPageMode()}</div>;
}