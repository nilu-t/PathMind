import './App.css';

import Home from './pages-components/Home.js'
import About from './pages-components/About.js'
import Note from './pages-components/Note.js'
import NotesList from './pages-components/NotesList.js'
import Activity from './pages-components/Activity';
import BuyMeACoffee from './pages-components/BuyMeACoffee';
import NotFoundPage from './pages-components/NotFoundPage';
import NavBar from './NavBar.js'
import MyPath from './pages-components/MyPath';

import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1 className="app-title">Path Mind</h1>

      { /* Creating the routes for PathMind */ }
      <BrowserRouter>
        < NavBar />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path='/About' element= {<About/>} />
          <Route path='/Note/:note_title/:note_id' element= {<Note/>} />
          <Route path='/NotesList/:subject' element= {<NotesList/>} />
          <Route path='/Activity' element= {<Activity/>} />
          <Route path='/BuyMeACoffee' element= {<BuyMeACoffee/>} />
          <Route path='/MyPath' element= {<MyPath/>} />
          <Route path='*' element = {<NotFoundPage/>} /> 
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
