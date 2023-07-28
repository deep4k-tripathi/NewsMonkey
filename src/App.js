import './App.css';

import React, {useState} from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=> {
  const pageSize=6
  const apiKey= process.env.REACT_APP_NEWS_API

  const[progress,setProgress]=useState(0)
 
    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        {/* <News setProgress={setProgress} pageSize={pageSize} country="in" category="business"/> */}
        <Routes>
          <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/>}/>
          <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/>}/>
          <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
          <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/>}/>
          <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/>}/>
          <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
          <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App