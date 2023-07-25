import './styles/app.css';
import './App.css';
import { AppProvider } from './Providers/AppProvider';
import Navbar from './Components/Navigation/Navbar';
import AppRoutes from './Routes/Routes';

function App() {
  return (
    <AppProvider>
      <header>
        <title>Byte</title>
        <Navbar />
      </header>
      <main className="main-content">
        <AppRoutes />
      </main>
    </AppProvider>
  );
}

export default App;
