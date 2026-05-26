import { CiSearch } from 'react-icons/ci'

const Search = ({ isSearching, setIsSearching, searchValue, setSearchValue, data }) => {

  const getFormattedDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
      })
  }

  return (
    <>
      <div className="search-input">
        <CiSearch />
        <input 
          type='search' 
          id='search'
          placeholder='Search here..' 
          onFocus={() => setIsSearching(true)} 
          onBlur={(e) => {
            if (
              e.relatedTarget &&
              e.relatedTarget.closest(".search-suggestions")
            ) {
              return;
            }
            setIsSearching(false);
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    
      { isSearching &&
        <div className='search-suggestions' tabIndex={0} onBlur={() => setIsSearching(false)}>
          { data.length == 0 ? 
              <p>No articles match that search.</p> :

              <ul>
                {data.map((article) => (
                  <li key={article.id}>
                      <div className="upper-box">
                        <p style={
                          {
                            backgroundColor: "rgb(239, 34, 34)", 
                            border: "none", 
                            fontWeight: "350"
                          }
                        }>{article.category}</p>
                        <p className="datetime" style={{fontWeight: "300"}}>{getFormattedDate(article.date)}</p>
                      </div>
                      <h3>{article.title}</h3>
                  </li>
              ))}
              </ul>
          }
        </div>
      }
    
    </>
  )
}

export default Search