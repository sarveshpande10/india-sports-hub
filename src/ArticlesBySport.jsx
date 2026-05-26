import { useEffect } from "react"
import { useParams } from "react-router-dom"

const AllArticles = ({ latestArticles, setLatestSport }) => {

    const {latestSport: sport} = useParams()

    useEffect(() => {
        console.log("hello");
        
        setLatestSport(sport)        
    }, [sport])

    const getFormattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })
    }

    return (
        <>
            <div className="all-articles">
                <h2>{sport === "all" ? "Articles" : latestArticles[0]?.category}</h2>
                <ul>
                    {latestArticles.map((article) => (
                        <li key={article.id} className="articles">
                            <div className="upper-box">
                                <p>{article.category}</p>
                                <p className="datetime">{getFormattedDate(article.date)}</p>
                            </div>
                            <h3>{article.title}</h3>
                        </li>
                    ))}

                </ul>
            </div>
        </>
    )
}

export default AllArticles