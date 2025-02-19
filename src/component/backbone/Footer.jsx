import logo from "../../assets/IMG_Logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
    return (
        <footer>
        <div className="footer-container">
            <div>
            <img src={logo} alt="ASTRAtech logo" width="150" />
            <p style={{marginTop: "15px"}}>
                <strong >Alamat</strong>
            </p>
            <p>
                <strong>Kampus Cikarang:</strong> Jl. Gaharu Blok F3 Delta Silicon II Cibatu, Cikarang Selatan Kota Bekasi Jawa Barat 17530
            </p>
            <p>
                <strong>Kampus Sunter:</strong> PT Astra International Tbk Komplek B Lantai 5 Jl. Gaya Motor Raya No.8, Sunter II North Jakarta 14330
            </p>
            </div>
            <div>
            <p>
                <strong>Kontak</strong>
            </p>
            <p>+62 21 5022 7222</p>
            <p>+62 21 6519 555</p>
            <p>+62 878 7177 6117 (WhatsApp)</p>
            <p>
                <a href="mailto:sekretariat@polytechnic.astra.ac.id">
                sekretariat@polytechnic.astra.ac.id
                </a>
            </p>
            </div>
            <div className="social-icons">
            <a href="https://www.instagram.com/astrapolytechnic/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@AstraTechChannel" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
            </a>
            </div>
        </div>
        <div className="footer-bottom">
            <strong>Copyright © 2024 - Mike & Aurelio</strong>
        </div>
        </footer>
    );
}