import React, { useEffect, useState } from "react";
import Header from "../common/header/tabmenuheader";
import { useLocation, useNavigate } from "react-router-dom";
import "./upload.css";
function Upload() {
  const location = useLocation(null);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState("");
  const [url, setUrl] = useState("");
  const [genreImageName, setGenreImageName] = useState("");
  const [genreImageFile, setGenreImageFile] = useState("");
  const [genreCategory,setGenreCategory]=useState( location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1));
  const [cast, setGenreCast] = useState("");
  const [description, setDescription] = useState("");
  const navigate=useNavigate();
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  useEffect(() => {
    if (
      location.pathname.includes("image") ||
      location.pathname.includes("pdf")
    ) {
      setImageToUpdate(
        location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
      );
      if (imageToUpdate === "image") setUrl("addImage");
      else setUrl("addPdf");
    }
    else{
      switch(genreCategory){
        case 'horror':
          setGenreCategory('Horror');
          break;
        case 'action':
          setGenreCategory('Action');
          break;
        case 'romantic':
          setGenreCategory('Romance');
          break;
        case 'comedy':
          setGenreCategory('Comedy');
          break;
        case 'scifi':
          setGenreCategory('Sci-fi');
          break;
        default:
          break;
      }
    }
  }, [location, imageToUpdate,genreCategory]);
  const handleImagePdfSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(`${imageToUpdate}Name`, imageName);
    formData.append(`${imageToUpdate}File`, imageFile);
    try {
      const response = await fetch(`http://localhost:5125/${url}`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Image uploaded successfully!");
        if(imageToUpdate==='pdf')
          navigate('/pdfs');
        else
          navigate('/images');
      } else {
        console.error("Error uploading image.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleGenreChange=(e)=>{
    setGenreImageFile(e.target.files[0]);
  }
  const handleGenreSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(`imageName`, genreImageName);
    formData.append(`imageFile`, genreImageFile);
    formData.append("genre", genreCategory);
    formData.append("cast", cast);
    formData.append("description", description);
    try {
      const response = await fetch(`http://localhost:5125/addGenre`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Image uploaded successfully!");
        navigate('/genre');
      }
      else {
        console.error("Error uploading image.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div>
      <Header />
      {imageToUpdate !== "" && (
        <div class="upload-container">
          <h1>Upload {imageToUpdate}</h1>
          <form onSubmit={handleImagePdfSubmit}>
            <h2>
              {" "}
              {imageToUpdate} Name:&nbsp;
              <input
                class="upload-input"
                type="text"
                placeholder="Image Name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
              />
              <br />
            </h2>
            <h2>
              {" "}
              {imageToUpdate} file:
              <input
                type="file"
                class="upload-input"
                onChange={handleImageChange}
              />
            </h2>
            <br />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
      {imageToUpdate === "" && (
        <div className="upload-container-genre">
          <h1>Upload  {genreCategory} Film</h1>
          <form onSubmit={handleGenreSubmit}>
          <h2>
              {" "}
              Film Name:&nbsp;
              <input
                class="upload-input"
                type="text"
                placeholder="Image Name"
                value={genreImageName}
                onChange={(e) => setGenreImageName(e.target.value)}
              />
              <br />
            </h2>
            <h2>
              {" "}
              Cast:&nbsp;
              <input
                class="upload-input"
                type="text"
                placeholder="Image Name"
                value={cast}
                onChange={(e) => setGenreCast(e.target.value)}
              />
              <br />
            </h2>
            <h2>
              {" "}
              Description:&nbsp;
              <input
                class="upload-input"
                type="text"
                placeholder="Image Name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
            </h2>
          <h2>
              {" "}
              Film Image:
              <input
                type="file"
                class="upload-input"
                onChange={handleGenreChange}
              />
            </h2>
            <br />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Upload;
