import Layout from './Layout'
import TopArticles from './TopArticles'
import Trending from './Trending'
import Latest from './Latest'
import ArticlesBySport from './ArticlesBySport'
import ScrollToTop from './ScrollToTop'
import ExploreVideos from './ExploreVideos'
import Admin from './Admin'
import ArticlesToUpdate from './ArticlesToUpdate'
import AddOrEditForm from './AddOrEditForm'
import AdminLogin from './AdminLogin'
import AdminRegister from './AdminRegister'
import RequireAuth from './RequireAuth'
import { useState, useEffect, use } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'

function App() {

  const navigate = useNavigate()

  const [articleData, setArticleData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [showMenu, setShowMenu] = useState(null)
  const [sportName, setSportName] = useState("Cricket")
  const [displayText, setDisplayText] = useState('')
  const [article, setArticle] = useState(null)
  const [category, setCategory] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeSectionId, setActiveSectionId] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    username: '', 
    password: ''
  })
  const [newArticle, setNewArticle] = useState({
    id: null,
    title: "", 
    article: "", 
    date: new Date(), 
    writer: "", 
    category: ""
  })

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3500/data')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()

      setArticleData(result)
      setArticle(result[0])

    } catch (error) {
      console.error('Error fetching data:', error.message)
    } 
  }

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3500/videos')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()

      setVideoData(result)

    } catch (error) {
      console.error('Error fetching data:', error.message)
    } 
  }

  useEffect(() => {

    fetchArticles()
    fetchVideos()

  }, [])

  const sports = [
            { id: 1, name: "Cricket" },
            { id: 2, name: "Badminton" },
            { id: 3, name: "Football" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {

        setSportName(prev => {
            const currentIndex = sports.findIndex(
                sport => sport.name === prev
            );

            return sports[
                (currentIndex + 1) % sports.length
            ].name;
        });

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    let index = 0

    setDisplayText(sportName[0])

    const interval = setInterval(() => {

      setDisplayText(prev => prev + sportName[index])

      index++

      if (index === sportName.length-1) {
          clearInterval(interval)
      }

  }, 50);

    return () => clearInterval(interval);

  }, [sportName]);

  useEffect(() => {

    if (articleData.length === 0) return
    // setArticle(data[0])
    const timeout = setTimeout(() => {

      setArticle(prev => {

        const currentIndex = articleData.findIndex(
          article => article === prev
        )

        return articleData[(currentIndex + 1) % articleData.length]

      })

    }, 4000)

    return () => clearTimeout(timeout)

  }, [article])

  const prevArticle = () => {
    setArticle(prev => {
      const currentIndex = articleData.findIndex(
        article => article === prev
      )

      return currentIndex === 0 ? articleData[articleData.length-1] : articleData[currentIndex-1]
    })
  }

  const nextArticle = () => {
    setArticle(prev => {
      const currentIndex = articleData.findIndex(
        article => article === prev
      )

      return currentIndex === articleData.length-1 ? articleData[0] : articleData[currentIndex+1]
    })
  }  

  const addArticle = async (e) => {
    e.preventDefault()
    if (!newArticle.title) {
      alert('Please fill in all fields!')
      return
    }

    try {
      const response = await fetch('http://localhost:3500/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticle)
      })
      navigate('/admin')
      fetchArticles()

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      else {
        alert("Article added successfully! ")
      }

    } catch (error) {
      alert(`Error posting data: ${error.message}`)

    } 
  }

  const editArticle = async (e) => {
    e.preventDefault()
    if (!newArticle.title) {
      alert('Please fill in all fields!')
      return
    }

    try {
      const response = await fetch(`http://localhost:3500/data/${newArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticle)
      })

      navigate('/admin')
      fetchArticles()

      if (!response.ok) {        
        throw new Error(`${response.status} ${response.statusText}`)
      } 
      else {
        alert("Article updated successfully! ")
      }

    } catch (error) {
      alert(`Error posting data: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {

    try {
        const response = await fetch(`http://localhost:3500/data/${id}`, {
            method: 'DELETE'
        })
        fetchArticles()
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`)
        }

    } catch (error) {
      alert(`Error posting data: ${error.message}`)
    }
  }


  return (
    <>

      <ScrollToTop />
      <Routes>
        <Route path='/' element={
          <Layout 
            showMenu={showMenu} 
            setShowMenu={setShowMenu} 
            isSearching={isSearching} 
            setIsSearching={setIsSearching} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            articleData={articleData.filter((article) => article.title.toLowerCase().includes(searchValue.toLowerCase()))}
            activeSectionId={activeSectionId} 
            setActiveSectionId={setActiveSectionId} 
          />}
        >

          <Route index element={
            <>
              { article && <TopArticles sportName={displayText} article={article} />}
              { article 
                  && <Trending 
                        article={article} 
                        prevArticle={prevArticle} 
                        nextArticle={nextArticle} 
                        index={articleData.indexOf(article)}
                      />
              }
              {articleData.length 
                && <Latest 
                      latestArticles={
                        category === "all" ? articleData 
                        : articleData.filter((article) => article.category.toLowerCase() === category
                        )} 
                        category={category}
                        setCategory={setCategory}
                    />
              }
              <ExploreVideos videoData={videoData} />
            </>} 
          />

          <Route path='articles/:category' element={
            <ArticlesBySport 
              latestArticles={
                  category === "all" ? articleData 
                  : articleData.filter((article) => article.category.toLowerCase() === category
                  )} 
              setCategory={setCategory}
            />} 
          />
        </Route>
        
        <Route path="/admin/login" element={
          <AdminLogin 
            user={user} 
            setUser={setUser} 
            setIsLoggedIn={setIsLoggedIn} 
          />} 
        />

        <Route path='/admin/register' element={<AdminRegister user={user} setUser={setUser} />} />

        {/* Protected Admin Area */}
        <Route element={<RequireAuth isLoggedIn={isLoggedIn} />}>
            
          <Route path='admin'>

            <Route index element={<Admin setNewArticle={setNewArticle} />} />

            <Route path='add' element={
              <AddOrEditForm 
                newArticle={newArticle} 
                setNewArticle={setNewArticle} 
                functionName={addArticle} 
              />} 
            />
            
            <Route path='edit'>

              <Route index element={
                <ArticlesToUpdate 
                  articleData={articleData} 
                  setNewArticle={setNewArticle} 
                  handleDelete={handleDelete}
                />} 
              />

              <Route path=':id' element={
                <AddOrEditForm 
                  newArticle={newArticle} 
                  setNewArticle={setNewArticle} 
                  functionName={editArticle} 
                />} 
              />

            </Route>

            <Route path='delete'>
              <Route index element={
                <ArticlesToUpdate 
                  articleData={articleData} 
                  setNewArticle={setNewArticle} 
                  handleDelete={handleDelete}
                />} 
              />

              <Route path=':id' element={
                <AddOrEditForm 
                  newArticle={newArticle} 
                  setNewArticle={setNewArticle} 
                  functionName={editArticle} 
                />} 
              />

            </Route>

          </Route>

        </Route>
        
      </Routes>
    </>
  )
}

export default App
