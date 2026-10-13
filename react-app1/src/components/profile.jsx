import "./profile.css";
import { useEffect, useState,useRef,useContext } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import Header from "../common/header/tabmenuheader";
import { Menu } from "primereact/menu";
import { DataContext } from "../common/DataContext/DataContext";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const optionMenu=useRef(null);
  const navigate=useNavigate();
  const [currentProfile,setCurrentProfile]=useState(null);
  const [profiles, setProfiles] = useState(null);
  const { setCommonData, setTrigger } = useContext(DataContext);
  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const items = [
    {
      label: 'Edit',
      icon: 'pi pi-file-edit',
      command: () => {
        setCommonData(currentProfile);
        setTrigger(true);
       navigate('/newprofile');
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
       deleteProfile();
      },
    },   
];
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile=()=>{
    fetch("http://localhost:5125/getProfileData")
      .then((response) => response.json())
      .then((data) => {
        var modifiedData = data.map((item) => ({
          ...item,
          dob: new Date(item.dob),
        }));
        setProfiles(modifiedData);
      })
      .catch((error) => console.error("Error:", error));
  }
  const deleteProfile=()=>{
    fetch(`http://localhost:5125/deletePD/${currentProfile._id}`,{method:'Delete'})
    .then((response) => response)
    .then(data=>{
      getProfile();
      
    })
    .catch((error) => console.error("Error:", error));
  }
  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.dob);
  };
  return (
    <div>
      <Header />
      <Menu model={items} ref={optionMenu} popup/>
      <div class="dataTable">
        <DataTable
          value={profiles}
          removableSort
          tableStyle={{ minWidth: "50rem" }}
          paginator
          showGridlines
          rows={4}
          dataKey="_id"
          emptyMessage="No customers found."
        >
          <Column
            field="firstName"
            header="Name"
            filter
            sortable
            style={{ width: "20%" }}
          ></Column>
          <Column
            header="Date"
            field="dob"
            sortable
            filterField="dob"
            dataType="date"
            style={{ minWidth: "10rem" }}
            body={dateBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
          />
          <Column
            field="gender"
            header="Gender"
            filter
            sortable
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="occupation"
            header="Occupation"
            filter
            sortable
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="city"
            header="City"
            filter
            sortable
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="contactNumber"
            header="Contact"
            filter
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            header="Edit/Delete"
            body={(rowData)=><Button icon="pi pi-ellipsis-v" rounded style={{backgroundColor:'white',color:'black'}} onClick={(e)=>{optionMenu.current.toggle(e);setCurrentProfile(rowData)}}></Button>}
            style={{width:'5em'}}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
