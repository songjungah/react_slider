import logo from './logo.svg';
import './App.css';
import ImageSlider from './components/image-slider/slider.jsx';

function App() {
  return (
    <div className="App">
      {/* 서버에서 제공하는 양식에 맞게끔 props 로 전달 
         https://picsum.photos/v2/list?page=1&limit=10
      */}
      <ImageSlider url={'https://picsum.photos/v2/list'} limits={'10'} page={'1'}/>
    </div>
  );
}

export default App;
