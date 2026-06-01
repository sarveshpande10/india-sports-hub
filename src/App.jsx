import Layout from './Layout'
import TopArticles from './TopArticles'
import Trending from './Trending'
import Latest from './Latest'
import ArticlesBySport from './ArticlesBySport'
import ScrollToTop from './ScrollToTop'
import ExploreVideos from './ExploreVideos'
import { useState, useEffect, use } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

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


  useEffect(() => {

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
            </>
          }/>

          <Route path='articles/:category' element={
            <ArticlesBySport 
              latestArticles={
                  category === "all" ? articleData 
                  : articleData.filter((article) => article.category.toLowerCase() === category
                  )} 
              setCategory={setCategory}
            />
          } />

        </Route>
      </Routes>
    </>
  )
}

export default App
