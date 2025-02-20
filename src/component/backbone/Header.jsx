import logo from "../../assets/IMG_Logo.png";
import { useEffect, useState, Suspense } from "react";

const Header = ({setToggleButton}) => {
  const [inputValue, setInputValue] = useState(""); 
  const [isHidden, setIsHidden] = useState(false);

  const handleDaftarClick = () => {
    setToggleButton("add");
    setIsHidden(true);
  };
  
  return (
    <div>
      <nav>
        <div className="">
          <img
            src={logo}
            alt="Logo ASTRAtech"
            title="Logo ASTRAtech"
            width="190px"
          />
        </div>

        <div className="btnlogindaftar">
          <div className="d-flex">
            <button
              className="daftar mt-2 mr-4"
              style={{
                backgroundColor: "#0A5EA8",
                color: "white",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                padding: "8px 25px",
                borderRadius: "12px",
                transition: "background-color 0.3s",
              }}
              onClick={handleDaftarClick}
            >
              Daftar
            </button>
          </div>
        </div>
      </nav>

    </div>
  );
};


export default Header;