import React, { useState } from "react";
import blank from "../../../assets/blankPicture.png";

const Add = () => {
    
    const [photo, setPhoto] = useState(null);

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
            <div className="card mt-3">
                <div className="card-header"><h2 className="add-title fw-bold">Formulir Pendaftaran</h2></div>
                <div className="card-body">
                    <form action=""> 
                    <div className="card">
                    <div className="card-header"><h5>Data Pribadi</h5></div>
                        <div className="card-body">
                                <div className="row">
                                {/* Column 1: Photo Section */}
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Pas Foto</label>
                                    <div className="border rounded p-2 d-flex flex-column align-items-center">
                                        <div className="w-100">
                                            <img
                                            src={photo || blank}
                                            alt="Profile"
                                            className="img-fluid rounded"
                                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
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

                                    {/* Column 3: Input Fields 2 */}
                                    <div className="col-md-4">
                                        <div className="row">

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Nama Peserta <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Tanggal Lahir <span className="text-danger">*</span></label>
                                                <input type="date" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Jenis Kelamin <span className="text-danger">*</span></label>
                                                <select className="form-select" required>
                                                <option>Pilih Jenis Kelamin</option>
                                                <option>Laki-laki</option>
                                                <option>Perempuan</option>
                                                </select>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Kode Pos <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Nomor HP <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Kewarganegaraan <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Status Perkawinan <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Column 2: Input Fields 1 */}
                                    <div className="col-md-4">
                                        <div className="row">

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Program Meister <span className="text-danger">*</span></label>
                                                <select className="form-select" required>
                                                <option>Pilih Program Meister</option>
                                                <option>Program A</option>
                                                <option>Program B</option>
                                                </select>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Tempat Lahir <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Angkatan <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Alamat <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Email <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Golongan Darah <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Agama <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-4 mt-3">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Ukuran Sepatu <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Kursus</label>
                                                <input type="text" className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Ukuran Kemeja <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Hobi</label>
                                                <input type="text" className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mt-3">
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Media Sosial</label>
                                                <input type="text" className="form-control" required />
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label className="form-label fw-bold">Kontak Darurat</label>
                                                <input type="text" className="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                        </div>
                    </div>

                        <div className="card mt-3">
                            <div className="card-header"><h5>Data Pendidikan</h5></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-9 mb-3">
                                        <label className="form-label fw-bold">SMA/SMK/MA <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label className="form-label fw-bold">Tahun Lulus <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-9 mb-3">
                                        <label className="form-label fw-bold">Perguruan Tinggi</label>
                                        <input type="text" className="form-control" />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label className="form-label fw-bold">Tahun Lulus</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header"><h5>Data Berkas</h5></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Scan Ijazah Pendidikan Terakhir <span className="text-danger">*</span></label>
                                        <input type="file" className="form-control" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Scan KTP <span className="text-danger">*</span></label>
                                        <input type="file" className="form-control" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Scan Bukti Sertifikat Pelatihan 1</label>
                                        <input type="file" className="form-control" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Scan Bukti Sertifikat Pelatihan 2</label>
                                        <input type="file" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Scan Bukti Sertifikat Pelatihan 3</label>
                                        <input type="file" className="form-control" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Scan Bukti Sertifikat Pelatihan 4</label>
                                        <input type="file" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header"><h5>Data Riwayat Pekerjaan</h5></div>
                            <div className="card-body">
                                <table></table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add;