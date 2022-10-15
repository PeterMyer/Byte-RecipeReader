
import './App.css';
import Navbar from './Navigation/Navbar'
import AppRoutes from './Routes';

function App() {
  return (
    <>
      <header>
        <title>Recipe Reader</title>
        <Navbar/>
      </header>
      <main>
        <AppRoutes className = 'main-content'/>
      </main>
  </>
  );
}

export default App;
