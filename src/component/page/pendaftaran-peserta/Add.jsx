import React, { useState } from "react";
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
    {Value: "Meister Otomotif", Text: "Meister Otomotif"},
    {Value: "Malaysian Meister Program", Text: "Malaysian Meister Program"},
    {Value: "Advanced Technology Meister Programme (ATMP)", Text: "Advanced Technology Meister Programme (ATMP)"},
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
                    <form action=""> 
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
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Program Meister"
                                                    arrData={listProgramMeister}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Tempat Lahir"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Tanggal Lahir"
                                                    type="date"
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Angkatan"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Jenis Kelamin"
                                                    arrData={listJenisKelamin}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Alamat"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Kode Pos"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Input
                                                    label="Nomor HP"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Golongan Darah"
                                                    arrData={listGolonganDarah}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Kewarganegaraan"
                                                    arrData={listKewarganegaraan}
                                                    isRequired
                                                />
                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Agama"
                                                    arrData={listAgama}
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <Dropdown
                                                    label="Status Perkawinan"
                                                    arrData={listStatusPerkawinan}
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
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Alamat Perusahaan"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Kode Pos Perusahaan"
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
                                                    label="Telepon Perusahaan"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Ukuran Sepatu"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Dropdown
                                                    label="Ukuran Kemeja"
                                                    arrData={listUkuranBaju}
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
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Nama Kontak Darurat"
                                                    type="text"
                                                    isRequired
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Hubungan Kontak Darurat"
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
                                                    type="text"
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Kursus"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <Input
                                                    label="Hobi"
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
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            label="Nama Sekolah"
                                            type="text"
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Input
                                            label="Tahun Lulus Sekolah"
                                            type="text"
                                            isRequired
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <Input
                                            label="Nama Perguruan Tinggi"
                                            type="text"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <Input
                                            label="Tahun Lulus Perguruan Tinggi"
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
                                    {records.map((record, index) => (
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
                                        ))}
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
                                                value={formData.perusahaan}
                                                onChange={handleInputChange}
                                            />
                                            </div>

                                            <div className="col-md-6">
                                            <Input
                                                label="Jabatan"
                                                type="text"
                                                name="jabatan"
                                                value={formData.jabatan}
                                                onChange={handleInputChange}
                                            />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                            <Input
                                                label="Periode Mulai 4 Digit (XXXX)"
                                                type="text"
                                                name="periodeMulai"
                                                value={formData.periodeMulai}
                                                onChange={handleInputChange}
                                            />
                                            </div>

                                            <div className="col-md-6">
                                            <Input
                                                label="Periode Selesai 4 Digit (XXXX)"
                                                type="text"
                                                name="periodeAkhir"
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
                                    // onClick={() => onChangePage("index")}
                                />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add;