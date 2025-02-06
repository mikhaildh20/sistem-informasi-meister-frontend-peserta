import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { decryptId } from "../../util/Encryptor";
import { API_LINK } from "../../util/Constants";
import {
  formatDate,
  formatDateScheduling,
  formatDateSchedulingRevert,
} from "../../util/Formatting";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";
import Table from "../../part/Table";
import CheckBox from "../../part/CheckBox";
import SweetAlert from "../../util/SweetAlert";

const inisialisasiDataProduk = [
  {
    Key: null,
    No: null,
    "Nama Produk/Jasa": null,
    Kategori: null,
    Catatan: null,
    Jumlah: null,
    Count: 0,
  },
];

const inisialisasiNewDataScheduling = {
  Key: null,
  IsHeader: false,
  Task: "",
  AssignedTo: "",
  Progress: "",
  Notes: "",
  PIC: "",
  Complex: "",
  Days: "",
  Start: "",
  End: "",
  Deleted: false,
};

export default function Scheduling({ onChangePage, withID }) {
  const role = JSON.parse(decryptId(Cookies.get("activeUser"))).role;
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingScheduling, setIsLoadingScheduling] = useState(false);
  const [dataProduk, setDataProduk] = useState(inisialisasiDataProduk);
  const [dataScheduling, setDataScheduling] = useState([]);

  const formDataRef = useRef({
    idPermintaan: "",
    nomorRegistrasiSPK: "",
    nomorReferensi: "",
    nomorRegistrasiPermintaan: "",
    namaPelanggan: "",
    targetPengiriman: "",
    catatanPengiriman: "",
    nomorPurchaseOrder: "",
    statusSPK: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data1 = await UseFetch(
          API_LINK +
            "SuratPerintahKerjaOperasional/DetailSuratPerintahKerjaEksternal",
          { id: withID, role: role }
        );

        if (data1 === "ERROR" || data1.length === 0) {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data surat perintah kerja."
          );
        } else {
          formDataRef.current = { ...formDataRef.current, ...data1[0] };
        }

        const data2 = await UseFetch(
          API_LINK + "SuratPerintahKerjaOperasional/GetDataProdukByPermintaan4",
          {
            idPermintaan: formDataRef.current["idPermintaan"],
          }
        );

        if (data2 === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data permintaan pelanggan."
          );
        } else if (data2.length === 0) {
          setDataProduk(inisialisasiDataProduk);
        } else {
          const formattedData = data2.map((value) => ({
            ...value,
            Kategori: value["Kategori"].split(" - ")[1],
            Alignment: ["center", "left", "center", "left", "center"],
          }));
          setDataProduk(formattedData);
        }

        const data3 = await getDataAktivitas();
        if (data3 !== "OK") throw new Error(data3);
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

  async function getDataAktivitas() {
    try {
      const data = await UseFetch(
        API_LINK + "SuratPerintahKerjaOperasional/DetailAktivitas",
        {
          idSPK: withID,
        }
      );

      if (data === "ERROR") {
        throw new Error("Terjadi kesalahan: Gagal mengambil data penjadwalan.");
      } else {
        const formattedData = data.map((value) => ({
          ...value,
          Deleted:
            typeof value["Deleted"] === "boolean"
              ? value["Deleted"]
              : value["Deleted"].toLowerCase() !== "false",
          IsHeader:
            typeof value["IsHeader"] === "boolean"
              ? value["IsHeader"]
              : value["IsHeader"].toLowerCase() !== "false",
        }));
        setDataScheduling(formattedData);
        return "OK";
      }
    } catch (error) {
      return error.message;
    }
  }

  function handleKlasifikasiProgress(param) {
    if (param < 30) return "bg-danger";
    else if (param < 80) return "bg-warning";
    else if (param < 100) return "bg-success";
    else return "bg-primary";
  }

  async function handleSaveAktivitas() {
    setIsLoadingScheduling(true);
    setIsError((prevError) => ({ ...prevError, error: false }));

    try {
      for (let val of dataScheduling) {
        const data = await UseFetch(
          API_LINK + "SuratPerintahKerjaOperasional/CreateAktivitas",
          { ...val, IDSPO: withID }
        );

        if (data === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal menyimpan data penjadwalan."
          );
        }
      }

      const data = await getDataAktivitas();
      if (data !== "OK") throw new Error(data);
      else
        SweetAlert("Sukses", "Data penjadwalan berhasil disimpan", "success");
    } catch (error) {
      window.scrollTo(0, 0);
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: error.message,
      }));
    } finally {
      setIsLoadingScheduling(false);
    }
  }

  function handleCreateAktivitas() {
    setDataScheduling((prevData) => {
      return [
        ...prevData,
        {
          ...inisialisasiNewDataScheduling,
          Key: Date.now().toString(),
        },
      ];
    });
  }

  function handleChangeScheduling(key, atribut, value) {
    setDataScheduling((prevData) => {
      return prevData.map((item) => {
        if (item.Key === key) {
          if (atribut === "Start" || atribut === "Days") {
            if (value === "") {
              return {
                ...item,
                [atribut]: value,
                Start: "",
                End: "",
                Days: "",
              };
            } else {
              const days =
                atribut === "Days" ? value : parseInt(item.Days) || 0;
              const start = !item.Start ? new Date() : new Date(item.Start);
              const startDate = atribut === "Start" ? new Date(value) : start;
              const endDate = new Date(startDate);
              endDate.setDate(startDate.getDate() + parseInt(days));

              return {
                ...item,
                [atribut]: value,
                Start: startDate.toISOString().substring(0, 10),
                End: endDate.toISOString().substring(0, 10),
              };
            }
          }
          return { ...item, [atribut]: value };
        }
        return item;
      });
    });
  }

  function handleItem(event, param, key, atribut) {
    const handleVisibility = (element, show) => {
      if (show) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    };

    const setInputWidth = (inputElement, textLength) => {
      inputElement.style.width = textLength + 1 + "ch";
    };

    const updateInputValue = (childNode, nextSibling, type) => {
      handleVisibility(nextSibling, true);
      handleVisibility(childNode, false);

      const inputElement = nextSibling.querySelector(type);
      const value =
        type === 'input[type="date"]'
          ? childNode.innerText === ""
            ? ""
            : formatDateSchedulingRevert(childNode.innerText)
          : childNode.innerText;

      inputElement.value = value;
      setInputWidth(inputElement, childNode.innerText.length);
      inputElement.focus();
      inputElement.select();
    };

    const updatePrevSiblingText = (event, isDate) => {
      const prevSibling = event.parentNode.previousElementSibling;
      if (prevSibling) {
        handleVisibility(prevSibling, true);
        event.parentNode.classList.add("d-none");
        prevSibling.innerText = isDate
          ? formatDateScheduling(new Date(event.value))
          : event.value;
        handleChangeScheduling(key, atribut, event.value);
      }
    };

    switch (param) {
      case "Label":
        updateInputValue(
          event.childNodes[0],
          event.childNodes[0].nextElementSibling,
          'input[type="text"]'
        );
        break;
      case "LabelDate":
        updateInputValue(
          event.childNodes[0],
          event.childNodes[0].nextElementSibling,
          'input[type="date"]'
        );
        break;
      case "Option":
        const nextSiblingOption = event.childNodes[0].nextElementSibling;
        handleVisibility(nextSiblingOption, true);
        handleVisibility(event.childNodes[0], false);
        const inputElementOption = nextSiblingOption.querySelector("select");
        inputElementOption.value = event.childNodes[0].innerText;
        inputElementOption.focus();
        break;
      case "Input":
      case "InputDate":
        updatePrevSiblingText(event, param === "InputDate");
        break;
      case "Change":
      case "ChangeDate":
        event.style.width = event.value.length + 1 + "ch";
        break;
      case "ChangeOption":
        const prevSiblingOption = event.parentNode.previousElementSibling;
        if (prevSiblingOption) {
          prevSiblingOption.innerText = event.value;
        }
        break;
      case "Progress":
      case "Days":
        const level = event.value;
        handleChangeScheduling(key, param, level);
        break;
      case "IsHeader":
      case "Deleted":
        handleChangeScheduling(key, param, atribut);
        break;
    }
  }

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
          Detail Surat Perintah Kerja Eksternal
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-3">
              <Label
                forLabel="nomorRegistrasiSPK"
                title="Nomor SPK"
                data={formDataRef.current.nomorRegistrasiSPK}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="nomorRegistrasiPermintaan"
                title="Nomor Referensi"
                data={formDataRef.current.nomorRegistrasiPermintaan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="namaPelanggan"
                title="Nama Pelanggan"
                data={formDataRef.current.namaPelanggan}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="nomorPurchaseOrder"
                title="Nomor Purchase Order"
                data={formDataRef.current.nomorPurchaseOrder}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="targetPengiriman"
                title="Target Pengiriman"
                data={formatDate(formDataRef.current.targetPengiriman, true)}
              />
            </div>
            <div className="col-lg-6">
              <Label
                forLabel="catatanPengiriman"
                title="Catatan Pengiriman"
                data={formDataRef.current.catatanPengiriman}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="statusSPK"
                title="Status"
                data={formDataRef.current.statusSPK}
              />
              <Button
                iconName="overview"
                classType="primary btn-sm mb-3"
                label="Lihat Detail SPK"
                onClick={() => onChangePage("detailEksternal", withID)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card mt-3">
                <div className="card-header bg-secondary-subtle fw-bold">
                  Daftar Permintaan Produk/Jasa
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <Table data={dataProduk} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card mt-3">
                <div className="card-header bg-secondary-subtle fw-bold">
                  Detail Penjadwalan
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    {role === "ROL18" && (
                      <div className="col-lg-12">
                        <div className="px-3 py-2 bg-info-subtle border-start border-5 border-info mb-3 fw-bold">
                          Klik sel yang ingin diubah. Perubahan tidak akan
                          disimpan secara otomatis. Untuk menyimpan perubahan,
                          klik tombol "Simpan Aktivitas". Untuk membatalkan
                          perubahan, klik tombol "Kembali".
                        </div>
                      </div>
                    )}
                    <div className="col-lg-12">
                      <div className="overflow-x-auto">
                        <table className="table table-sm small border table-hover table-bordered">
                          <thead>
                            <tr>
                              {role === "ROL18" && (
                                <th className="px-2 text-nowrap">H&#8593;</th>
                              )}
                              <th className="px-2 text-nowrap">Task</th>
                              <th className="px-2 text-nowrap">Assigned To</th>
                              <th className="px-2 text-nowrap">Progress (%)</th>
                              <th className="px-2 text-nowrap">Notes</th>
                              <th className="px-2 text-nowrap">PIC</th>
                              <th className="px-2 text-nowrap">Complex</th>
                              <th className="px-2 text-nowrap">Days</th>
                              <th className="px-2 text-nowrap">Start</th>
                              <th className="px-2 text-nowrap">End</th>
                              <th
                                className="px-2 text-nowrap"
                                style={{ width: "10%" }}
                              ></th>
                              {role === "ROL18" && (
                                <th className="px-2 text-nowrap"></th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {dataScheduling
                              .filter((val) => !val.Deleted)
                              .map((val) => {
                                return (
                                  <tr
                                    className={
                                      val.IsHeader
                                        ? "fw-bold activity-header"
                                        : ""
                                    }
                                    key={val.Key}
                                  >
                                    {role === "ROL18" && (
                                      <td className="px-2 text-nowrap">
                                        <CheckBox
                                          checked={val.IsHeader}
                                          onChange={() =>
                                            handleItem(
                                              null,
                                              "IsHeader",
                                              val.Key,
                                              !val.IsHeader
                                            )
                                          }
                                        />
                                      </td>
                                    )}
                                    <td
                                      className="px-2 text-nowrap"
                                      onClick={(e) =>
                                        role === "ROL18"
                                          ? handleItem(e.currentTarget, "Label")
                                          : {}
                                      }
                                    >
                                      <span>{val.Task}</span>
                                      <div className="d-none">
                                        <input
                                          type="text"
                                          className={
                                            "activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          onBlur={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Input",
                                              val.Key,
                                              "Task"
                                            )
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Change"
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="px-2 text-nowrap"
                                      onClick={(e) =>
                                        role === "ROL18"
                                          ? handleItem(e.currentTarget, "Label")
                                          : {}
                                      }
                                    >
                                      <span>{val.AssignedTo}</span>
                                      <div className="d-none">
                                        <input
                                          type="text"
                                          className={
                                            "activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          onBlur={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Input",
                                              val.Key,
                                              "AssignedTo"
                                            )
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Change"
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="px-2 text-nowrap">
                                      <div>
                                        <input
                                          type="number"
                                          className={
                                            "w-100 activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          min="0"
                                          max="100"
                                          disabled={role !== "ROL18"}
                                          defaultValue={val.Progress}
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Progress",
                                              val.Key
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="px-2 text-nowrap"
                                      onClick={(e) =>
                                        role === "ROL18"
                                          ? handleItem(e.currentTarget, "Label")
                                          : {}
                                      }
                                    >
                                      <span>{val.Notes}</span>
                                      <div className="d-none">
                                        <input
                                          type="text"
                                          className={
                                            "activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          onBlur={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Input",
                                              val.Key,
                                              "Notes"
                                            )
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Change"
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="px-2 text-nowrap"
                                      onClick={(e) =>
                                        role === "ROL18"
                                          ? handleItem(e.currentTarget, "Label")
                                          : {}
                                      }
                                    >
                                      <span>{val.PIC}</span>
                                      <div className="d-none">
                                        <input
                                          type="text"
                                          className={
                                            "activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          onBlur={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Input",
                                              val.Key,
                                              "PIC"
                                            )
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Change"
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="px-2 text-nowrap"
                                      onClick={(e) =>
                                        role === "ROL18"
                                          ? handleItem(
                                              e.currentTarget,
                                              "Option"
                                            )
                                          : {}
                                      }
                                    >
                                      <span>{val.Complex}</span>
                                      <div className="d-none">
                                        <select
                                          className={
                                            "w-100 activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          onBlur={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Input",
                                              val.Key,
                                              "Complex"
                                            )
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "ChangeOption"
                                            )
                                          }
                                        >
                                          <option value={"Low"}>Low</option>
                                          <option value={"Medium"}>
                                            Medium
                                          </option>
                                          <option value={"High"}>High</option>
                                          <option value={"Very High"}>
                                            Very High
                                          </option>
                                        </select>
                                      </div>
                                    </td>
                                    <td className="px-2 text-nowrap">
                                      <div>
                                        <input
                                          type="number"
                                          className={
                                            "w-100 activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          min="1"
                                          max="366"
                                          disabled={role !== "ROL18"}
                                          value={
                                            val.Days === null ? "" : val.Days
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "Days",
                                              val.Key
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="px-2 text-nowrap"
                                      onClick={(e) =>
                                        role === "ROL18"
                                          ? handleItem(
                                              e.currentTarget,
                                              "LabelDate"
                                            )
                                          : {}
                                      }
                                    >
                                      <span>
                                        {formatDateScheduling(val.Start)}
                                      </span>
                                      <div className="d-none">
                                        <input
                                          type="date"
                                          className={
                                            "activity-item " +
                                            (val.IsHeader
                                              ? "activity-bold"
                                              : "")
                                          }
                                          onBlur={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "InputDate",
                                              val.Key,
                                              "Start"
                                            )
                                          }
                                          onChange={(e) =>
                                            handleItem(
                                              e.currentTarget,
                                              "ChangeDate"
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="px-2 text-nowrap">
                                      {formatDateScheduling(val.End)}
                                    </td>
                                    <td
                                      className="px-2 text-nowrap"
                                      valign="middle"
                                    >
                                      {val.Progress > 0 && (
                                        <div
                                          className="progress"
                                          role="progressbar"
                                          style={{ height: "10px" }}
                                        >
                                          <div
                                            className={
                                              "progress-bar " +
                                              handleKlasifikasiProgress(
                                                val.Progress
                                              )
                                            }
                                            style={{
                                              width: val.Progress + "%",
                                            }}
                                          ></div>
                                        </div>
                                      )}
                                    </td>
                                    {role === "ROL18" && (
                                      <td className="px-2 text-nowrap">
                                        <Button
                                          iconName="trash"
                                          classType="danger btn-sm px-1 py-0"
                                          onClick={() =>
                                            handleItem(
                                              null,
                                              "Deleted",
                                              val.Key,
                                              true
                                            )
                                          }
                                        />
                                      </td>
                                    )}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {role === "ROL18" && (
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <Button
                            iconName="add"
                            classType="success btn-sm mt-2"
                            label="Tambah Aktivitas"
                            onClick={() => handleCreateAktivitas()}
                          />
                          {isLoadingScheduling && <Loading />}
                          <Button
                            iconName="floppy-disk-pen"
                            classType="primary btn-sm mt-2"
                            label="Simpan Aktivitas"
                            onClick={() => handleSaveAktivitas()}
                          />
                        </div>
                      </div>
                    )}
                  </div>
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
          onClick={() => onChangePage("index")}
        />
      </div>
    </>
  );
}
