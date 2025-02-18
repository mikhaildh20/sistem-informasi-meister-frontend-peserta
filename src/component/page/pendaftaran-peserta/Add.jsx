import React, { useState, useRef, useEffect } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import blank from "../../../assets/blankPicture.png";
import Dropdown from "../../part/Dropdown";
import Icon from "../../part/Icon";
import Button from "../../part/Button";
import Input from "../../part/Input";
import FileUpload from "../../part/FileUpload";
import UseFetch from "../../util/UseFetch";
import UploadFile from "../../util/UploadFile";
import Alert from "../../part/Alert";
import SweetAlert from "../../util/SweetAlert";
import Loading from "../../part/Loading";

const listJenisKelamin = [
    {Value: "Laki-laki", Text: "Laki-laki"},
    {Value: "Perempuan", Text: "Perempuan"},
];

const listProgramMeister = [
    {Value: "1", Text: "Meister Otomotif"},
    {Value: "2", Text: "Malaysian Meister Program"},
    {Value: "3", Text: "Advanced Technology Meister Programme (ATMP)"},
];

const listGolonganDarah = [
    {Value: "A", Text: "A"},
    {Value: "B", Text: "B"},
    {Value: "AB", Text: "AB"},
    {Value: "O", Text: "O"},
];

const listAgama = [
    {Value: "Islam", Text: "Islam"},
    {Value: "Kristen Protestan", Text: "Kristen Protestan"},
    {Value: "Kristen Katholik", Text: "Kristen Katholik"},
    {Value: "Hindu", Text: "Hindu"},
    {Value: "Buddha", Text: "Buddha"},
    {Value: "Konghucu", Text: "Konghucu"},
];

const listKewarganegaraan = [
    {Value: "WNI", Text: "WNI"},
    {Value: "WNA", Text: "WNA"},
];

const listStatusPerkawinan = [
    {Value: "Belum Kawin", Text: "Belum Kawin"},
    {Value: "Sudah Kawin", Text: "Sudah Kawin"},
];

const listUkuranBaju = [
    {Value: "S", Text: "S"},
    {Value: "M", Text: "M"},
    {Value: "L", Text: "L"},
    {Value: "XL", Text: "XL"},
    {Value: "XXL", Text: "XXL"},
];

const listPendidikanTerakhir = [
    {Value: "SMA", Text: "SMA"},
    {Value: "SMK", Text: "SMK"},
    {Value: "Diploma", Text: "Diploma"},
    {Value: "Sarjana", Text: "Sarjana"},
]

