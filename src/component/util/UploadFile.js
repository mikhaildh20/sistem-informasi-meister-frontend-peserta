import Cookies from "js-cookie";
import { API_LINK } from "./Constants";

const UploadFile = async (fileInput, type = "single", folder = "Uploads") => {
  if (!fileInput) return "";

  const data = new FormData();

  if (type === "single") {
    // Upload Single File
    if (fileInput.files.length > 0) {
      // console.log("Uploading single file:", fileInput.files[0]); // Debugging
      data.append("file", fileInput.files[0]);
    } else {
      return "ERROR";
    }

    try {
      const response = await fetch(`${API_LINK}Upload/UploadFile?folder=${folder}`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      // console.log("Response dari API (Single Upload):", result);

      return response.ok ? result.hasil : "ERROR";
    } catch (err) {
      return "ERROR";
    }
  } 
  
  else if (type === "multiple") {
    // Upload Multiple Files
    if (fileInput.length === 0) return "ERROR";

    console.log("Uploading multiple files:", fileInput); // Debugging
    Array.from(fileInput).forEach((file) => data.append("files", file.ref.current.files));

    try {
      const response = await fetch(`${API_LINK}Upload/UploadMultipleFiles?folder=${folder}`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log("Response dari API (Multiple Upload):", result);

      return response.ok ? result.hasil : "ERROR";
    } catch (err) {
      console.error("Error upload multiple files:", err);
      return "ERROR";
    }
  }

  return "ERROR";
};


export default UploadFile;
