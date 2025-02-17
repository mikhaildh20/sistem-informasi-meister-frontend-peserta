import Cookies from "js-cookie";
import { API_LINK } from "./Constants";

const uploadFile = async (file, folder = "Uploads") => {
  if (file != null) {
    const data = new FormData();
    data.append("file", file.files[0]);

    try {
      const response = await fetch(`${API_LINK}Upload/UploadFile?folder=${folder}`, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (response.ok) {
        return result.Hasil;
      } else {
        return "ERROR";
      }
    } catch (err) {
      return "ERROR";
    }
  } else return "";
};

export default uploadFile;
