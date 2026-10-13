import { Button } from 'primereact/button';
import './search.css';
import { useEffect, useState } from 'react';
import React from 'react';
function Search({filteredCards,onSearchChange}) {
    const [selectedFilter,setSelectedFilter]=useState('');
    const [searchText,setSearchText]=useState('');
    const [fCards,setFCards]=useState({});
    const [isChose,setIsChose]=useState(true);
    useEffect(()=>{
        if(searchText==='')
          setFCards(filteredCards);
        if(selectedFilter)
          setIsChose(false);
        if(searchText && selectedFilter &&filteredCards)
          switch (selectedFilter) {
            case 'startsWith':
              const fil=filteredCards.filter((item) =>
                item.imageName.toLowerCase().startsWith(searchText.toLowerCase())
              );
              setFCards(fil);
              break;
            case 'includes':
              setFCards(filteredCards.filter((item) =>
                  item.imageName.toLowerCase().includes(searchText.toLowerCase())
                ));
              break;
            default:
              alert("choose an option");
              break;
          }
    },[searchText,selectedFilter,filteredCards,isChose]);
    return(
        <div class="searchSpace">
        <select value={selectedFilter} onChange={(e)=>setSelectedFilter(e.target.value)} class="dropdown" required>
          <option value="" selected disabled hidden>
            Select an option 
          </option>
          <option value="startsWith">Starts With</option>
          <option value="includes">Contains</option>
        </select>
        <input type="text" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} disabled={isChose} class="searchBar"/>
        <Button onClick={()=>onSearchChange(fCards)} icon='pi pi-search' style={{padding:'2px'}} disabled={isChose}>
      </Button>
      </div>
    )
}
export default Search;