import { useContext, useState } from "react";
import { DataContext } from "../common/DataContext/DataContext";
import Header from "../common/header/tabmenuheader";
import FilmPopup from "../common/filmPopup/filmPopup";
function ShowMoreFilms(){
   const [cards,setCards]=useState(useContext(DataContext));
   const [isPopup,setIsPopup]=useState(false);
   const [popupCard,setPopupCard]=useState(null);
   const popupTrigger=(card)=>{
    setIsPopup(true);
    setPopupCard(card);
   }
    return(
        <div class="WholePage">
      <Header/>
      <div class="grid">
      {isPopup && <FilmPopup card={popupCard} isVisible={isPopup} onHidePopup={()=>setIsPopup(false)}/>}
      {cards?cards.data.map((card, index) => (
                    <>
                    {index===0 && <h1>{card.category}</h1>}
                    <div class="imageCard">
                    <div class="images" key={index}>
                    <img class='card_img'src={card.imageFile} alt="someproblem" onClick={()=>popupTrigger(card)} />
                          <div class="imageName">{card.imageName}</div>
                    </div>
                    </div>
                    </>
        )):'no data, navigate properly!!'}
      </div>
    </div>
    ) 
}
export default ShowMoreFilms;