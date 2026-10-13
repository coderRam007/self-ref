import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
function EditDialog({currentImageName,isEditorVisible,imageEdited}){
    const loc=useLocation(null);
    const [editedName,setEditedName]=useState('');
    const [visible,setVisible]=useState(isEditorVisible);
    const [url,setUrl]=useState('');
    useEffect(()=>{
        if(isEditorVisible)
            setVisible(true);
    },[editedName,isEditorVisible]);
    const hideEditPopup=()=>{
        setVisible(false);
        imageEdited();
    }
    useEffect(()=>{
        if(loc.pathname.includes('images'))
            setUrl(`http://localhost:5125/updateImage?imageName=${currentImageName}&updatedImage=${editedName}`);
            else
            setUrl(`http://localhost:5125/updatePdf?pdfName=${currentImageName}&updatedPdf=${editedName}`);
    },[loc.pathname,currentImageName,editedName]);
    const editImage=()=>{
      
        fetch(url,{
            method:'Patch',headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response)
        .then(data=>{imageEdited()});   
    }
    return(
    <div>
    <Dialog header='Editor' visible={visible} style={{width:'30vw',borderRadius:'7%', backgroundColor:'black',color:'white'}} modal onHide={hideEditPopup}>
        <div>Current ImageName:{currentImageName}</div>
        <div>Change To:
            <input type="text" value={editedName} onChange={(e)=>{setEditedName(e.target.value)}}></input>
        </div>
        <Button onClick={()=>{editImage()}}>Submit</Button>
        <Button onClick={()=>{hideEditPopup()}}>Cancel</Button>
    </Dialog>
</div>
     )
}
export default EditDialog;