import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setCommonData] = useState(null);
  const [trigger, setTrigger] = useState(false);
useEffect(()=>{
    if(trigger)
        {}
},[trigger,data]);
  return (
    <DataContext.Provider value={{ data, setCommonData, trigger, setTrigger }}>
      {children}
    </DataContext.Provider>
  );
};