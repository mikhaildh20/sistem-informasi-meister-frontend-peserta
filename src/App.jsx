import { useState } from "react";

import Navbar from "./component/backbone/Header";
import Footer from "./component/backbone/Footer";
import PendaftaranPesertaMeister from "./component/page/pendaftaran-peserta/Root";


export default function App() {
  const [pageMode, setPageMode] = useState("index");
  const [toggleButton, setToggleButton] = useState(true); 

  const handlePageChange = (mode) => {
    setPageMode(mode);
    if (mode === "index") {
      setToggleButton(true);
    } else if (mode === "add") {
      setToggleButton(false);
    }
  };

  return (
    <div>
      <Navbar toggleButton={toggleButton} handlePageChange={handlePageChange} />
      <PendaftaranPesertaMeister
        pageMode={pageMode}
        setPageMode={setPageMode}
        handleToggleButton={setToggleButton} 
      />
      <Footer />
    </div>
  );
}