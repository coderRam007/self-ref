import './filmPopup.css';
import { useEffect, useState } from "react";

import {Dialog} from 'primereact/dialog';
function FilmPopup({card,isVisible,onHidePopup}) {
    const [visible, setVisible] = useState(false);

    const hidePopup= () => {
        setVisible(false);
        onHidePopup();
    };
    useEffect(()=>{
        if(isVisible)
            setVisible(true);
    },[card,isVisible]);
    return (
        <div>
            <Dialog header={card.imageName} visible={visible} style={{width:'50vw',borderRadius:'7%', backgroundColor:'black',color:'white'}} modal onHide={hidePopup}>
                <div style={{ float:'left',marginTop:'20px' }}>
                <img src={card.imageFile} alt="Example" class='popupImage' />
                    <div><b>Cast:</b><br/>{card.cast}</div><br/>
                    <div><b>Genre:</b><br/>{card.category}</div><br/>
                    <div class='description'><b>Description:</b><br/>{card.description}</div>
                </div>
            </Dialog>
        </div>
    );
};

export default FilmPopup;