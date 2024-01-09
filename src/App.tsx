import MyThemeProvider from '@context/MyTheme';
import AppRoots from './AppRoots';
import LoaderProvider from '@context/LoaderContext';
import { Provider } from 'react-redux';
import { store } from './store';
import '@scss/App.scss';

function App() {
 
  return (
    <>
      <Provider store={store}>
        <MyThemeProvider >
          <LoaderProvider>
            <AppRoots />
          </LoaderProvider>
        </MyThemeProvider>
      </Provider>
    </>
  )
}

export default App
