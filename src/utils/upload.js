// import axios from "axios";

// const upload = async (file) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "fiverr");

//   try {
//     const res = await axios.post("https://api.cloudinary.com/v1_1/shanthish/image/upload", data);
//     const { url } = res.data;
//     return url;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default upload;




import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dwdag0eb5/image/upload", data);
    return res.data.secure_url;  // Use secure_url for HTTPS images
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return ""; // Return an empty string in case of error
  }
};

export default upload;
