import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TaskProvider } from './context/TaskContext.jsx'
import App from './App.jsx'
import './index.css'

// Importación de fuentes
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"

// Seleccionamos el elemento raíz
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <App />
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>
)