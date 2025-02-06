import { useRef, useState, useEffect } from "react";
import { API_LINK } from "../../util/Constants";
import AsyncSelect from "react-select/async";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Table from "../../part/Table";
import SweetAlert from "../../util/SweetAlert";

const inisialisasiDataKontributor = [
  {
    Key: null,
    No: null,
    "NPK/NIM": null,
    Nama: null,
    "Dept./Unit/Prodi": null,
    Count: 0,
  },
];

export default function SuratPerintahKerjaOperasionalGambarDetailKontributor({
  role,
  produk,
}) {
  const [dataKontributor, setDataKontributor] = useState(
    inisialisasiDataKontributor
  );

  const namaKontributorRef = useRef(null);

  useEffect(() => {
    GetDataKontributor();
  }, []);

  const loadOptions = async (inputValue, callback) => {
    const data = await GetListKontributor(inputValue);
    callback(data);
  };

  async function GetDataKontributor() {
    try {
      const data = await UseFetch(
        API_LINK + "SuratPerintahKerjaOperasional/GetDataKontributor",
        { idProduk: produk }
      );

      if (data === "ERROR") {
        throw new Error("Terjadi kesalahan: Gagal mengambil data kontributor.");
      } else if (data.length === 0) {
        setDataKontributor(inisialisasiDataKontributor);
      } else {
        const formattedData = data.map((value) => {
          const formattedValue = {
            ...value,
            Alignment: ["center", "center", "left", "left", "center"],
          };
          if (role === "ROL50") {
            formattedValue.Aksi = ["Delete"];
          }
          return formattedValue;
        });
        setDataKontributor(formattedData);
      }
    } catch (error) {
      SweetAlert("Error", error, "error");
    }
  }

  async function GetListKontributor(query) {
    try {
      const data = await UseFetch(
        API_LINK + "SuratPerintahKerjaOperasional/GetListKontributor",
        { param: query }
      );

      if (data === "ERROR") throw new Error();
      else return data;
    } catch {
      return null;
    }
  }

  async function handleAddKontributor() {
    if (namaKontributorRef.current.getValue().length !== 0) {
      try {
        const data = await UseFetch(
          API_LINK + "SuratPerintahKerjaOperasional/CreateKontributor",
          {
            idProduk: produk,
            kontributor: namaKontributorRef.current.getValue()[0].value,
          }
        );

        if (data === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal menyimpan nama kontributor."
          );
        } else {
          namaKontributorRef.current.clearValue();
          GetDataKontributor();
        }
      } catch (error) {
        SweetAlert("Error", error, "error");
      }
    }
  }

  async function handleDeleteKontributor(id) {
    try {
      const data = await UseFetch(
        API_LINK + "SuratPerintahKerjaOperasional/DeleteKontributor",
        { idKontributor: id }
      );

      if (data === "ERROR") {
        throw new Error("Terjadi kesalahan: Gagal menghapus kontributor.");
      } else {
        GetDataKontributor();
      }
    } catch (error) {
      SweetAlert("Error", error, "error");
    }
  }

  return (
    <>
      <div className="mt-3">
        <div className="card">
          <div className="card-header bg-secondary-subtle fw-bold">
            Kontributor
          </div>
          <div className="card-body p-4">
            <div className="row">
              {role === "ROL50" && (
                <>
                  <div className="col-lg-9 col-md-10 col-sm-9 col-8">
                    <AsyncSelect
                      loadOptions={loadOptions}
                      placeholder="-- Cari Kontributor --"
                      ref={namaKontributorRef}
                    />
                  </div>
                  <div className="col-lg-3 col-md-2 col-sm-3 col-4">
                    <Button
                      iconName="add"
                      classType="success mb-3 float-end"
                      label="Tambah"
                      onClick={handleAddKontributor}
                    />
                  </div>
                </>
              )}
              <div className="col-lg-12">
                <Table
                  data={dataKontributor}
                  onDelete={handleDeleteKontributor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
