import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const Latest = ({ latestArticles, latestSport, setLatestSport }) => {


    const getFormattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })
    }

    const sports = [
        "All Sports", 
        "Archery", 
        "Athletics", 
        "Badminton", 
        "Boxing"
    ]

    return (
        <>
            <div className="outer" style={{marginBottom: "200px"}}>
                <h2>Latest</h2>
                <div className="select-sports">
                    <ul className>
                        { sports.map((sport) => (
                            <li key={sport} onClick={() => setLatestSport(sport === "All Sports" ? "all" : sport.toLowerCase())}>{sport}</li>
                          ))
                        }
                    </ul>
                </div>

                <div className="content">
                    <>
                        {latestArticles.length > 0 ? 
                            <>
                                <div className="main-article articles">
                                    <p>{latestArticles[0].category}</p>
                                    <p className="datetime">{getFormattedDate(latestArticles[0].date)}</p>
                                    <h2>{latestArticles[0].title}</h2>
                                </div>
                                <div className="other-articles">
                                    <ul>
                                        {latestArticles.slice(1, 4).map((article) => (
                                            <li key={article.id}>
                                                <div className="upper-box">
                                                <p>{article.category}</p>
                                                <p className="datetime">{getFormattedDate(article.date)}</p>
                                                </div>
                                                <h3>{article.title}</h3>
                                            </li>
                                        ))}

                                    </ul>
                                    <div id="view-all">
                                        <p><Link to={`/articles/${latestSport}`}>View All <FiArrowRight /></Link></p>
                                    </div>
                                </div>
                            </> : 
                                <div className="no-articles">
                                    <h3>No {latestSport[0].toUpperCase() + latestSport.slice(1)} stories yet </h3>
                                    <p>Nothing in this category right now. Try all articles or check back later.</p>
                                </div>
                        }
                    </>

                </div>
            </div>
        </>
    )
}

export default Latest