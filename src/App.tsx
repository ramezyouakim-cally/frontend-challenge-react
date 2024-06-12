import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Headphone from './components/Headphone/Headphone';
// import 'antd/dist/antd.css';
import './App.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/headphone/:id' element={<Headphone />} />
          <Route path='' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
