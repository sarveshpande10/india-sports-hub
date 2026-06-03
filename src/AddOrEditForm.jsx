import { MdDone } from 'react-icons/md'
import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const AddOrEditForm = ({ newArticle, setNewArticle, functionName }) => {

    return (
        <>
            <div className="add-edit-wrapper" style={{margin: "70px"}}>
                <form id="add-edit-form" onSubmit={functionName}>
                    
                    <div className="input-div">
                        <label htmlFor="title">Title:</label>
                        <input 
                            type='text' 
                            id='title'
                            name='title' 
                            placeholder='Title...' 
                            value={newArticle.title} 
                            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                        />
                    </div>

                    <div className="input-div">
                        <label htmlFor="article">Article:</label>
                        <textarea 
                            id='article' 
                            name='article'
                            placeholder='Start typing...' 
                            value={newArticle.article} 
                            onChange={(e) => setNewArticle({ ...newArticle, article: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="input-box">
                        <label htmlFor="writer">Writer:</label>
                        <input 
                            type='text'
                            id='writer' 
                            name='writer'
                            placeholder='Writer...' 
                            value={newArticle.writer} 
                            onChange={(e) => setNewArticle({ ...newArticle, writer: e.target.value })}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="category">Category:</label>
                        <input 
                            type='text'
                            id='category' 
                            name='category'
                            placeholder='Category...' 
                            value={newArticle.category} 
                            onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                        />
                    </div>
                    <button type="submit" form="add-edit-form" className="done-button">Publish <MdDone /></button>

                </form>
            </div>

            
        </>
    )
}

export default AddOrEditForm