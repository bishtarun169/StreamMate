import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import stores from './ReduxStore/store.js'
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={stores}>
           <App />
    </Provider>
   
  </StrictMode>,
)
