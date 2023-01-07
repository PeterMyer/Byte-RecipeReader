
import './App.css';
import { AppProvider } from './Providers/AppProvider';
import Navbar from './Components/Navigation/Navbar'
import AppRoutes from './Routes/Routes';

function App() {
  return (
    <AppProvider>
      <header>
        <title>Recipe Reader</title>
        <Navbar/>
      </header>
      <main>
        <AppRoutes className = 'main-content'/>
      </main>
    </AppProvider>
  );
}

export default App;
