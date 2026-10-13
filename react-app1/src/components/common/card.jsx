import "./cards.css";
import { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

function Cards({
  isGenre,
  imageName,
  photoPath,
  isChecked,
  isPdf,
  dataToParent,
  refreshAfterChange,
  triggerEditDialog,
}) {
  const optionsMenu = useRef(null);
  const items = [
    {
      items: [
        {
          label: "Edit",
          icon: "pi pi-file-edit",
          command: () => {
            triggerEditDialog(imageName);
          },
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => {
            if (isPdf) removePdf();
            else removeImage();
          },
        },
        {
          label: "Download",
          icon: "pi pi-download",
          command: () => {
            if (isPdf) downloadPdf();
            else downloadImage();
          },
        },
      ],
    },
  ];
  const removeImage = () => {
    fetch(`http://localhost:5125/removeImage/${imageName}`, {
      method: "Delete",
    })
      .then((response) => response)
      .then((data) => {
        refreshAfterChange();
      })
      .catch((error) => console.error("Error:", error));
  };
  const removePdf = () => {
    fetch(`http://localhost:5125/removePdf/${imageName}`, { method: "Delete" })
      .then((response) => response)
      .then((data) => {
        refreshAfterChange();
      })
      .catch((error) => console.error("Error:", error));
  };
const  openPdfInNewWindow=()=>{
    var byteCharacters = atob(photoPath);
var byteNumbers = new Array(byteCharacters.length);
for (var i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}
var byteArray = new Uint8Array(byteNumbers);
var file = new Blob([byteArray], { type: 'application/pdf;base64' });
var fileURL = URL.createObjectURL(file);
window.open(fileURL);
    
  }
  const downloadImage = () => {
    const toDownload = document.createElement("a");
    toDownload.download = imageName + ".png";
    toDownload.href = "data:image/png;base64," + photoPath;
    toDownload.click();
  };
  const downloadPdf = () => {
    const toDownload = document.createElement("a");
    toDownload.download = imageName + ".pdf";
    toDownload.href = "data:application/pdf;base64," + photoPath;
    toDownload.click();
  };
  return (
    <div class="imageCard">
      <Menu model={items} popup ref={optionsMenu} />
      {!isGenre && (
        <span class="imageCheckBoxes">
          <input
            type="checkbox"
            class="checkBox"
            checked={isChecked}
            onChange={() => dataToParent(imageName)}
          />
        </span>
      )}
      {isPdf ? (
        <img src={require("../../pdf.jpeg")} alt="prob"  class='card_img' onClick={()=>{openPdfInNewWindow()}}/>
      ) : (
        <img src={`data:image/jpg;base64,${photoPath}`} alt="someproblem" class='card_img'/>
      )}
      <div class="imageName">
        {imageName}&nbsp;&nbsp;&nbsp;
        <Button
          icon="pi pi-ellipsis-v"
          rounded
          style={{
            backgroundColor: "black",
            color: "white",
            border: "0px",
            paddingBottom: "5px",
            marginTop: "3px",
          }}
          onClick={(e) => {
            optionsMenu.current.toggle(e);
          }}
        ></Button>
      </div>
    </div>
  );
}
export default Cards;
