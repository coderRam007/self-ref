import "./images.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Cards from "./common/card.jsx";
import Search from "./common/search.jsx";
import Header from "./common/tabmenuheader.jsx";
import EditDialog from "./common/editDialog.jsx";
function Images({ isPdf }) {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState(null);
  const [fcards, setFCards] = useState(null);
  const [count, setCount] = useState(0);
  const [ispdf, setIsPdf] = useState(false);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  useEffect(() => {
    if (isPdf) {
      fetch("http://localhost:5125/getPdfs")
        .then((response) => response.json())
        .then((data) => {
          var modifiedData = data.map((card) => ({
            imageName: card.pdfName,
            imageFile: card.pdfFile,
            isChecked: false,
          }));
          setData(modifiedData);
          setCards([...modifiedData]);
          setFCards([...modifiedData]);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:5125/getImages")
        .then((response) => response.json())
        .then((data) => {
          var modifiedData = data.map((card) => ({
            imageName: card.imageName,
            imageFile: card.imageFile,
            isChecked: false,
          }));
          setData(modifiedData);
          setCards([...modifiedData]);
          setFCards([...modifiedData]);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [isPdf]);
  const getImages = () => {
    if (isPdf) {
      fetch("http://localhost:5125/getPdfs")
        .then((response) => response.json())
        .then((data) => {
          var modifiedData = data.map((card) => ({
            imageName: card.pdfName,
            imageFile: card.pdfFile,
            isChecked: false,
          }));
          setData(modifiedData);
          setCards([...modifiedData]);
          setFCards([...modifiedData]);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:5125/getImages")
        .then((response) => response.json())
        .then((data) => {
          var modifiedData = data.map((card) => ({
            imageName: card.imageName,
            imageFile: card.imageFile,
            isChecked: false,
          }));
          setData(modifiedData);
          setCards([...modifiedData]);
          setFCards([...modifiedData]);
        })
        .catch((error) => console.error("Error:", error));
    }
  };
  useEffect(() => {
    if (cards) setCount(cards.filter((card) => card.isChecked).length);
  }, [cards]);
  useEffect(() => {
    if (fcards) setCards(fcards);
  }, [fcards]);
  useEffect(() => {
    if (isPdf) setIsPdf(true);
  }, [isPdf]);
  if (data == null) {
    return (
      <div class="spinner">
        <span></span>
      </div>
    );
  }
  const updateCardsByImageName = (imageName) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.imageName === imageName
          ? { ...card, isChecked: !card.isChecked }
          : card
      )
    );
  };

  function updateCards(cards) {
    setCards(cards);
  }

  return (
    <div class="WholePage">
      <Header />
      {isEditorVisible && updatedName !== "" && (
        <EditDialog
          isEditorVisible={true}
          currentImageName={updatedName}
          imageEdited={() => {
            getImages();
            setEditorVisible(false);
          }}
        />
      )}
      <div class="selectedCount">
        {count === 0 ? "" : `${count} of ${cards.length} selected`}
        &nbsp;&nbsp;&nbsp;
      </div>
      <Search
        filteredCards={data}
        onSearchChange={(filteredcards) => {
          updateCards(filteredcards);
        }}
      />
      <div class="grid">
        {cards.map((item, index) => (
          <div class="images" key={index}>
            <Cards
              imageName={item.imageName}
              photoPath={item.imageFile}
              isChecked={item.isChecked}
              isPdf={ispdf}
              dataToParent={(imageName) => {
                updateCardsByImageName(imageName);
              }}
              refreshAfterChange={() => getImages()}
              triggerEditDialog={(updatedName) => {
                setEditorVisible(true);
                setUpdatedName(updatedName);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
