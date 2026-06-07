import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import { Link } from 'react-router-dom'


const ArticlesToUpdate = ({ articleData, setNewArticle, handleDelete }) => {

    const getFormattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })
    }


    return (
        <ul className='articles-list'>
            {articleData.map((item) => (
                <li key={item._id}>
                    <h2>{item.title}
                        <div> 
                            <Link to={`${item._id}`}>
                                <FaEdit onClick={() => {
                                    setNewArticle(item) 
                                }} color='white'/>
                            </Link>
                            <MdDelete onClick={() => handleDelete(item._id)} style={{cursor: "pointer"}} />
                        </div>
                    </h2>
                    <p>{item.article.length > 10 ? item.article.substring(0, 10) + '...' : item.article}</p>
                    <p className="datetime">{getFormattedDate(item.date)}</p>
                </li>
            ))}
        </ul>
    )
}

export default ArticlesToUpdate