
const TopArticles = ({ sportName, article }) => {

    const getFormattedDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
      })
    }


  return (
    <>
      <div className="outer" style={{marginTop: "70px"}}>
        <div className="top-articles">

          <div className="us">
            <p>HOME FOR INDIAN OLYMPIC SPORTS</p>
            <h3>BECAUSE EVERY SPORT MATTERS.</h3>
            <p>Your go-to destination for the latest news, insights, and updates across Olympic and emerging sports.</p>
            <p>We cover {sportName}</p>
          </div>

          <div className="articles">
            <p className="datetime">{getFormattedDate(article.date)}</p>
            <h2>{article.title}</h2>
          </div>

        </div>
      </div>
    </>
  )
}

export default TopArticles