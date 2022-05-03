
import { set } from 'firebase/database';
import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState('light')


  useEffect(() => {
    if (localStorage.getItem('theme') === null){
      localStorage.setItem('theme', 'light')
    } else 
    setTheme(localStorage.getItem('theme'))
  }, []);

  
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
    
    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark')
    }
    else if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light')
    }    
  }


  return (
    <ThemeContext.Provider value={[{ theme }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}