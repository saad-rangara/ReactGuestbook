import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import './components/Header.css'
import Navbar from './components/Navbar'
import './components/Navbar.css';
import HomePage from './pages/HomePage'
// import './components/HomePage.css'
import FormPage from './pages/FormPage'
import "./pages/FormPage.css"
import AboutPage from './pages/AboutPage'
import "./pages/AboutPage.css"
import PostPage from './pages/PostPage'
import Footer from './components/Footer'
import './components/Footer.css'
import NotFoundPage from './pages/NotFoundPage'
import "./pages/NotFoundPage.css"
import './App.css'

export default function App() {
  const [posts, setPosts] =  useState([]);
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  return(
    <div className='App'>
    <Header />
    <Navbar /><br/>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/feedback-form" element={<FormPage addPost={addPost}/>} />
    <Route path="/posts" element={<PostPage posts={posts}/>}/>
    <Route path="/about" element ={<AboutPage />}/>
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
    {/* <Routes>
      <Route />
    </Routes> */}
    </div>
  )
}