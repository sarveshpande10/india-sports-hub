import { GoArrowLeft, GoArrowRight } from "react-icons/go"

const Trending = ({ article, prevArticle, nextArticle, index }) => {

    const getFormattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })
    }
    


  return (
    <>
        <div className="outer">
            <h2 className="section-heading">Trending</h2>
            <div>
                <div className="top-articles">
                    <GoArrowLeft className="arrows" onClick={prevArticle} size={50} />
                    <div className="articles">
                        <p className="datetime">{getFormattedDate(article.date)}</p>
                        <h2>{article.title}</h2>
                    </div>
                    <GoArrowRight className="arrows" onClick={nextArticle} size={50} />
                </div>

                <div className="dots">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} id={index === i ? "current-article" : ""}></div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Trending