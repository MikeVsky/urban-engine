import React, {createContext, useState} from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
  
  if(localStorage.getItem('theme') === null){
    setTheme('light')
  }
  const [theme, setTheme] =useState(localStorage.getItem('theme'))
  
 

  const toggleTheme = () => {
   setTheme((curr) => (curr=== 'light' ? 'dark' :'light'))}
    localStorage.setItem('theme', theme )
    

  
  return (
    <ThemeContext.Provider value={[{ theme}, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}