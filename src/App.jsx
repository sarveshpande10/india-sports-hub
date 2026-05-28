import { data, videos } from './data'
import Layout from './Layout'
import TopArticles from './TopArticles'
import Trending from './Trending'
import Latest from './Latest'
import ArticlesBySport from './ArticlesBySport'
import ScrollToTop from './ScrollToTop'
import ExploreVideos from './ExploreVideos'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  const [showMenu, setShowMenu] = useState(null)
  const [sportName, setSportName] = useState("Cricket")
  const [displayText, setDisplayText] = useState('')
  const [article, setArticle] = useState(data[0])
  // const [data, setData] = useState(articlesData)
  const [category, setCategory] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeSectionId, setActiveSectionId] = useState("home")


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

  // useEffect(() => {

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/list')

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }

  //     const result = await response.json()

  //     setData(result)

  //   } catch (error) {
  //     console.error('Error fetching data:', error.message)
  //   } 
  // }

  // fetchData()

  // }, [])

  useEffect(() => {

    if (data.length === 0) return
    // setArticle(data[0])
    const timeout = setTimeout(() => {

      setArticle(prev => {

        const currentIndex = data.findIndex(
          article => article === prev
        )

        return data[(currentIndex + 1) % data.length]

      })

    }, 4000)

    return () => clearTimeout(timeout)

  }, [article])

  const prevArticle = () => {
    setArticle(prev => {
      const currentIndex = data.findIndex(
        article => article === prev
      )

      return currentIndex === 0 ? data[data.length-1] : data[currentIndex-1]
    })
  }

  const nextArticle = () => {
    setArticle(prev => {
      const currentIndex = data.findIndex(
        article => article === prev
      )

      return currentIndex === data.length-1 ? data[0] : data[currentIndex+1]
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
            data={data.filter((article) => article.title.toLowerCase().includes(searchValue.toLowerCase()))}
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
                        index={data.indexOf(article)}
                      />
              }
              {data.length 
                && <Latest 
                      latestArticles={
                        category === "all" ? data 
                        : data.filter((article) => article.category.toLowerCase() === category
                        )} 
                        category={category}
                        setCategory={setCategory}
                    />
              }
              <ExploreVideos videos={videos} />
            </>
          }/>

          <Route path='articles/:category' element={
            <ArticlesBySport 
              latestArticles={
                  category === "all" ? data 
                  : data.filter((article) => article.category.toLowerCase() === category
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
