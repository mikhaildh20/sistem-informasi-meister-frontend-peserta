import React, { useState, useRef } from "react";
import blank from "../../../assets/blankPicture.png";
import Alert from "../../part/Alert";
import Dropdown from "../../part/Dropdown";
import Icon from "../../part/Icon";
import Checkbox from "../../part/CheckBox";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Input from "../../part/Input";
import FileUpload from "../../part/FileUpload";
import SweetAlert from "../../util/SweetAlert";

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


const Add = () => {
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState({ error: false, message: "" });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [formData, setFormData] = useState({
        perusahaan: '',
        jabatan: '',
        periodeMulai: '',
        periodeAkhir: '',
    });

    const formDataRef = useRef({
        kel_id: "-",
        kur_id: "-",
        pes_nama: "",
        pro_id: "",
        pes_tempat_lahir: "",
        pes_tanggal_lahir: "",
        pes_angkatan: "",
        pes_jenis_kelamin: "",
        pes_alamat: "",
        pes_kodepos: "",
        pes_email: "",
        pes_hp: "",
        pes_golongan_darah: "",
        pes_kewarganegaraan: "",
        pes_agama: "",
        pes_status_perkawinan: "",
        pes_email_perusahaan: "",
        pes_alamat_perusahaan: "",
        pes_kodepos_perusahaan: "",
        pes_hp_perusahaan: "",
        pes_ukuran_sepatu: "",
        pes_ukuran_kemeja: "",
        pes_no_darurat: "",
        pes_nama_darurat: "",
        pes_hubungan_darurat: "",
        pes_media_sosial: "",
        pes_kursus: "",
        pes_hobi: "",
        pes_pendidikan_terakhir: "",
        pes_nama_sekolah: "",
        pes_tahun_lulus_sekolah: "",
        pes_perguruan_tinggi: "",
        pes_tahun_lulus_perguruan: "",
        pes_ijazah: "",
        pes_ktp: "",
        pes_sertifikat: "",
        pes_tujuan_kirim: "",
        pes_created_by: "aurelio.ramadhan",
    });

    // const userSchema = object({
    //     pes_nama: string()
    //         .max(100, "maksimum 100 karakter")
    //         .required("harus diisi!"),
    //     pro_id: string().required("harus diisi!"),
    //     pes_tempat_lahir: string().required("harus diisi!"),
    //     pes_tanggal_lahir: string().required("harus diisi!"),
    //     pes_angkatan: string().required("harus diisi!"),
    //     pes_jenis_kelamin: string().required("harus diisi!"),
    //     pes_alamat: string().required("harus diisi!"),
    //     pes_kodepos: string().required("harus diisi!"),
    //     pes_email: string().required("harus diisi!"),
    //     pes_hp: string().required("harus diisi!"),
    //     pes_golongan_darah: string().required("harus diisi!"),
    //     pes_kewarganegaraan: string().required("harus diisi!"),
    //     pes_agama: string().required("harus diisi!"),
    //     pes_status_perkawinan: string().required("harus diisi!"),
    //     pes_email_perusahaan: string(),
    //     pes_alamat_perusahaan: string(),
    //     pes_kodepos_perusahaan: string(),
    //     pes_hp_perusahaan: string(),
    //     pes_ukuran_sepatu: string().required("harus diisi!"),
    //     pes_ukuran_kemeja: string().required("harus diisi!"),
    //     pes_no_darurat: string(),
    //     pes_nama_darurat: string(),
    //     pes_hubungan_darurat: string(),
    //     pes_media_sosial: string(),
    //     pes_kursus: string(),
    //     pes_hobi: string(),
    //     pes_pendidikan_terakhir: string().required("harus diisi!"),
    //     pes_nama_sekolah: string().required("harus diisi!"),
    //     pes_tahun_lulus_sekolah: string().required("harus diisi!"),
    //     pes_perguruan_tinggi: string(),
    //     pes_tahun_lulus_perguruan: string(),
    //     pes_ijazah: string().required("harus diisi!"),
    //     pes_ktp: string().required("harus diisi!"),
    //     pes_sertifikat: string(),
    //     pes_tujuan_kirim: string().required("harus diisi!"),
    // });

    const [records, setRecords] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTambahClick = () => {
        setIsFormVisible(true); // Show the form
    };

    const handleBatalClick = () => {
    setErrors({});
    setIsError({ error: false, message: "" });
    setIsFormVisible(false); // Hide the form
    setFormData({
        perusahaan: '',
        jabatan: '',
        periodeMulai: '',
        periodeAkhir: '',
        });
    };

    const handleSimpanClick = () => {
        const requiredFields = ["perusahaan", "jabatan", "periodeMulai", "periodeAkhir"];
        
        // Validate fields dynamically
        const newErrors = requiredFields.reduce((acc, field) => {
            if (!formData[field]?.trim()) {
                acc[field] = `Field ${field} harus diisi!`;
            }
            return acc;
        }, {});
    
        // Validate Periode (Only 4-digit numbers)
        const yearPattern = /^\d{4}$/;
        if (!yearPattern.test(formData.periodeMulai)) {
            newErrors.periodeMulai = "Periode Mulai harus berupa angka 4 digit (contoh: 2020)!";
        }
        if (!yearPattern.test(formData.periodeAkhir)) {
            newErrors.periodeAkhir = "Periode Akhir harus berupa angka 4 digit (contoh: 2025)!";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsError({ error: true, message: "Harap isi semua field dengan benar!" });
            return;
        }
    
        // Ensure periodeMulai is earlier than periodeAkhir
        if (parseInt(formData.periodeMulai) > parseInt(formData.periodeAkhir)) {
            setIsError({ error: true, message: "Periode Mulai tidak boleh lebih besar dari Periode Akhir!" });
            return;
        }
    
        // Check for duplicate entries
        const isDuplicate = records.some(
            (record) =>
                record.perusahaan.toLowerCase() === formData.perusahaan.toLowerCase() &&
                record.jabatan.toLowerCase() === formData.jabatan.toLowerCase()
        );
    
        if (isDuplicate) {
            setIsError({ error: true, message: "Riwayat pekerjaan ini sudah ada!" });
            return;
        }
    
        setErrors({});
        setIsError({ error: false, message: "" });
    
        const newRecord = {
            id: records.length + 1,
            perusahaan: formData.perusahaan.trim(),
            jabatan: formData.jabatan.trim(),
            periode: `${formData.periodeMulai}-${formData.periodeAkhir}`,
        };
    
        setRecords((prev) => [...prev, newRecord]); // Add new record to table
        handleBatalClick(); // Hide the form after saving
    };        


    const handleDeleteClick = (id) => {
        setRecords((prev) => prev.filter((record) => record.id !== id)); // Remove record by id
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        setPhoto(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        document.getElementById("photoInput").click();
    };

    

    return(
        <div className="custom-container">
            {/* {isError.error && (
                <div className="flex-fill">
                    <Alert type="danger" message="Error" />
                </div>
            )} */}
            <div className="card mt-3">
                <div className="card-header"><h2 className="add-title">Formulir Pendaftaran</h2></div>
                <div className="card-body">
                    <form onSubmit=""> 
                    <div className="card">
                    <div className="card-header"><h5>Data Pribadi</h5></div>
                        <div className="card-body">
                                <div className="row">
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Pas Foto</label>
                                    <div className="border rounded p-2 d-flex flex-column align-items-center">
                                        <div className="w-100">
                                            <img
                                            src={photo || blank}
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
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Nama Peserta"
                                                    type="text"
                                                    placeholder="Masukkan Nama Peserta"
                                                    value={formDataRef.current.pes_nama}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Program Meister"
                                                    arrData={listProgramMeister}
                                                    value={formDataRef.current.pro_id}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Tempat Lahir"
                                                    type="text"
                                                    placeholder="Masukkan Tempat Lahir"
                                                    value={formDataRef.current.pes_tempat_lahir}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Tanggal Lahir"
                                                    type="date"
                                                    value={formDataRef.current.pes_tanggal_lahir}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Angkatan"
                                                    type="text"
                                                    placeholder="Masukkan Angkatan (20xx)"
                                                    value={formDataRef.current.pes_angkatan}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Jenis Kelamin"
                                                    arrData={listJenisKelamin}
                                                    value={formDataRef.current.pes_jenis_kelamin}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Alamat"
                                                    type="text"
                                                    placeholder="Masukkan Alamat"
                                                    value={formDataRef.current.pes_alamat}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Kode Pos"
                                                    type="text"
                                                    placeholder="Masukkan Kode Pos"
                                                    value={formDataRef.current.pes_kodepos}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    placeholder="Masukkan Email"
                                                    value={formDataRef.current.pes_email}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Nomor HP"
                                                    type="text"
                                                    placeholder="Masukkan Nomor HP"
                                                    value={formDataRef.current.pes_hp}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Golongan Darah"
                                                    arrData={listGolonganDarah}
                                                    value={formDataRef.current.pes_golongan_darah}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Kewarganegaraan"
                                                    arrData={listKewarganegaraan}
                                                    value={formDataRef.current.pes_kewarganegaraan}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Agama"
                                                    arrData={listAgama}
                                                    value={formDataRef.current.pes_agama}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Status Perkawinan"
                                                    arrData={listStatusPerkawinan}
                                                    value={formDataRef.current.pes_status_perkawinan}
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
                                                    label="Email Perusahaan"
                                                    type="text"
                                                    placeholder="Masukkan Email Perusahaan"
                                                    value={formDataRef.current.pes_email_perusahaan}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Alamat Perusahaan"
                                                    type="text"
                                                    placeholder="Masukkan Alamat Perusahaan"
                                                    value={formDataRef.current.pes_alamat_perusahaan}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Kode Pos Perusahaan"
                                                    placeholder="Masukkan Kode Pos Perusahaan"
                                                    type="text"
                                                    value={formDataRef.current.pes_kodepos_perusahaan}
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
                                                    label="Telepon Perusahaan"
                                                    placeholder="Masukkan Telepon Perusahaan"
                                                    type="text"
                                                    value={formDataRef.current.pes_hp_perusahaan}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Ukuran Sepatu"
                                                    placeholder="Masukkan Ukuran Sepatu (xx)"
                                                    type="text"
                                                    value={formDataRef.current.pes_ukuran_sepatu}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Dropdown
                                                    label="Ukuran Kemeja"
                                                    arrData={listUkuranBaju}
                                                    value={formDataRef.current.pes_ukuran_kemeja}
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
                                                    label="Kontak Darurat"
                                                    type="text"
                                                    placeholder="Masukkan Kontak Darurat (08xxxxx)"
                                                    value={formDataRef.current.pes_no_darurat}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Nama Kontak Darurat"
                                                    type="text"
                                                    placeholder="Masukkan Nama Kontak"
                                                    value={formDataRef.current.pes_nama_darurat}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Hubungan Kontak Darurat"
                                                    placeholder="Masukkan Hubungan Kontak"
                                                    value={formDataRef.current.pes_hubungan_darurat}
                                                    type="text"
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
                                                    label="Media Sosial"
                                                    placeholder="Masukkan Media Sosial"
                                                    value={formDataRef.current.pes_media_sosial}
                                                    type="text"
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Kursus"
                                                    placeholder="Masukkan Kursus"
                                                    value={formDataRef.current.pes_kursus}
                                                    type="text"
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Hobi"
                                                    placeholder="Masukkan Hobi"
                                                    value={formDataRef.current.pes_hobi}
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
                                            label="Pendidikan Terakhir"
                                            arrData={listPendidikanTerakhir}
                                            value={formDataRef.current.pes_pendidikan_terakhir}
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            label="Nama Sekolah"
                                            type="text"
                                            placeholder="Masukkan Nama Sekolah"
                                            value={formDataRef.current.pes_nama_sekolah}
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            label="Tahun Lulus Sekolah"
                                            placeholder="Masukkan Tahun Lulus Sekolah"
                                            value={formDataRef.current.pes_tahun_lulus_sekolah}
                                            type="text"
                                            isRequired
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            label="Nama Perguruan Tinggi"
                                            placeholder="Masukkan Nama Perguruan Tinggi"
                                            type="text"
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            label="Tahun Lulus Perguruan Tinggi"
                                            placeholder="Masukkan Tahun Lulus Perguruan Tinggi"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header"><h5>Berkas</h5></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FileUpload
                                            label="Scan Ijazah Pendidikan Terakhir (.pdf, .jpg, .png)"
                                            formatFile=".pdf,.jpg,.png"
                                            isRequired
                                            // ref={fileGambarRef}
                                            // onChange={() =>
                                            //     handleFileChange(fileGambarRef, "pdf,jpg,png")
                                            // }
                                            // errorMessage={errors.gambarAlatMesin}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FileUpload
                                            label="Scan KTP (.pdf, .jpg, .png)"
                                            formatFile=".pdf,.jpg,.png"
                                            isRequired
                                            // ref={fileGambarRef}
                                            // onChange={() =>
                                            //     handleFileChange(fileGambarRef, "pdf,jpg,png")
                                            // }
                                            // errorMessage={errors.gambarAlatMesin}
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <FileUpload
                                            label="Scan Bukti Sertifikat Pelatihan 1 (.pdf, .jpg, .png)"
                                            formatFile=".pdf,.jpg,.png"
                                            isRequired
                                            // ref={fileGambarRef}
                                            // onChange={() =>
                                            //     handleFileChange(fileGambarRef, "pdf,jpg,png")
                                            // }
                                            // errorMessage={errors.gambarAlatMesin}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FileUpload
                                            label="Scan Bukti Sertifikat Pelatihan 2 (.pdf, .jpg, .png)"
                                            formatFile=".pdf,.jpg,.png"
                                            isRequired
                                            // ref={fileGambarRef}
                                            // onChange={() =>
                                            //     handleFileChange(fileGambarRef, "pdf,jpg,png")
                                            // }
                                            // errorMessage={errors.gambarAlatMesin}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FileUpload
                                            label="Scan Bukti Sertifikat Pelatihan 3 (.pdf, .jpg, .png)"
                                            formatFile=".pdf,.jpg,.png"
                                            isRequired
                                            // ref={fileGambarRef}
                                            // onChange={() =>
                                            //     handleFileChange(fileGambarRef, "pdf,jpg,png")
                                            // }
                                            // errorMessage={errors.gambarAlatMesin}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FileUpload
                                            label="Scan Bukti Sertifikat Pelatihan 4 (.pdf, .jpg, .png)"
                                            formatFile=".pdf,.jpg,.png"
                                            isRequired
                                            // ref={fileGambarRef}
                                            // onChange={() =>
                                            //     handleFileChange(fileGambarRef, "pdf,jpg,png")
                                            // }
                                            // errorMessage={errors.gambarAlatMesin}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Riwayat Pekerjaan</h5>
                            <Button
                                classType="primary"
                                label="Tambah"
                                iconName="plus"
                                onClick={handleTambahClick}
                            />
                        </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped text-center">
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
                                                        onClick={() => handleDelete(record.id)}
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

                                {isFormVisible && (
                                    <div className="card mt-3">
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
                                                value={formData.perusahaan}
                                                onChange={handleInputChange}
                                            />
                                            </div>

                                            <div className="col-md-6">
                                            <Input
                                                label="Jabatan"
                                                type="text"
                                                name="jabatan"
                                                placeholder="Masukkan Jabatan"
                                                value={formData.jabatan}
                                                onChange={handleInputChange}
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
                                                value={formData.periodeMulai}
                                                onChange={handleInputChange}
                                            />
                                            </div>

                                            <div className="col-md-6">
                                            <Input
                                                label="Periode Selesai"
                                                type="text"
                                                name="periodeAkhir"
                                                placeholder="Masukkan Periode Akhir (20xx)"
                                                value={formData.periodeAkhir}
                                                onChange={handleInputChange}
                                            />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                            classType="secondary mt-3"
                                            label="Batal"
                                            iconName="cross"
                                            onClick={handleBatalClick} // Hide the form when cancelled
                                            />
                                            <Button
                                            classType="primary mt-3"
                                            label="Simpan"
                                            iconName="check"
                                            onClick={handleSimpanClick} // Save the form data to the table
                                            />
                                        </div>
                                        </div>
                                    </div>
                                    )}
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
                                            <input type="radio" className="form-check-input" name="checkAlamat" value="Rumah" />
                                            <label className="form-check-label">Rumah</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <input type="radio" className="form-check-input" name="checkAlamat" value="Kantor" />
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
                                                    <input className="form-check-input" type="checkbox" />
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
                                    // onClick={() => onChangePage("index")}
                                />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add;