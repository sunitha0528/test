
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

type MyThemeValueTypes = {
   isDarkMode?: boolean,
   changeThemeMode?: () => void
}

const deafultProviderValues = {
   isDarkMode: false,
   changeThemeMode: () => { }
}


const MyThemeContext = createContext<MyThemeValueTypes>(deafultProviderValues);

export const useMyThemeContext = () => useContext(MyThemeContext);

 
// Create a light theme
const lightTheme = createTheme({
   shape: {
      borderRadius: 8,
   },
   palette: {
      mode: 'light',
      // primary: {
      //    main: '#34518c',
      // },
      // secondary: {
      //    main: '#ff4081',
      // },
   },
});

// Create a dark theme
const darkTheme = createTheme({
   shape: {
      borderRadius: 8,
   },
   palette: {
      mode: 'dark',
      // primary: {
      //    main: '#2196f3',
      // },
      // secondary: {
      //    main: '#ff4081',
      // },
   },
});


type MyThemeProviderPropTypes = {
   children: React.ReactNode
}

export const MyThemeProvider = ({ children }: MyThemeProviderPropTypes) => {

   const [myTheme, setMyTheme] = useState(lightTheme);
   const [isDarkMode, setIsDarkMode] = useState<boolean>(deafultProviderValues.isDarkMode);


   const changeThemeMode = () => {
      if (isDarkMode) {
         setIsDarkMode(false);
         setMyTheme(lightTheme);
      } else {
         setIsDarkMode(true);
         setMyTheme(darkTheme)
      }
   }

   return (
      <MyThemeContext.Provider value={{ changeThemeMode, isDarkMode }} >
         <ThemeProvider theme={myTheme}>
            {children}
         </ThemeProvider>
      </MyThemeContext.Provider>
   )

}
export default MyThemeProvider;