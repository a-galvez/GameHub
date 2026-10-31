// src/App.tsx
import { AppLayout } from './layouts/AppLayout'
import { CatalogoJuegosView } from './features/juegos/components/CatalogoJuegosView'

function App() {
  return (
    <AppLayout>
      <CatalogoJuegosView />
    </AppLayout>
  )
}

export default App
