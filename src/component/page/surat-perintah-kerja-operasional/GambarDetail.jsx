import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { decryptId } from "../../util/Encryptor";
import { API_LINK } from "../../util/Constants";
import UseFetch from "../../util/UseFetch";
import UploadFile from "../../util/UploadFile";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";
import FileUpload from "../../part/FileUpload";
import SweetAlert from "../../util/SweetAlert";
import GambarDetailCard from "./GambarDetailCard";
import GambarDetailKontributor from "./GambarDetailKontributor";

export default function SuratPerintahKerjaOperasionalGambarDetail({
  onChangePage,
  withID,
}) {
  const role = JSON.parse(decryptId(Cookies.get("activeUser"))).role;
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [dataGambar, setDataGambar] = useState([]);

  const fileGambarRef = useRef(null);

  const handleFileChange = (ref, extAllowed) => {
    const file = ref.current.files[0];
    const fileName = file.name;
    const fileSize = file.size;
    const fileExt = fileName.split(".").pop().toLowerCase();
    let error = "";

    if (fileSize / 1024576 > 10) error = "Berkas gambar detail terlalu besar";
    else if (!extAllowed.split(",").includes(fileExt))
      error = "Format berkas gambar detail tidak valid";

    if (error) {
      ref.current.value = "";
      SweetAlert("Error", error, "error");
    }
  };

  async function handleAddFile() {
    if (fileGambarRef.current.value === "")
      SweetAlert(
        "Error",
        "Mohon pilih berkas gambar detail terlebih dahulu",
        "error"
      );
    else {
      setIsLoading(true);

      try {
        let fileUploaded;

        await UploadFile(fileGambarRef.current).then(
          (data) => (fileUploaded = data.Hasil)
        );

        const data = await UseFetch(
          API_LINK + "SuratPerintahKerjaOperasional/CreateGambarDetail",
          { id: withID.idProduk, gambar: fileUploaded }
        );

        if (data === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal menyimpan data gambar detail."
          );
        } else {
          SweetAlert(
            "Sukses",
            "Data gambar detail berhasil disimpan",
            "success"
          );
          await handleLoadGambarDetail();
        }
      } catch (error) {
        SweetAlert("Error", error, "error");
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleLoadGambarDetail() {
    const data = await UseFetch(
      API_LINK + "SuratPerintahKerjaOperasional/GetDataGambarDetail",
      { id: withID.idProduk }
    );

    if (data === "ERROR") {
      throw new Error("Terjadi kesalahan: Gagal mengambil data gambar detail.");
    } else {
      setDataGambar(data);
    }
  }

  async function handleDelete(id) {
    const result = await SweetAlert(
      "Hapus Gambar Detail",
      "Apakah Anda yakin ingin menghapus data gambar detail ini?",
      "warning",
      "Ya, saya yakin!"
    );

    if (result) {
      setIsLoading(true);

      try {
        UseFetch(
          API_LINK + "SuratPerintahKerjaOperasional/DeleteGambarDetail",
          {
            idGambar: id,
          }
        )
          .then((data) => {
            if (data === "ERROR" || data.length === 0) {
              SweetAlert("Error", "Gambar detail gagal dihapus", "error");
            } else {
              SweetAlert(
                "Sukses",
                "Data gambar detail berhasil dihapus",
                "success"
              );
              handleLoadGambarDetail();
            }
          })
          .then(() => setIsLoading(false));
      } catch {
        SweetAlert("Error", "Gambar detail gagal dihapus", "error");
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        await handleLoadGambarDetail();
      } catch (error) {
        window.scrollTo(0, 0);
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <div className="card">
        <div className="card-header bg-primary fw-medium text-white">
          Gambar Detail Produk
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-3">
              <Label
                forLabel="nomorRegistrasiSPK"
                title="Nomor SPK"
                data={withID.nomorRegistrasiSPK}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="namaPelanggan"
                title="Nama Pelanggan"
                data={withID.namaPelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="namaProduk"
                title="Nama Produk"
                data={withID.namaProduk}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="kategori"
                title="Kategori"
                data={withID.kategori}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-12">
                      {dataGambar.length > 0 &&
                        dataGambar.map((data, index) => {
                          return (
                            <GambarDetailCard
                              data={data}
                              role={role}
                              onDelete={handleDelete}
                              key={index}
                            />
                          );
                        })}
                      {dataGambar.length === 0 && (
                        <div className="border p-2 mt-3 mb-2 rounded border border-secondary-subtle fw-bold bg-secondary-subtle text-center">
                          Tidak ada gambar detail
                        </div>
                      )}
                    </div>
                    {role === "ROL50" && (
                      <div className="col-lg-12 px-4 py-1 mt-3">
                        <div className="row border rounded p-3">
                          <div className="col-lg-12">
                            <FileUpload
                              forInput="berkasGambar"
                              label="Berkas Gambar Detail (.jpg, .png, .pdf)"
                              formatFile=".jpg,.png,.pdf"
                              ref={fileGambarRef}
                              onChange={() =>
                                handleFileChange(fileGambarRef, "jpg,png,pdf")
                              }
                            />
                          </div>
                          <div className="col-lg-12">
                            <Button
                              iconName="add"
                              classType="success mb-2 w-100"
                              label="Tambah Gambar Detail"
                              onClick={handleAddFile}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <GambarDetailKontributor
                    role={role}
                    produk={withID.idProduk}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-end my-4 mx-1">
        <Button
          classType="secondary px-4 py-2"
          label="KEMBALI"
          onClick={() => onChangePage("detailEksternal", withID.idSPK)}
        />
      </div>
    </>
  );
}
