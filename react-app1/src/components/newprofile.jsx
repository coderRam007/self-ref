import React, { useState, useEffect, useContext } from 'react';
import './newprofile.css';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
// import { useHistory } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import { DataContext } from './common/DataContext';

function NewProfile() {
    const [visible, setVisible] = useState(false);
    const [profiletoedit]=useState(useContext(DataContext).data);
    const [isEdit,setIsEdit]=useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        userName: localStorage.getItem('userName'),
        profileImage: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        contactNumber: '',
        emailId: '',
        address: '',
        city: '',
        pincode: '',
        state: '',
        degree: '',
        specialization: '',
        occupation: '',
        company: '',
    });
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [path, setPath] = useState(null);
    const navigate = useNavigate();
    // const history = useHistory();
    useEffect(()=>{
        if(profiletoedit)
            {}
    },[profiletoedit]);
    useEffect(() => {
        if(profiletoedit)
      {
            const fetchedData = {
                _id: profiletoedit._id,
                userName: profiletoedit.userName,
                profileImage: profiletoedit.profileImage,
                firstName: profiletoedit.firstName,
                lastName: profiletoedit.lastName,
                dob: profiletoedit.dob,
                gender: profiletoedit.gender,
                contactNumber: profiletoedit.contactNumber,
                emailId: profiletoedit.emailId,
                address: profiletoedit.address,
                city: profiletoedit.city,
                pincode: profiletoedit.pincode,
                state: profiletoedit.state,
                degree: profiletoedit.degree,
                specialization: profiletoedit.specialization,
                occupation: profiletoedit.occupation,
                company: profiletoedit.company
            };
            setPath('data:image/jpg;base64,'+profiletoedit.profileImage);
        
            const byteString = window.atob(profiletoedit.profileImage);
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const int8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
                int8Array[i] = byteString.charCodeAt(i);
            }
            const imageBlob = new Blob([int8Array], { type: "image/png" });
            const file = new File([imageBlob], "name.jpg", {
                type: "image/jpg",
            });
            setSelectedProfileImage(file);
            setFormData({ ...formData, profileImage: file });
            setIsEdit(true);
            setFormData(fetchedData);
        }
        else
        {    
            const fetchedData = {
                _id: '',
                userName: localStorage.getItem('userName'),
                profileImage: '',
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                contactNumber: '',
                emailId: '',
                address: '',
                city: '',
                pincode: '',
                state: '',
                degree: '',
                specialization: '',
                occupation: '',
                company: '',
            };
            setFormData(fetchedData);
            }
      
    }, [profiletoedit]);

    const handleConfirm = () => {
        
        const formDataToSend = new FormData();
        
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (selectedProfileImage) {
            formDataToSend.append('profileImage', selectedProfileImage);
        }
        if(isEdit)
       {
        
         fetch('http://localhost:5125/updateProfileData', {
            method: 'PATCH',
            body: formDataToSend,
        })
            .then(response => response)
            .then(data => {
                navigate('/profiles'); 
            })
            .catch(error => {
                console.error('Error updating profile data:', error);
            });
        }
        else{
            fetch('http://localhost:5125/addProfileData', {
                method: 'POST',
                body: formDataToSend,
            })
                .then(response => response)
                .then(data => {
                    navigate('/profiles'); 
                })
                .catch(error => {
                    console.error('Error saving profile data:', error);
                });
        }
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    
    const handleProfileImageSelected = (event) => {
        const file = event.target.files[0];
        setSelectedProfileImage(file);
        setPath(URL.createObjectURL(file));
        setFormData({ ...formData, profileImage: file });
    };

    const triggerBrowse = () => {
        document.getElementById('fileBrowser').click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setVisible(true);
    };
    
    return (
        <div style={{color:'black'}}>
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Are you sure you want to proceed?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={handleConfirm}
                reject={handleCancel}
            />
            <div className="formcontainer">
                <form onSubmit={handleSubmit}>
                    <div className="grid-1">
                        <div>
                            <div className="grid-2">
                                <div className="grid-5">
                                    <div>
                                        <label className="required">First Name:</label>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid-5">
                                    <div><label>Last Name: </label></div>
                                    <div>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid-2">
                                <div className="grid-5">
                                    <div>
                                        <label className="required">Date Of Birth: </label>
                                    </div>
                                    <div>
                                        <Calendar
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.value })}
                                            style={{ height: '22px', width: '170px' }}
                                            showIcon
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid-5">
                                    <div><label className="required">Gender: </label></div>
                                    <div>
                                        <input
                                            type="text"
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div><br/>
                            </div>
                        </div>
                        <div className='image'>
                            <img
                                className="formprofileimage"
                                id="imageClick"
                                onClick={triggerBrowse}
                                src={path ? path : require('../default.jpeg')}
                                alt="Submit"
                                title="Upload Image"
                            />
                            <input
                                type="file"
                                id="fileBrowser"
                                name="fileBrowser"
                                accept="image/*"
                                onChange={handleProfileImageSelected}
                                style={{ visibility: 'hidden', display: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="grid-1">
                        <div className="grid-6">
                            <div><label>Address: </label></div>
                            <div>
                                <textarea
                                    cols="80"
                                    rows="7"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="grid-5">
                                <div><label className="required">Contact No:</label></div>
                                <div>
                                    <input
                                        type="tel"
                                        value={formData.contactNumber}
                                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid-5">
                                <div><label>Email ID:</label></div>
                                <div>
                                    <input
                                        type="email"
                                        value={formData.emailId}
                                        onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid-3">
                        <div className="grid-5">
                            <div><label className="required">City:</label></div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid-5">
                            <div><label className="required">State:</label></div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                                    />
                            </div>
                        </div>
                        <div className="grid-5">
                            <div><label className="required">Pincode:</label></div>
                            <div>
                                <input
                                    type="number"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid-4">
                        <div className="grid-5">
                            <div><label>Degree:</label></div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.degree}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid-5">
                            <div><label>Specialization:</label></div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid-5">
                            <div><label className="required">Occupation:</label></div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.occupation}
                                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid-5">
                            <div><label>Company:</label></div>
                            <div>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                /><br />
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProfile;
