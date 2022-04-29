import React, {createContext, useEffect, useState} from 'react'
import {
  collection,
query, where, onSnapshot
 } from "firebase/firestore"

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] =useState('light')
  
  const toggleTheme = () => {
   setTheme((curr) => (curr=== 'light' ? 'dark' :'light'))}

  

  
  return (
    <ThemeContext.Provider value={[{ theme}, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}