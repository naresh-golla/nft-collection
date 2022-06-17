import { ToastContainer } from 'react-toastify';
import './App.css';
import About from './components/About';
import CountDown from './components/CountDown';
import Footer from './components/Footer';
import Header from './components/Header';
import MainDiv from './components/MainDiv';
import RenderNft from './components/RenderNft';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <CountDown />
      <MainDiv />
      <RenderNft />
      <About />
      <Footer />
    </div>
  );
}

export default App;
