import { API_LINK } from "./Constants";

const UploadFile = async (fileInput, type = "single", folder = "Uploads") => {
    if (!fileInput) return "";

    const data = new FormData();

    if (type === "multiple") {
        const files = fileInput.files || [];
        if (files.length === 0) return "ERROR";
        
        Array.from(files).forEach((file) => {
            data.append("files", file);
        });

        try {
            const response = await fetch(`${API_LINK}Upload/UploadMultipleFiles?folder=${folder}`, {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            
            return response.ok ? result.hasil : "ERROR";
        } catch (err) {
            console.log("Error upload multiple files:", err);
            return "ERROR";
        }
    }

    if (fileInput.files.length === 0) return "ERROR";

    data.append("file", fileInput.files[0]);

    try {
        const response = await fetch(`${API_LINK}Upload/UploadFile?folder=${folder}`, {
            method: "POST",
            body: data,
        });

        const result = await response.json();

        return response.ok ? result.hasil : "ERROR";
    } catch (err) {
        console.error("Error upload:", err);
        return "ERROR";
    }
};


export default UploadFile;
