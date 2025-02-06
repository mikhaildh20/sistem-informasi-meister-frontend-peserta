import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { decryptId } from "../../util/Encryptor";
import { PAGE_SIZE, API_LINK } from "../../util/Constants";
import { formatDate } from "../../util/Formatting";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Input from "../../part/Input";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import Filter from "../../part/Filter";
import DropDown from "../../part/Dropdown";
import Alert from "../../part/Alert";
import Loading from "../../part/Loading";
import SweetAlert from "../../util/SweetAlert";

const inisialisasiDataEksternal = [
  {
    Key: null,
    No: null,
    "No. SPK": null,
    "No. Referensi": null,
    "Nama Pelanggan": null,
    "Target Pengiriman": null,
    Progres: null,
    "Tanggal Buat": null,
    Status: null,
    Count: 0,
  },
];

const inisialisasiDataInternal = [
  {
    Key: null,
    No: null,
    "No. SPK": null,
    "No. Referensi": null,
    "Nama Pelanggan": null,
    "Target Selesai": null,
    Progres: null,
    "Persetujuan PPIC": null,
    "Persetujuan Kajur": null,
    "Tanggal Buat": null,
    Status: null,
    Count: 0,
  },
];

const dataFilterSortEksternal = [
  { Value: "[Tanggal Buat2] asc", Text: "Tanggal Buat [↑]" },
  { Value: "[Tanggal Buat2] desc", Text: "Tanggal Buat [↓]" },
  { Value: "[Nama Pelanggan] asc", Text: "Nama Pelanggan [↑]" },
  { Value: "[Nama Pelanggan] desc", Text: "Nama Pelanggan [↓]" },
  { Value: "[Target Pengiriman] asc", Text: "Target Pengiriman [↑]" },
  { Value: "[Target Pengiriman] desc", Text: "Target Pengiriman [↓]" },
  { Value: "[Progres] asc", Text: "Progres [↑]" },
  { Value: "[Progres] desc", Text: "Progres [↓]" },
];

const dataFilterSortInternal = [
  { Value: "[Tanggal Buat2] asc", Text: "Tanggal Buat [↑]" },
  { Value: "[Tanggal Buat2] desc", Text: "Tanggal Buat [↓]" },
  { Value: "[Nama Pelanggan] asc", Text: "Nama Pelanggan [↑]" },
  { Value: "[Nama Pelanggan] desc", Text: "Nama Pelanggan [↓]" },
  { Value: "[Target Selesai] asc", Text: "Target Selesai [↑]" },
  { Value: "[Target Selesai] desc", Text: "Target Selesai [↓]" },
  { Value: "[Progres] asc", Text: "Progres [↑]" },
  { Value: "[Progres] desc", Text: "Progres [↓]" },
];

const dataFilterStatusEksternal = [
  { Value: "Belum Dikonversi", Text: "Belum Dikonversi" },
  { Value: "Belum Dibuat Penjadwalan", Text: "Belum Dibuat Penjadwalan" },
  { Value: "Sudah Dibuat Penjadwalan", Text: "Sudah Dibuat Penjadwalan" },
  { Value: "Dalam Proses Produksi", Text: "Dalam Proses Produksi" },
  { Value: "Selesai", Text: "Selesai" },
];

const dataFilterStatusInternal = [
  { Value: "Menunggu Persetujuan", Text: "Menunggu Persetujuan" },
  { Value: "Belum Dibuat Penjadwalan", Text: "Belum Dibuat Penjadwalan" },
  { Value: "Sudah Dibuat Penjadwalan", Text: "Sudah Dibuat Penjadwalan" },
  { Value: "Dalam Proses Produksi", Text: "Dalam Proses Produksi" },
  { Value: "Batal", Text: "Batal" },
  { Value: "Selesai", Text: "Selesai" },
];

