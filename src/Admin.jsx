import { Link } from 'react-router-dom'


const Admin = ({ setNewArticle }) => {
    
    return (
        <>
            <div className="outer">
                <h2 className="section-heading">Admin Page</h2>
                <ul className='admin'>
                    <li>
                        <Link to={'add'} onClick={() => setNewArticle({
                            id: null,
                            title: "", 
                            article: "", 
                            date: new Date(), 
                            writer: "", 
                            category: ""
                        })}>Add Article</Link>
                    </li>
                    <li>
                        <Link to={'edit'}>Edit Article</Link>
                    </li>
                    <li>
                        <Link to={'delete'}>Delete Article</Link>
                    </li>
                </ul>
            </div>     
        </>
    )
}

export default Admin