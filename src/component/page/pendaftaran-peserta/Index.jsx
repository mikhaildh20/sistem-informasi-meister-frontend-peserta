import "chart.js/auto";
import "../../../Beranda.css";
import mahasiswa from "../../../assets/mahasiswa.png";
import KampusMerdeka from "../../../assets/KampusMerdeka.png";
import SatuMerdeka from "../../../assets/SatuMerdeka.png";
import ASTRAtech from "../../../assets/ASTRAtech.png";
import iconAstra from "../../../assets/iconAstra.png";
import { useNavigate } from "react-router-dom";

export default function BerandaIndex() {
    const navigate = useNavigate();  

    return (
        <div className="meister-container">
        {/* Hero Section */}
        <section className="sec1">
            <div className="ucapan">
            <h1>Tingkatkan Kompetensimu dengan Program Meister</h1>
            <p>
                Dapatkan sertifikasi German Bachelor Professional (Meister) bidang otomotif. Daftar sekarang dan raih sertifikasi internasional pertama di Asia!
            </p>
            <button onClick={() => navigate("/daftar")}>Daftar Sekarang</button>
            </div>
            <div className="imgDatang">
            <img className="mahasiswa" src={mahasiswa} alt="Ilustrasi Mahasiswa" />
            </div>
        </section>

        {/* Partner Logos Section */}
        <section className="sec6">
            <div className="partners">
            <img className="ASTRAtech" src={ASTRAtech} alt="Logo AstraTech" />
            <img className="KampusMerdeka" src={KampusMerdeka} alt="Logo Kampus Merdeka" />
            <img className="SatuIndonesia" src={SatuMerdeka} alt="Logo Satu Indonesia" />
            </div>
        </section>

        {/* AstraTech Information Section */}
        <section className="sec4">
            <h4>Ingin tahu lebih banyak tentang ASTRAtech?</h4>
            <p>
            Kunjungi website resmi kami dan temukan berbagai informasi menarik tentang ASTRAtech, termasuk program unggulan, inovasi terbaru, dan komitmen kami terhadap masa depan pendidikan.
            </p>
            <div>
            <button onClick={() => window.open("https://www.polytechnic.astra.ac.id/tentang/", "_blank")}>
                Tentang ASTRAtech
            </button>
            </div>
        </section>
        </div>
    );
}