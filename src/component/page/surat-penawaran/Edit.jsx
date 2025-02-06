import { useEffect, useRef, useState } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import { separator, clearSeparator } from "../../util/Formatting";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import DropDown from "../../part/Dropdown";
import Label from "../../part/Label";
import Table from "../../part/Table";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";
import Editor from "../../part/Editor";
import Input from "../../part/Input";

const inisialisasiDataProduk = [
  {
    Key: null,
    No: null,
    "Nama Produk/Jasa": null,
    Jumlah: null,
    "Biaya Material": null,
    "Biaya Standar Part": null,
    "Biaya Proses": null,
    "Biaya Alat": null,
    "Biaya Engineering": null,
    "Biaya Tambahan": null,
    Keuntungan: null,
    Diskon: null,
    "Total Harga": null,
    "Harga Satuan": null,
    Count: 0,
  },
];

export default function SuratPenawaranEdit({ onChangePage, withID }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [listRekening, setListRekening] = useState({});
  const [listAlternatif, setListAlternatif] = useState({});
  const [profitCustom, setProfitCustom] = useState(0);
  const [diskonCustom, setDiskonCustom] = useState(0);
  const [dataProduk, setDataProduk] = useState(inisialisasiDataProduk);

  const formDataRef = useRef({
    idPenawaran: "",
    idPermintaan: "",
    nomorRegistrasiPenawaran: "",
    nomorRegistrasiPermintaan: "",
    nomorRegistrasiRAK: "",
    namaPelanggan: "",
    nomorRekening: "",
    alternatifRAK: "",
    keterangan: "",
  });

  const userSchema = object({
    idPenawaran: string(),
    idPermintaan: string(),
    nomorRegistrasiPenawaran: string(),
    nomorRegistrasiPermintaan: string(),
    nomorRegistrasiRAK: string(),
    namaPelanggan: string(),
    nomorRekening: string().required("harus dipilih"),
    alternatifRAK: string().required("harus dipilih"),
    keterangan: string().required("harus diisi"),
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data1 = await UseFetch(
          API_LINK + "Utilities/GetListRekening",
          {}
        );

        if (data1 === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil daftar rekening."
          );
        } else {
          setListRekening(data1);
        }

        const data2 = await UseFetch(
          API_LINK + "SuratPenawaran/GetDataSuratPenawaranById",
          { id: withID }
        );

        if (data2 === "ERROR" || data2.length === 0) {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data surat penawaran."
          );
        } else {
          formDataRef.current = { ...formDataRef.current, ...data2[0] };
        }

        const data3 = await UseFetch(
          API_LINK + "SuratPenawaran/GetListAlternatifKeuntunganDiskonRAK",
          { idPermintaan: formDataRef.current["idPermintaan"] }
        );

        if (data3 === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data surat penawaran."
          );
        } else {
          setListAlternatif(data3);
          if (
            !data3.find(
              (val) => val.Value === formDataRef.current.alternatifRAK
            )
          ) {
            setProfitCustom(formDataRef.current.alternatifRAK.split("#")[0]);
            setDiskonCustom(formDataRef.current.alternatifRAK.split("#")[1]);
            formDataRef.current.alternatifRAK = "CUSTOM";
          }
        }
      } catch (error) {
        window.scrollTo(0, 0);
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
        setListRekening({});
        setListAlternatif({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // MENGAMBIL DATA PRODUK BERDASARKAN PROFIT/DISKON YANG DIPILIH -- BEGIN
  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(
          API_LINK + "SuratPenawaran/GetDataProdukByPermintaan",
          {
            idPermintaan: formDataRef.current["idPermintaan"],
          }
        );

        if (data === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data permintaan pelanggan."
          );
        } else if (
          data.length === 0 ||
          formDataRef.current.alternatifRAK === ""
        ) {
          setDataProduk(inisialisasiDataProduk);
        } else {
          const formattedData = data.map((value) => ({
            ...value,
            "Biaya Material": separator(value["Biaya Material"]),
            "Biaya Standar Part": separator(value["Biaya Standar Part"]),
            "Biaya Proses": separator(value["Biaya Proses"]),
            "Biaya Alat": separator(value["Biaya Alat"]),
            "Biaya Engineering": separator(value["Biaya Engineering"]),
            "Biaya Tambahan": separator(
              hitungBiaya(
                "Tambahan",
                value["Biaya Material"],
                value["Biaya Standar Part"],
                value["Biaya Proses"],
                value["Biaya Alat"],
                value["Biaya Engineering"]
              )
            ),
            Keuntungan: separator(
              hitungBiaya(
                "Keuntungan",
                value["Biaya Material"],
                value["Biaya Standar Part"],
                value["Biaya Proses"],
                value["Biaya Alat"],
                value["Biaya Engineering"]
              )
            ),
            Diskon: separator(
              hitungBiaya(
                "Diskon",
                value["Biaya Material"],
                value["Biaya Standar Part"],
                value["Biaya Proses"],
                value["Biaya Alat"],
                value["Biaya Engineering"]
              )
            ),
            "Total Harga": separator(
              hitungBiaya(
                "Total Harga",
                value["Biaya Material"],
                value["Biaya Standar Part"],
                value["Biaya Proses"],
                value["Biaya Alat"],
                value["Biaya Engineering"]
              )
            ),
            "Harga Satuan": (
              <b>
                {separator(
                  hitungBiaya(
                    "Harga Satuan",
                    value["Biaya Material"],
                    value["Biaya Standar Part"],
                    value["Biaya Proses"],
                    value["Biaya Alat"],
                    value["Biaya Engineering"],
                    value["Jumlah"]
                  ) + "</b>"
                )}
              </b>
            ),
            Alignment: [
              "center",
              "left",
              "center",
              "right",
              "right",
              "right",
              "right",
              "right",
              "right",
              "right",
              "right",
              "right",
              "right",
            ],
          }));
          setDataProduk(formattedData);
        }
      } catch (error) {
        window.scrollTo(0, 0);
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
        setDataProduk(inisialisasiDataProduk);
      }
    };

    fetchData();
  }, [formDataRef.current["alternatifRAK"], profitCustom, diskonCustom]);
  // MENGAMBIL DATA PRODUK BERDASARKAN PROFIT/DISKON YANG DIPILIH -- END

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validationError = validateInput(name, value, userSchema);

    formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (
      hitungTotalHarga().props &&
      hitungTotalHarga().props.children === "Tidak Valid"
    ) {
      window.scrollTo(0, 0);
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: "Terjadi kesalahan: Nilai keuntungan atau diskon tidak valid.",
      }));
    } else {
      if (Object.values(validationErrors).every((error) => !error)) {
        setIsLoading(true);
        setIsError((prevError) => ({ ...prevError, error: false }));
        setErrors({});

        try {
          const data = await UseFetch(
            API_LINK + "SuratPenawaran/EditSuratPenawaran",
            {
              ...formDataRef.current,
              ProfitAktual:
                formDataRef.current.alternatifRAK === "CUSTOM"
                  ? profitCustom
                  : formDataRef.current.alternatifRAK.split("#")[0],
              DiskonAktual:
                formDataRef.current.alternatifRAK === "CUSTOM"
                  ? diskonCustom
                  : formDataRef.current.alternatifRAK.split("#")[1],
              TotalHarga: clearSeparator(hitungTotalHarga()),
            }
          );

          if (data === "ERROR") {
            throw new Error(
              "Terjadi kesalahan: Gagal menyimpan data surat penawaran."
            );
          }

          SweetAlert(
            "Sukses",
            "Data surat penawaran berhasil disimpan",
            "success"
          );
          onChangePage("index");
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
      } else window.scrollTo(0, 0);
    }
  };

  function hitungBiaya(
    tipe,
    material,
    standarpart,
    proses,
    alat,
    engineering,
    jumlah = 1
  ) {
    let totalCOGM = material + standarpart + proses + alat + engineering;
    let persentaseKeuntungan =
      formDataRef.current.alternatifRAK === "CUSTOM"
        ? parseFloat(profitCustom)
        : parseFloat(formDataRef.current.alternatifRAK.split("#")[0]);
    let persentaseDiskon =
      formDataRef.current.alternatifRAK === "CUSTOM"
        ? parseFloat(diskonCustom)
        : parseFloat(formDataRef.current.alternatifRAK.split("#")[1]);
    let persentaseTambahan = parseFloat(
      listAlternatif[0]["Value"].split("#")[2]
    );

    let tambahan = (totalCOGM * persentaseTambahan) / 100;
    let keuntungan = ((totalCOGM + tambahan) * persentaseKeuntungan) / 100;
    let diskon = (keuntungan * persentaseDiskon) / 100;
    let totalHarga = totalCOGM + tambahan + keuntungan - diskon;
    let hargaSatuan = totalHarga / jumlah;

    switch (tipe) {
      case "Tambahan":
        return Math.round(tambahan);
      case "Keuntungan":
        return Math.round(keuntungan);
      case "Diskon":
        return Math.round(diskon);
      case "Total Harga":
        return Math.round(totalHarga);
      case "Harga Satuan":
        return Math.round(hargaSatuan);
      default:
        return;
    }
  }

  function hitungTotalHarga() {
    let total = dataProduk.reduce(
      (akumulasi, val) => akumulasi + clearSeparator(val["Total Harga"]),
      0
    );

    if (isNaN(total) || total === 0)
      return <span className="text-danger fst-italic">Tidak Valid</span>;
    return separator(total);
  }

  if (isLoading) return <Loading />;

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <form onSubmit={handleAdd}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Ubah Data Surat Penawaran
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-3">
                <Label
                  forLabel="nomorRegistrasiPermintaan"
                  title="Nomor Registrasi Marketing"
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
                <DropDown
                  forInput="alternatifRAK"
                  label="Simulasi Keuntungan dan Diskon"
                  arrData={listAlternatif}
                  isRequired
                  value={formDataRef.current.alternatifRAK}
                  onChange={handleInputChange}
                  errorMessage={errors.alternatifRAK}
                />
              </div>
              <div className="col-lg-3">
                <DropDown
                  forInput="nomorRekening"
                  label="Rekening pada Surat Penawaran"
                  arrData={listRekening}
                  isRequired
                  value={formDataRef.current.nomorRekening}
                  onChange={handleInputChange}
                  errorMessage={errors.nomorRekening}
                />
              </div>
              <div className="col-lg-12">
                <Editor
                  forInput="keterangan"
                  isRequired
                  label="Keterangan atau Kondisi Penawaran"
                  value={
                    new DOMParser().parseFromString(
                      formDataRef.current.keterangan,
                      "text/html"
                    ).body.textContent
                  }
                  onChange={handleInputChange}
                  errorMessage={errors.keterangan}
                />
              </div>
              {formDataRef.current.alternatifRAK === "CUSTOM" && (
                <>
                  <div className="col-lg-3">
                    <Input
                      type="number"
                      forInput="profitCustom"
                      label="Keuntungan (%)"
                      isRequired
                      value={profitCustom}
                      onChange={(e) => {
                        if (e.target.value < 0) e.target.value = 0;
                        setProfitCustom(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "e" || e.key === "E") e.preventDefault();
                      }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Input
                      type="number"
                      forInput="diskonCustom"
                      label="Diskon (%)"
                      isRequired
                      value={diskonCustom}
                      onChange={(e) => {
                        if (e.target.value < 0) e.target.value = 0;
                        if (e.target.value > 100) e.target.value = 100;
                        setDiskonCustom(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "e" || e.key === "E") e.preventDefault();
                      }}
                    />
                  </div>
                </>
              )}
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
                        <div className="px-3 py-2 bg-info-subtle border-start border-5 border-info mb-3 fw-bold">
                          {
                            <>
                              -&emsp;Biaya dan harga dalam satuan rupiah (Rp).
                              <br />
                              -&emsp;Biaya tambahan merupakan total dari biaya
                              tidak langsung, pengiriman, garansi, dan lainnya.
                              <br />
                              <b className="text-danger">
                                -&emsp;Silakan periksa kembali perhitungan yang
                                tertera dalam tabel di bawah ini.
                              </b>
                            </>
                          }
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <Table data={dataProduk} />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="float-end mx-2">
                      <span className="fw-bold">
                        Total Harga Produk/Jasa :&emsp;
                        {hitungTotalHarga()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="float-end my-4 mx-1">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="BATAL"
            onClick={() => onChangePage("index")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SIMPAN"
          />
        </div>
      </form>
    </>
  );
}
