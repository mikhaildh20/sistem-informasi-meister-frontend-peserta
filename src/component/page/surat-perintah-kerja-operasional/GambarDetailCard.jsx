import { FILE_LINK } from "../../util/Constants";

export default function SuratPerintahKerjaOperasionalGambarDetailCard({
  data,
  role,
  onDelete,
}) {
  return (
    <>
      <div className="mt-3">
        <div className="card">
          <div className="card-header bg-secondary-subtle fw-bold">
            Gambar #{data.nomor}
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-12">
                {data.berkas.split(".").pop().toLowerCase() === "pdf" && (
                  <div className="text-center fw-bold my-3">
                    Tidak ada pratinjau untuk berkas PDF.
                    <br />
                    Silakan klik tombol Lihat/Unduh.
                  </div>
                )}
                {data.berkas.split(".").pop().toLowerCase() !== "pdf" && (
                  <img
                    className="w-100"
                    src={FILE_LINK + data.berkas}
                    alt="Gambar Detail"
                  />
                )}
              </div>
              <div className={role === "ROL50" ? "col-lg-6" : "col-lg-12"}>
                <div className="w-100 border rounded-2 border-1 bg-primary px-2 py-1 mt-3 text-center">
                  <a
                    href={FILE_LINK + data.berkas}
                    className="text-decoration-none fw-bold text-white"
                    target="_blank"
                  >
                    Lihat/Unduh
                  </a>
                </div>
              </div>
              {role === "ROL50" && (
                <div className="col-lg-6">
                  <div className="w-100 border rounded-2 border-1 bg-danger px-2 py-1 mt-3 text-center">
                    <div
                      className="text-decoration-none fw-bold text-white"
                      onClick={() => onDelete(data.key)}
                      style={{ cursor: "pointer" }}
                    >
                      Hapus
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
