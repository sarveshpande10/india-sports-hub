const Trending = ({ article }) => {

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
            <div className="articles">
                <p className="datetime">{getFormattedDate(article.date)}</p>
                <h2>{article.title}</h2>
            </div>
        </div>
    </>
  )
}

export default Trending