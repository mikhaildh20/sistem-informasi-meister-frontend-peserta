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

const inisialisasiData = [
  {
    Key: null,
    No: null,
    "No. Registrasi PP": null,
    "No. Referensi": null,
    "Tanggal Minta": null,
    "Waktu Kirim PP": null,
    "Waktu Lihat Purchasing": null,
    "Waktu Terima Dokumen": null,
    "Progres Penerimaan": null,
    Status: null,
    Count: 0,
  },
];

const dataFilterSort = [
  { Value: "[Tanggal Buat] asc", Text: "No. Registrasi PP [↑]" },
  { Value: "[Tanggal Buat] desc", Text: "No. Registrasi PP [↓]" },
  { Value: "[Progres Penerimaan] asc", Text: "Progres Penerimaan [↑]" },
  { Value: "[Progres Penerimaan] desc", Text: "Progres Penerimaan [↓]" },
];

const dataFilterStatus = [
  { Value: "Draft", Text: "Draft" },
  { Value: "Belum Dikirim", Text: "Belum Dikirim" },
  { Value: "Terkirim", Text: "Terkirim" },
  { Value: "Batal", Text: "Batal" },
];

export default function PermintaanPembelianIndex({ onChangePage }) {
  const role = JSON.parse(decryptId(Cookies.get("activeUser"))).role;
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState(inisialisasiData);
  const [currentFilter, setCurrentFilter] = useState({
    page: 1,
    query: "",
    sort: "[Tanggal Buat] desc",
    status: "",
    role: role,
  });

  const searchQuery = useRef();
  const searchFilterSort = useRef();
  const searchFilterStatus = useRef();

  function handleSetCurrentPage(newCurrentPage) {
    setIsLoading(true);
    setCurrentFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: newCurrentPage,
      };
    });
  }

  function handleSearch() {
    setIsLoading(true);
    setCurrentFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
        query: searchQuery.current.value,
        sort: searchFilterSort.current.value,
        status: searchFilterStatus.current.value,
      };
    });
  }

  async function handlePrint(id) {}

  async function handleSent(id) {}

  async function handleCancel(id) {}

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const data = await UseFetch(
          API_LINK + "PermintaanPembelian/GetDataPermintaanPembelian",
          currentFilter
        );

        if (data === "ERROR") {
          setIsError(true);
        } else if (data.length === 0) {
          setCurrentData(inisialisasiData);
        } else {
          const formattedData = data.map((value) => ({
            ...value,
            "Tanggal Minta": formatDate(value["Tanggal Minta"], true),
            "Waktu Kirim PP": value["Waktu Kirim PP"]
              ? formatDate(value["Waktu Kirim PP"], false)
              : "-",
            "Waktu Lihat Purchasing": value["Waktu Lihat Purchasing"]
              ? formatDate(value["Waktu Lihat Purchasing"], false)
              : "-",
            "Waktu Terima Dokumen": value["Waktu Terima Dokumen"]
              ? formatDate(value["Waktu Terima Dokumen"], false)
              : "-",
            Aksi: [
              ["Draft", "Belum Dikirim"].includes(value["Status"])
                ? "Cancel"
                : "",
              "Detail",
              ...(["Draft", "Belum Dikirim"].includes(value["Status"])
                ? ["Edit", "Print", "Sent"]
                : []),
            ],
            Alignment: [
              "center",
              "center",
              "center",
              "center",
              "center",
              "center",
              "center",
              "center",
              "center",
              "center",
            ],
          }));
          setCurrentData(formattedData);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentFilter]);

  return (
    <>
      <div className="d-flex flex-column">
        {isError && (
          <div className="flex-fill">
            <Alert
              type="warning"
              //message="Terjadi kesalahan: Gagal mengambil data permintaan pembelian."
              message="Fitur ini sedang dalam pengembangan."
            />
          </div>
        )}
        <div className="flex-fill">
          <div className="input-group">
            {role === "ROL18" && (
              <Button
                iconName="add"
                classType="success"
                label="Tambah"
                onClick={() => onChangePage("add")}
              />
            )}
            <Input
              ref={searchQuery}
              forInput="pencarianPermintaanPembelian"
              placeholder="Cari"
            />
            <Button
              iconName="search"
              classType="primary px-4"
              title="Cari"
              onClick={handleSearch}
            />
            <Filter>
              <DropDown
                ref={searchFilterSort}
                forInput="ddUrut"
                label="Urut Berdasarkan"
                type="none"
                arrData={dataFilterSort}
                defaultValue="[Tanggal Buat] desc"
              />
              <DropDown
                ref={searchFilterStatus}
                forInput="ddStatus"
                label="Status"
                type="semua"
                arrData={dataFilterStatus}
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
              <Table
                data={currentData}
                onCancel={handleCancel}
                onDetail={onChangePage}
                onEdit={onChangePage}
                onPrint={handlePrint}
                onSent={handleSent}
              />
              <Paging
                pageSize={PAGE_SIZE}
                pageCurrent={currentFilter.page}
                totalData={currentData[0]["Count"]}
                navigation={handleSetCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
