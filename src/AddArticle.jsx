import { MdDone } from 'react-icons/md'
import { IoArrowBack } from 'react-icons/io5'
// import { Link } from 'react-router-dom'

const AddArticle = ({ newItem, setNewItem, functionName, setMode }) => {

    return (
        <div className="add-edit-wrapper">
            <div className="button-header">
                {/* <Link to="/"> */}
                    <button type='button' className="back-button" onClick={() => {
                        setNewItem({ title: '', article: '', writer: '', date: '' })
                        setMode("home")
                    }}><IoArrowBack /></button>
                {/* </Link> */}
                    <button type="submit" form="add-edit-form" className="done-button"><MdDone /></button>
            </div>
            <form id="add-edit-form" onSubmit={functionName}>
                <label htmlFor="title">Title:</label>
                <input 
                    type='text' 
                    id='title'
                    name='title' 
                    placeholder='Title...' 
                    value={newItem.title} 
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
                <label htmlFor="article">Article:</label>
                <textarea 
                    id='article' 
                    name='article'
                    placeholder='Start typing...' 
                    value={newItem.article} 
                    onChange={(e) => setNewItem({ ...newItem, article: e.target.value })}
                ></textarea>
                <label htmlFor="writer">Writer:</label>
                <input 
                    type='text'
                    id='writer' 
                    name='writer'
                    placeholder='Writer...' 
                    value={newItem.writer} 
                    onChange={(e) => setNewItem({ ...newItem, writer: e.target.value })}
                />
            </form>
        </div>
    )
}

export default AddArticle