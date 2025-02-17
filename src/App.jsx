import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BASE_ROUTE, ROOT_LINK } from "./component/util/Constants";
import CreateMenu from "./component/util/CreateMenu";
import CreateRoute from "./component/util/CreateRoute.jsx";

import Navbar from "./component/backbone/Header";
import Form from "./component/page/pendaftaran-peserta/Add.jsx";
import Beranda from "./component/page/pendaftaran-peserta/Index.jsx";
import Footer from "./component/backbone/Footer";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/daftar" element={<Form />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
