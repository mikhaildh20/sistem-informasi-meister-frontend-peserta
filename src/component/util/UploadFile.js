import Cookies from "js-cookie";
import { API_LINK } from "./Constants";

// const uploadFile = async (file) => {
//   if (file != null) {
//     const data = new FormData();
//     // const jwtToken = Cookies.get("jwtToken");
//     data.append("file", file.files[0]);

//     try {
//       const response = await fetch(API_LINK + "Upload/UploadFile", {
//         method: "POST",
//         body: data,
//         // headers: {
//         //   Authorization: "Bearer " + jwtToken,
//         // },
//       });
//       const result = await response.json();
//       if (response.ok) {
//         return result;
//       } else {
//         return "ERROR";
//       }
//     } catch (err) {
//       return "ERROR";
//     }
//   } else return "";
// };
const uploadFile = async (
  photoRef,
  sertifikatFileRef1,
  sertifikatFileRef2,
  sertifikatFileRef3,
  sertifikatFileRef4
) => {
  const formData = new FormData();
  // const jwtToken = Cookies.get("jwtToken");

  // Tambahkan foto (hanya 1)
  if (photoRef?.files.length > 0) {
    formData.append("files", fotoFileRef.files[0]);
  }

  // Tambahkan sertifikat (maksimal 4)
  const sertifikatRefs = [
    sertifikatFileRef1,
    sertifikatFileRef2,
    sertifikatFileRef3,
    sertifikatFileRef4,
  ];

  sertifikatRefs.forEach((ref) => {
    if (ref?.files.length > 0) {
      formData.append("files", ref.files[0]);
    }
  });

  try {
    const response = await fetch(API_LINK + "Upload/UploadFile", {
      method: "POST",
      body: formData,
      // headers: {
      //   Authorization: "Bearer " + jwtToken,
      // },
    });

    const result = await response.json();
    return response.ok ? result : "ERROR";
  } catch (error) {
    return "ERROR";
  }
};



export default uploadFile;
