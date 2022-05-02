import React, {createContext, useState} from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
  
  
  const [theme, setTheme] =useState('light')
  
 
  
  

  const toggleTheme = () => {
   setTheme((curr) => (curr=== 'light' ? 'dark' :'light'))}
    localStorage.setItem('theme', theme )
    

  
  return (
    <ThemeContext.Provider value={[{ theme}, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}