export default function PendaftaranPesertaMeisterAdd({onChangePage}){
    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState({ error: false, message: "" });
    const [isLoading, setIsLoading] = useState(false);

    const formDataRef = useRef({
        namaPeserta: "",
        fotoPeserta: "",
        idProgram: "",
        tempatLahir: "",
        tanggalLahir: "",
        angkatanPeserta: "",
        jenisKelamin: "",
        alamatPeserta: "",
        kodeposPeserta: "",
        emailPeserta: "",
        hpPeserta: "",
        golonganDarah: "",
        kewarganegaraan: "",
        agamaPeserta: "",
        statusPerkawinan: "",
        emailKantor: "",
        alamatKantor: "",
        kodeposKantor: "",
        hpKantor: "",
        ukuranSepatu: "",
        ukuranKemeja: "",
        kontakDarurat: "",
        namaDarurat: "",
        hubunganDarurat: "",
        mediaSosial: "",
        kursusPeserta: "",
        hobiPeserta: "",
        pendidikanTerakhir: "",
        namaSekolah: "",
        tahunLulusSekolah: "",
        namaPerguruanTinggi: "",
        tahunLulusPerguruanTinggi: "",
        fileIjazah: "",
        fileKtp: "",
        fileSertifikat: "",
        tujuanPengiriman: "",
    });

    const userSchema = object({
        namaPeserta: string()
        .max(100, "maksimum 100 karakter")
        .required("harus diisi!"),
        fotoPeserta: string(),
        idProgram: string().required("harus diisi!"),
        tempatLahir: string().required("harus diisi!"),
        tanggalLahir: string().required("harus diisi!"),
        angkatanPeserta: string().required("harus diisi!"),
        jenisKelamin: string().required("harus diisi!"),
        alamatPeserta: string().required("harus diisi!"),
        kodeposPeserta: string().required("harus diisi!"),
        emailPeserta: string().required("harus diisi!"),
        hpPeserta: string().required("harus diisi!"),
        golonganDarah: string().required("harus diisi!"),
        kewarganegaraan: string().required("harus diisi!"),
        agamaPeserta: string().required("harus diisi!"),
        statusPerkawinan: string().required("harus diisi!"),
        emailKantor: string(),
        alamatKantor: string(),
        kodeposKantor: string(),
        hpKantor: string(),
        ukuranSepatu: string().required("harus diisi!"),
        ukuranKemeja: string().required("harus diisi!"),
        kontakDarurat: string(),
        namaDarurat: string(),
        hubunganDarurat: string(),
        mediaSosial: string(),
        kursusPeserta: string(),
        hobiPeserta: string(),
        pendidikanTerakhir: string().required("harus diisi!"),
        namaSekolah: string().required("harus diisi!"),
        tahunLulusSekolah: string().required("harus diisi!"),
        namaPerguruanTinggi: string(),
        tahunLulusPerguruanTinggi: string(),
        fileIjazah: string(),
        fileKtp: string(),
        fileSertifikat: string(),
        tujuanPengiriman: string().required("harus diisi!")
    });

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [sertifikatFiles, setSertifikatFiles] = useState([]);
    const [photo, setPhoto] = useState(blank);
    const [records, setRecords] = useState([]);
    const [selectedAlamat, setSelectedAlamat] = useState();
    const photoRef = useRef(null);
    const ijazahRef = useRef(null);
    const ktpRef = useRef(null);

    const [formRiwayatPekerjaan, setFormData] = useState({
        perusahaan: '',
        jabatan: '',
        periodeMulai: '',
        periodeAkhir: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const validationError = validateInput(name, value, userSchema);
        formDataRef.current[name] = value;
        setErrors((prevErrors) => ({
        ...prevErrors,
        [validationError.name]: validationError.error,
        }));
    };
    
    const addFileUpload = () => {
        setSertifikatFiles((prevFiles) => [
            ...prevFiles,
            { id: Date.now(), ref: React.createRef() },
        ]);
    };

    const removeFileUpload = (id) => {
        setSertifikatFiles(sertifikatFiles.filter((file) => file.id !== id));
    };

    const handleInputRiwayat = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTambahClick = () => {
        setIsFormVisible(prev => !prev);
    };

    const handleBatalClick = () => {
    setErrors({});
    setIsError({ error: false, message: "" });
    setIsFormVisible(false);
    setFormData({
        perusahaan: '',
        jabatan: '',
        periodeMulai: '',
        periodeAkhir: '',
        });
    };

    const handleSimpanClick = () => {
        const requiredFields = ["perusahaan", "jabatan", "periodeMulai", "periodeAkhir"];
        
        const newErrors = requiredFields.reduce((acc, field) => {
            if (!formRiwayatPekerjaan[field]?.trim()) {
                acc[field] = `Field ${field} harus diisi!`;
            }
            return acc;
        }, {});
    
        const yearPattern = /^\d{4}$/;
        if (!yearPattern.test(formRiwayatPekerjaan.periodeMulai)) {
            newErrors.periodeMulai = "Periode Mulai harus berupa angka 4 digit (contoh: 2020)!";
        }
        if (!yearPattern.test(formRiwayatPekerjaan.periodeAkhir)) {
            newErrors.periodeAkhir = "Periode Akhir harus berupa angka 4 digit (contoh: 2025)!";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsError({ error: true, message: "Harap isi semua field dengan benar!" });
            return;
        }
    
        if (parseInt(formRiwayatPekerjaan.periodeMulai) > parseInt(formRiwayatPekerjaan.periodeAkhir)) {
            setIsError({ error: true, message: "Periode Mulai tidak boleh lebih besar dari Periode Akhir!" });
            return;
        }
    
        const isDuplicate = records.some(
            (record) =>
                record.perusahaan.toLowerCase() === formRiwayatPekerjaan.perusahaan.toLowerCase() &&
                record.jabatan.toLowerCase() === formRiwayatPekerjaan.jabatan.toLowerCase()
        );
    
        if (isDuplicate) {
            setIsError({ error: true, message: "Riwayat pekerjaan ini sudah ada!" });
            return;
        }
    
        setErrors({});
        setIsError({ error: false, message: "" });
    
        const newRecord = {
            id: records.length + 1,
            perusahaan: formRiwayatPekerjaan.perusahaan.trim(),
            jabatan: formRiwayatPekerjaan.jabatan.trim(),
            periode: `${formRiwayatPekerjaan.periodeMulai}-${formRiwayatPekerjaan.periodeAkhir}`,
        };
    
        setRecords((prev) => [...prev, newRecord]);
        handleBatalClick();
    };        


    const handleDeleteClick = (id) => {
        setRecords((prev) => prev.filter((record) => record.id !== id));
    };

    const handleFileChange = (ref, extAllowed, isPhoto = false) => {
        const { name, value } = ref.current;
        const file = ref.current.files[0];
    
        if (!file) return;
    
        const fileName = file.name;
        const fileSize = file.size;
        const fileExt = fileName.split(".").pop().toLowerCase();
        const validationError = validateInput(name, value, userSchema);
        let error = "";
    
        if (fileSize / 1024576 > 10) error = "berkas terlalu besar";
        else if (!extAllowed.split(",").includes(fileExt))
            error = "format berkas tidak valid";
    
        if (error) {
            ref.current.value = "";
        } else if (isPhoto) {
            setPhoto(URL.createObjectURL(file));
        }
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [validationError.name]: error,
        }));
    };

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setSelectedAlamat(value);
        formDataRef.current.tujuanPengiriman = value;
    };
    

    const handleUploadClick = () => {
        document.getElementById("photoInput").click();
    };

    const uploadFileIfExists = async (inputRef, key, folder, type) => {
        if (type === "multiple") {
            if (inputRef.length > 0) { 
                const fileUploadPromises = inputRef.map(fileObj => {
                    if (fileObj.ref.current?.files.length > 0) {
                        return UploadFile(fileObj.ref.current, type, folder);
                    }
                    return Promise.resolve("");
                });
    
                return Promise.all(fileUploadPromises)
                    .then((results) => {
                        formDataRef.current[key] = results.filter(name => name !== "").join(",");
                    })
                    .catch(() => (formDataRef.current[key] = "ERROR"));
            }
        } else {
            if (inputRef.current?.files.length > 0) {
                return UploadFile(inputRef.current, type, folder)
                    .then((data) => (formDataRef.current[key] = data))
                    .catch(() => (formDataRef.current[key] = "ERROR"));
            }
        }    
    };
    

    const handleStoreData = async () => {
        const validationErrors = await validateAllInputs(
            formDataRef.current,
            userSchema,
            setErrors
        );

        if (Object.values(validationErrors).every((error) => !error)) {
            setIsLoading(true);
            setIsError((prevError) => ({ ...prevError, error: false }));
            setErrors({});

            const uploadPromises = [
                uploadFileIfExists(photoRef, "fotoPeserta", "PasPhoto", "single"),
                uploadFileIfExists(ijazahRef, "fileIjazah", "Ijazah", "single"),
                uploadFileIfExists(ktpRef, "fileKtp", "Ktp", "single"),
                uploadFileIfExists(sertifikatFiles,"fileSertifikat","Sertifikat","multiple")
            ];


            try {
                await Promise.all(uploadPromises);

                const data = await UseFetch(
                API_LINK + "PendaftaranPeserta/CreatePendaftaranPeserta",
                formDataRef.current
                );

                console.log(data);

                if (data === "ERROR") {
                throw new Error(
                    "Terjadi kesalahan: Gagal mendaftar."
                );
                } else {
                SweetAlert("Sukses", "Berhasil mendaftar!", "success");
                onChangePage("index");
                }
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

    const handleAdd = (e) => {
        e.preventDefault();

        if (!isChecked) {
            SweetAlert("Peringatan", "Tolong centang data pernyataaan!", "warning");
            return;
        }

        SweetAlert("Konfirmasi", "Yakin untuk mendaftar? pastikan data diisi dengan benar", "warning", "Ya, Daftar")
        .then((result) => {
            if (!result) {
                return;
            }

            handleStoreData();
            
        });
    };

    return(
        <>
        <div className="custom-container mt-5">
        {isLoading ? (
            <Loading />
        ) : (
            <div className="card mt-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2 className="add-title">Formulir Pendaftaran</h2>
                    <button className="btn btn-info" onClick={() => console.log("Current formDataRef:", formDataRef.current)}>Check</button>
                </div>
                <div className="card-body">
                    <form onSubmit={handleAdd}> 
                    <div className="card">
                    <div className="card-header"><h5>Data Pribadi</h5></div>
                        <div className="card-body">
                        {isError.error && (
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-12 text-center">
                                    <div className="flex-fill">
                                        <Alert type="danger mt-3" message={isError.message} />
                                    </div>
                                </div>
                            </div>                        
                        )}
                                <div className="row">
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Pas Foto</label>
                                    <div className="border rounded p-2 d-flex flex-column align-items-center">
                                        <div className="w-100">
                                            <img
                                            src={photo}
                                            alt="Profile"
                                            className="img-fluid rounded"
                                            style={{ width: "100%", height: "490px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100 mt-2"
                                            onClick={handleUploadClick}
                                        >
                                            Ganti Foto
                                        </button>
                                        <input
                                            type="file"
                                            id="photoInput"
                                            className="d-none"
                                            ref={photoRef} 
                                            accept="image/jpeg, image/png" 
                                            onChange={() => handleFileChange(photoRef, "jpg,jpeg,png", true)}
                                        />
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="namaPeserta"
                                                    label="Nama Peserta"
                                                    type="text"
                                                    placeholder="Masukkan Nama Peserta"
                                                    value={formDataRef.namaPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.namaPeserta}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    forInput="idProgram"
                                                    label="Program Meister"
                                                    arrData={listProgramMeister}
                                                    value={formDataRef.current.idProgram}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.idProgram}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="tempatLahir"
                                                    label="Tempat Lahir"
                                                    type="text"
                                                    placeholder="Masukkan Tempat Lahir"
                                                    value={formDataRef.current.tempatLahir}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.tempatLahir}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="tanggalLahir"
                                                    label="Tanggal Lahir"
                                                    type="date"
                                                    value={formDataRef.current.tanggalLahir}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.tanggalLahir}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="angkatanPeserta"
                                                    label="Angkatan"
                                                    type="text"
                                                    placeholder="Masukkan Angkatan (20xx)"
                                                    value={formDataRef.current.angkatanPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.angkatanPeserta}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    forInput="jenisKelamin"
                                                    label="Jenis Kelamin"
                                                    arrData={listJenisKelamin}
                                                    value={formDataRef.current.jenisKelamin}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.jenisKelamin}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="alamatPeserta"
                                                    label="Alamat"
                                                    type="text"
                                                    placeholder="Masukkan Alamat"
                                                    value={formDataRef.current.alamatPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.alamatPeserta}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="kodeposPeserta"
                                                    label="Kode Pos"
                                                    type="text"
                                                    placeholder="Masukkan Kode Pos"
                                                    value={formDataRef.current.kodeposPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.kodeposPeserta}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="emailPeserta"
                                                    label="Email"
                                                    type="email"
                                                    placeholder="Masukkan Email"
                                                    value={formDataRef.current.emailPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.emailPeserta}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    forInput="hpPeserta"
                                                    label="Nomor HP"
                                                    type="text"
                                                    placeholder="Masukkan Nomor HP"
                                                    value={formDataRef.current.hpPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.hpPeserta}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Dropdown
                                                    forInput="golonganDarah"
                                                    label="Golongan Darah"
                                                    arrData={listGolonganDarah}
                                                    value={formDataRef.current.golonganDarah}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.golonganDarah}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    forInput="kewarganegaraan"
                                                    label="Kewarganegaraan"
                                                    arrData={listKewarganegaraan}
                                                    value={formDataRef.current.kewarganegaraan}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.kewarganegaraan}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Dropdown
                                                    forInput="agamaPeserta"
                                                    label="Agama"
                                                    arrData={listAgama}
                                                    value={formDataRef.current.agamaPeserta}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.agamaPeserta}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    forInput="statusPerkawinan"
                                                    label="Status Perkawinan"
                                                    arrData={listStatusPerkawinan}
                                                    value={formDataRef.current.statusPerkawinan}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.statusPerkawinan}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Input
                                                    forInput="emailKantor"
                                                    label="Email Perusahaan"
                                                    type="text"
                                                    placeholder="Masukkan Email Perusahaan"
                                                    value={formDataRef.current.emailKantor}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.emailKantor}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="alamatKantor"
                                                    label="Alamat Perusahaan"
                                                    type="text"
                                                    placeholder="Masukkan Alamat Perusahaan"
                                                    value={formDataRef.current.alamatKantor}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.alamatKantor}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="kodeposKantor"
                                                    label="Kode Pos Perusahaan"
                                                    placeholder="Masukkan Kode Pos Perusahaan"
                                                    type="text"
                                                    value={formDataRef.current.kodeposKantor}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.kodeposKantor}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Input
                                                    forInput="hpKantor"
                                                    label="Telepon Perusahaan"
                                                    placeholder="Masukkan Telepon Perusahaan"
                                                    type="text"
                                                    value={formDataRef.current.hpKantor}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.hpKantor}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="ukuranSepatu"
                                                    label="Ukuran Sepatu"
                                                    placeholder="Masukkan Ukuran Sepatu (xx)"
                                                    type="text"
                                                    value={formDataRef.current.ukuranSepatu}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.ukuranSepatu}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Dropdown
                                                    forInput="ukuranKemeja"
                                                    label="Ukuran Kemeja"
                                                    arrData={listUkuranBaju}
                                                    value={formDataRef.current.ukuranKemeja}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.ukuranKemeja}
                                                    isRequired
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Input
                                                    forInput="kontakDarurat"
                                                    label="Kontak Darurat"
                                                    type="text"
                                                    placeholder="Masukkan Kontak Darurat (08xxxxx)"
                                                    value={formDataRef.current.kontakDarurat}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.kontakDarurat}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="namaDarurat"
                                                    label="Nama Kontak Darurat"
                                                    type="text"
                                                    placeholder="Masukkan Nama Kontak"
                                                    value={formDataRef.current.namaDarurat}
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.namaDarurat}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="hubunganDarurat"
                                                    label="Hubungan Kontak Darurat"
                                                    placeholder="Masukkan Hubungan Kontak"
                                                    value={formDataRef.current.hubunganDarurat}
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    errorMessage={errors.hubunganDarurat}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Input
                                                    forInput="mediaSosial"
                                                    label="Media Sosial"
                                                    placeholder="Masukkan Media Sosial"
                                                    value={formDataRef.current.mediaSosial}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="kursusPeserta"
                                                    label="Kursus"
                                                    placeholder="Masukkan Kursus"
                                                    value={formDataRef.current.kursusPeserta}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    forInput="hobiPeserta"
                                                    label="Hobi"
                                                    placeholder="Masukkan Hobi"
                                                    value={formDataRef.current.hobiPeserta}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                        </div>
                    </div>

                        <div className="card mt-3">
                            <div className="card-header"><h5>Pendidikan</h5></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Dropdown
                                            forInput="pendidikanTerakhir"
                                            label="Pendidikan Terakhir"
                                            arrData={listPendidikanTerakhir}
                                            value={formDataRef.current.pendidikanTerakhir}
                                            onChange={handleInputChange}
                                            errorMessage={errors.pendidikanTerakhir}
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            forInput="namaSekolah"
                                            label="Nama Sekolah"
                                            type="text"
                                            placeholder="Masukkan Nama Sekolah"
                                            value={formDataRef.current.namaSekolah}
                                            onChange={handleInputChange}
                                            errorMessage={errors.namaSekolah}
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            forInput="tahunLulusSekolah"
                                            label="Tahun Lulus Sekolah"
                                            placeholder="Masukkan Tahun Lulus Sekolah"
                                            value={formDataRef.current.tahunLulusSekolah}
                                            type="text"
                                            onChange={handleInputChange}
                                            errorMessage={errors.tahunLulusSekolah}
                                            isRequired
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            forInput="namaPerguruanTinggi"
                                            label="Nama Perguruan Tinggi"
                                            placeholder="Masukkan Nama Perguruan Tinggi"
                                            value={formDataRef.current.namaPerguruanTinggi}
                                            onChange={handleInputChange}
                                            type="text"
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            forInput="tahunLulusPerguruanTinggi"
                                            label="Tahun Lulus Perguruan Tinggi"
                                            placeholder="Masukkan Tahun Lulus Perguruan Tinggi"
                                            value={formDataRef.current.tahunLulusPerguruanTinggi}
                                            onChange={handleInputChange}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5>Berkas</h5>
                                <Button
                                    classType="success"
                                    label="Unggah Sertifikat" 
                                    iconName="upload"
                                    onClick={addFileUpload}
                                />
                            </div>
                            <div className="card-body">

                            <label className="form-label fw-bold">Scan Sertifikat (.pdf, .jpg, .png)</label>
                                <table className="table table-bordered table-striped text-center">
                                    <thead>
                                        <tr>
                                        <th style={{ width: "10%" }}>No.</th>
                                        <th style={{ width: "80%" }}>Sertifikat</th>
                                        <th style={{ width: "10%" }}>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {sertifikatFiles.length > 0 ? (
                                        sertifikatFiles.map((file, index) => (
                                        <tr key={file.id}>
                                            <td>{index + 1}</td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept=".pdf,.jpg,.png"
                                                        ref={file.ref}
                                                        onChange={() =>
                                                            handleFileChange(file.ref, "pdf,jpg,png")
                                                        }
                                                        required
                                                    />
                                                </td>
                                            <td>
                                            <Icon
                                                name="cross"
                                                type="Bold"
                                                cssClass="btn px-1 py-0 text-danger"
                                                onClick={() => removeFileUpload(file.id)}
                                            />
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-muted py-3">
                                                <i className="fas fa-info-circle"></i> Tidak ada sertifikat.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <FileUpload 
                                            forInput="fileIjazah"
                                            label="Scan Ijazah (.pdf, .jpg, .png)" 
                                            ref={ijazahRef}
                                            formatFile=".pdf,.jpg,.png" 
                                            isRequired 
                                            onChange={() => 
                                                handleFileChange(ijazahRef, "pdf,jpg,png")
                                            }
                                            errorMessage={errors.fileIjazah}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FileUpload
                                            forInput="fileKtp"
                                            label="Scan KTP (.pdf, .jpg, .png)"
                                            ref={ktpRef}
                                            formatFile=".pdf,.jpg,.png"
                                            onChange={() => 
                                                handleFileChange(ktpRef, "pdf,jpg,png")
                                            }
                                            isRequired
                                            errorMessage={errors.fileKtp}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Riwayat Pekerjaan</h5>
                            <Button
                                classType="success"
                                label="Tambah Riwayat"
                                iconName="plus"
                                onClick={handleTambahClick}
                            />
                        </div>
                            <div className="card-body">
                                {isFormVisible && (
                                    <div className="card">
                                        <div className="card-header">
                                        <h5>Tambah Riwayat Pekerjaan</h5>
                                        </div>
                                        <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                            {isError.error && (
                                                <div className="alert alert-danger mt-2" role="alert">
                                                    {isError.message}
                                                </div>
                                            )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                            <Input
                                                label="Nama Perusahaan"
                                                type="text"
                                                name="perusahaan"
                                                placeholder="Masukkan Nama Perusahaan"
                                                value={formRiwayatPekerjaan.perusahaan}
                                                onChange={handleInputRiwayat}
                                            />
                                            </div>

                                            <div className="col-md-6">
                                            <Input
                                                label="Jabatan"
                                                type="text"
                                                name="jabatan"
                                                placeholder="Masukkan Jabatan"
                                                value={formRiwayatPekerjaan.jabatan}
                                                onChange={handleInputRiwayat}
                                            />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    label="Periode Mulai"
                                                    type="text"
                                                    name="periodeMulai"
                                                    placeholder="Masukkan Periode Mulai (20xx)"
                                                    value={formRiwayatPekerjaan.periodeMulai}
                                                    onChange={handleInputRiwayat}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Periode Selesai"
                                                    type="text"
                                                    name="periodeAkhir"
                                                    placeholder="Masukkan Periode Akhir (20xx)"
                                                    value={formRiwayatPekerjaan.periodeAkhir}
                                                    onChange={handleInputRiwayat}
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                                classType="secondary mt-3"
                                                label="Batal"
                                                iconName="cross"
                                                onClick={handleBatalClick}
                                            />
                                            <Button
                                                classType="primary mt-3"
                                                label="Simpan"
                                                iconName="check"
                                                onClick={handleSimpanClick}
                                            />
                                        </div>
                                        </div>
                                    </div>
                                )}
                                <table className={`table table-bordered table-striped text-center ${isFormVisible ? "mt-3" : ""}`}>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Perusahaan</th>
                                            <th>Jabatan</th>
                                            <th>Periode</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {records.length > 0 ? (
                                        records.map((record, index) => (
                                            <tr key={record.id}>
                                                <td>{index + 1}</td>
                                                <td>{record.perusahaan}</td>
                                                <td>{record.jabatan}</td>
                                                <td>{record.periode}</td>
                                                <td>
                                                    <Icon
                                                        name="cross"
                                                        type="Bold"
                                                        cssClass="btn px-1 py-0 text-danger"
                                                        onClick={() => handleDeleteClick(record.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-muted py-3">
                                                <i className="fas fa-info-circle"></i> Tidak ada data riwayat pekerjaan.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header"><h5>Pernyataan</h5></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Apabila kami ada pengiriman dokumen/materi pembelajaran. Alamat mana yang anda pilih untuk pengiriman tersebut<span className="text-danger">*</span></label>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="checkAlamat"
                                                        value="Rumah"
                                                        checked={formDataRef.current.tujuanPengiriman === "Rumah"}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <label className="form-check-label">Rumah</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="checkAlamat"
                                                        value="Kantor"
                                                        checked={formDataRef.current.tujuanPengiriman === "Kantor"}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <label className="form-check-label">Kantor</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Dengan ini saya menyatakan bahwa form pendaftaran ini telah saya baca dana saya isi secara lengkap dan benar<span className="text-danger">*</span></label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center gap-2">
                                                    <input 
                                                        className="form-check-input"
                                                        type="checkbox" 
                                                        checked={isChecked}
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                     />
                                                    <label className="form-check-label">Ya</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            classType="primary float-end mt-3"
                            label="Daftar"
                            iconName="add"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        )}
        </div>
    </>
    );
}