export default function SuratPerintahKerjaOperasionalIndex({ onChangePage }) {
  const role = JSON.parse(decryptId(Cookies.get("activeUser"))).role;
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDataEksternal, setCurrentDataEksternal] = useState(
    inisialisasiDataEksternal
  );
  const [currentDataInternal, setCurrentDataInternal] = useState(
    inisialisasiDataInternal
  );
  const [currentFilterEksternal, setCurrentFilterEksternal] = useState({
    page: 1,
    query: "",
    sort: "[Tanggal Buat2] desc",
    status: "",
    role: role,
  });
  const [currentFilterInternal, setCurrentFilterInternal] = useState({
    page: 1,
    query: "",
    sort: "[Tanggal Buat2] desc",
    status: "",
    role: role,
  });

  const searchQueryEksternal = useRef();
  const searchQueryInternal = useRef();
  const searchFilterSortEksternal = useRef();
  const searchFilterSortInternal = useRef();
  const searchFilterStatusEksternal = useRef();
  const searchFilterStatusInternal = useRef();

  function handleSetCurrentPageEksternal(newCurrentPage) {
    setIsLoading(true);
    setCurrentFilterEksternal((prevFilter) => {
      return {
        ...prevFilter,
        page: newCurrentPage,
      };
    });
  }

  function handleSetCurrentPageInternal(newCurrentPage) {
    setIsLoading(true);
    setCurrentFilterInternal((prevFilter) => {
      return {
        ...prevFilter,
        page: newCurrentPage,
      };
    });
  }

  function handleSearchEksternal() {
    setIsLoading(true);
    setCurrentFilterEksternal((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
        query: searchQueryEksternal.current.value,
        sort: searchFilterSortEksternal.current.value,
        status: searchFilterStatusEksternal.current.value,
      };
    });
  }

  function handleSearchInternal() {
    setIsLoading(true);
    setCurrentFilterInternal((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
        query: searchQueryInternal.current.value,
        sort: searchFilterSortInternal.current.value,
        status: searchFilterStatusInternal.current.value,
      };
    });
  }

  async function handleKonversi(id) {
    const result = await SweetAlert(
      "Konversi Nomor Referensi ke Nomor SPK Eksternal (Eks YYYY-XXX)",
      "Nomor surat perintah kerja (SPK) eksternal akan dibuat, dan nomor ini akan menjadi referensi untuk tim produksi selanjutnya. Apakah Anda yakin ingin melakukan konversi?",
      "info",
      "Ya, saya yakin!"
    );

    if (result) {
      setIsLoading(true);
      setIsError(false);
      UseFetch(
        API_LINK +
          "SuratPerintahKerjaOperasional/KonversiSuratPerintahKerjaEksternal",
        {
          idSPK: id,
          role: role,
        }
      )
        .then((data) => {
          if (data === "ERROR" || data.length === 0) setIsError(true);
          else {
            SweetAlert(
              "Sukses",
              "Nomor surat perintah kerja berhasil dikonversi",
              "success"
            );
            handleSetCurrentPageEksternal(currentFilterEksternal.page);
          }
        })
        .then(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const data1 = await UseFetch(
          API_LINK +
            "SuratPerintahKerjaOperasional/GetDataSuratPerintahKerjaEksternal",
          currentFilterEksternal
        );

        if (data1 === "ERROR") {
          setIsError(true);
        } else if (data1.length === 0) {
          setCurrentDataEksternal(inisialisasiDataEksternal);
        } else {
          const formattedData = data1.map((value) => ({
            ...value,
            "Target Pengiriman": formatDate(value["Target Pengiriman"], true),
            "Tanggal Buat": formatDate(value["Tanggal Buat"], true),
            Aksi: [
              {
                IconName: "overview",
                Title: "Lihat Detail",
                Function: () => {
                  onChangePage("detailEksternal", value["Key"]);
                },
              },
              role === "ROL18" && ["Belum Dikonversi"].includes(value["Status"])
                ? {
                    IconName: "shuffle",
                    Title: "Konversi Nomor Referensi ke Nomor SPK Eksternal",
                    Function: () => {
                      handleKonversi(value["Key"]);
                    },
                  }
                : "",
              [
                "Belum Dibuat Penjadwalan",
                "Sudah Dibuat Penjadwalan",
                "Dalam Proses Produksi",
                "Selesai",
              ].includes(value["Status"])
                ? {
                    IconName: "calendar-clock",
                    Title:
                      (role === "ROL18" ? "Buat/Lihat" : "Lihat") +
                      " Penjadwalan Produksi",
                    Function: () => {
                      onChangePage("scheduling", value["Key"]);
                    },
                  }
                : "",
            ],
            Alignment: [
              "center",
              "center",
              "center",
              "left",
              "center",
              "center",
              "center",
              "center",
              "center",
            ],
          }));
          setCurrentDataEksternal(formattedData);
        }

        setCurrentDataInternal(inisialisasiDataInternal); // SEMENTARA

        // const data2 = await UseFetch(
        //   API_LINK +
        //     "SuratPerintahKerjaOperasional/GetDataSuratPerintahKerjaInternal",
        //   currentFilterInternal
        // );

        // if (data2 === "ERROR") {
        //   setIsError(true);
        // } else if (data2.length === 0) {
        //   setCurrentDataInternal(inisialisasiDataInternal);
        // } else {
        //   const formattedData = data2.map((value) => ({
        //     ...value,
        //     "Target Selesai": formatDate(value["Target Selesai"], true),
        //     "Tanggal Buat": formatDate(value["Tanggal Buat"], true),
        //     Aksi: ["Cancel", "Detail", "Approve", "Reject", "Penjadwalan"],
        //     Alignment: [
        //       "center",
        //       "center",
        //       "center",
        //       "left",
        //       "center",
        //       "center",
        //       "center",
        //       "center",
        //       "center",
        //     ],
        //   }));
        //   setCurrentDataInternal(formattedData);
        // }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentFilterEksternal, currentFilterInternal]);

  return (
    <>
      <div className="d-flex flex-column">
        {isError && (
          <div className="flex-fill">
            <Alert
              type="warning"
              message="Terjadi kesalahan: Gagal mengambil data surat perintah kerja."
            />
          </div>
        )}
        {role === "ROL50" && (
          <div className="w-100">
            <div className="px-3 py-2 bg-info-subtle border-start border-5 border-info mb-3 fw-bold">
              Tim Engineering dapat mengunggah berkas gambar detail beserta nama
              kontributornya pada detail Surat Perintah Kerja Eksternal.
              {/* , baik eksternal maupun internal. */}
            </div>
          </div>
        )}
        {role === "ROL18" && (
          <div className="w-100">
            <div className="px-3 py-2 bg-info-subtle border-start border-5 border-info mb-3 fw-bold">
              Tim PPIC dapat melakukan penjadwalan pada detail Surat Perintah
              Kerja Eksternal.
              {/* , baik eksternal maupun internal. */}
            </div>
          </div>
        )}
        <div className="fw-bold mb-2">Surat Perintah Kerja Eksternal</div>
        <div className="flex-fill">
          <div className="input-group">
            <Input
              ref={searchQueryEksternal}
              forInput="pencarianSuratPerintahKerjaEksternal"
              placeholder="Cari"
            />
            <Button
              iconName="search"
              classType="primary px-4"
              title="Cari"
              onClick={handleSearchEksternal}
            />
            <Filter>
              <DropDown
                ref={searchFilterSortEksternal}
                forInput="ddUrutEksternal"
                label="Urut Berdasarkan"
                type="none"
                arrData={dataFilterSortEksternal}
                defaultValue="[Tanggal Buat2] desc"
              />
              <DropDown
                ref={searchFilterStatusEksternal}
                forInput="ddStatusEksternal"
                label="Status"
                type="semua"
                arrData={dataFilterStatusEksternal}
                defaultValue=""
              />
            </Filter>
          </div>
        </div>
        <div className="mt-3">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="d-flex flex-column">
              <Table data={currentDataEksternal} />
              <Paging
                pageSize={PAGE_SIZE}
                pageCurrent={currentFilterEksternal.page}
                totalData={currentDataEksternal[0]["Count"]}
                navigation={handleSetCurrentPageEksternal}
              />
            </div>
          )}
        </div>
        {false && (
          <>
            <div className="fw-bold mt-4 mb-2">
              Surat Perintah Kerja Internal
            </div>
            <div className="flex-fill">
              <div className="input-group">
                <Input
                  ref={searchQueryInternal}
                  forInput="pencarianSuratPerintahKerjaInternal"
                  placeholder="Cari"
                />
                <Button
                  iconName="search"
                  classType="primary px-4"
                  title="Cari"
                  onClick={handleSearchInternal}
                />
                <Filter>
                  <DropDown
                    ref={searchFilterSortInternal}
                    forInput="ddUrutInternal"
                    label="Urut Berdasarkan"
                    type="none"
                    arrData={dataFilterSortInternal}
                    defaultValue="[Tanggal Buat2] desc"
                  />
                  <DropDown
                    ref={searchFilterStatusInternal}
                    forInput="ddStatusInternal"
                    label="Status"
                    type="semua"
                    arrData={dataFilterStatusInternal}
                    defaultValue=""
                  />
                </Filter>
              </div>
            </div>
            <div className="mt-3">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="d-flex flex-column">
                  <Table data={currentDataInternal} />
                  <Paging
                    pageSize={PAGE_SIZE}
                    pageCurrent={currentFilterInternal.page}
                    totalData={currentDataInternal[0]["Count"]}
                    navigation={handleSetCurrentPageInternal}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
