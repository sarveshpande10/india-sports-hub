import articlesData from './data'
import Layout from './Layout'
import TopArticles from './TopArticles'
import Trending from './Trending'
import Latest from './Latest'
import ArticlesBySport from './ArticlesBySport'
import ScrollToTop from './ScrollToTop'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  const [showMenu, setShowMenu] = useState(null)
  const [sportName, setSportName] = useState("Cricket")
  const [displayText, setDisplayText] = useState('')
  const [article, setArticle] = useState(null)
  const [data, setData] = useState(articlesData)
  const [latestSport, setLatestSport] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')

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
    setArticle(data[0])
    const interval = setInterval(() => {

      setArticle(prev => {

        const currentIndex = data.findIndex(
          article => article === prev
        )

        return data[(currentIndex + 1) % data.length]

      })

    }, 2000)

    return () => clearInterval(interval)

  }, [data])





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
          />}
        >
          <Route index element={
            <>
              { article && <TopArticles sportName={displayText} article={article} />}
              { article && <Trending article={article} />}
              {data.length 
                && <Latest 
                      latestArticles={
                        latestSport === "all" ? data 
                        : data.filter((article) => article.category.toLowerCase() === latestSport
                        )} 
                        latestSport={latestSport}
                        setLatestSport={setLatestSport}
                    />
              }
            </>
          }/>

          <Route path='articles/:latestSport' element={
            <ArticlesBySport 
              latestArticles={
                  latestSport === "all" ? data 
                  : data.filter((article) => article.category.toLowerCase() === latestSport
                  )} 
              setLatestSport={setLatestSport}
            />
          } />

        </Route>
      </Routes>
    </>
  )
}

export default App
