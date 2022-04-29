import { createContext, useState} from "react";

const themes = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "black",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] =useState('light')
  const toggleTheme = () => {
   setTheme((curr) => (curr=== 'light' ? 'dark' :'light'))
  };
  


  return (
    <ThemeContext.Provider value={[{ theme}, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};