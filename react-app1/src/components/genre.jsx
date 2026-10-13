import "./genre.css";
import Header from "../common/header/tabmenuheader";
import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../common/DataContext/DataContext";
function Genre() {
  const [data, setData] = useState(null);
  const { setCommonData, setTrigger } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5125/getGenreImages")
      .then((response) => response.json())
      .then((data) => {
        var modifiedData = data.map((item) => ({
          imageName: item.imageName,
          imageFile: "data:image/jpg;base64," + item.imageFile, // Assuming base64Data exists
          category: item.genre,
          cast: item.cast,
          description: item.description,
        }));
        setData(modifiedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  if (data === null) {
    return (
      <div class="spinner">
        <span></span>
      </div>
    );
  }
  function onShowMore(category){
    const categoryString = category;
    setCommonData(data.filter((item)=>(!item.category.localeCompare(category))));
    setTrigger(true);
    navigate('/genre/'+categoryString.toLowerCase().replace('-',''));
  }

  return (
    <div class="WholePage">
      <Header />
      <div class="grid">
        {data.map(
          (card, i) =>
            i < 50 && (
              <div>
                {i % 10 === 0 && (
                  <div class="categoryHeader">
                    {card.category}
                  </div>
                )}
                {i % 10 < 5 && (
                  <div class="images">
                    <div class="imageCard">
                      {i % 10 < 4 && (
                        <span>
                          <img src={card.imageFile} alt="someproblem"  class='card_img'/>
                          <div class="imageName">{card.imageName}</div>
                        </span>
                      )}
                      {i % 10 === 4 && (
                          <div class="link" onClick={()=>onShowMore(card.category)}>Show More</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
export default Genre;