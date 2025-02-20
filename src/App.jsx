import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./component/backbone/Header";
import Root from "./component/page/pendaftaran-peserta/Root.jsx";
import Footer from "./component/backbone/Footer";


export default function App() {
  const [toggleButton, setToggleButton] = useState("");

  return (
    <BrowserRouter>
      <Navbar />
      <Root />
      <Footer />
    </BrowserRouter>
  );
}
