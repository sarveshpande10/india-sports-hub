import Nav from "./Nav"
import Search from "./Search"
import { MdSportsHandball } from "react-icons/md"

const Header = ({ showMenu, setShowMenu, isSearching, setIsSearching, searchValue, setSearchValue, data, activeSectionId, setActiveSectionId }) => {
    return (
        <>
            <div className="header">
                <header>
                    <MdSportsHandball className="logo" size={30}/>
                    <h1>IndiaSportsHub</h1>
                </header>
                <Nav 
                    showMenu={showMenu} 
                    setShowMenu={setShowMenu} 
                    activeSectionId={activeSectionId} 
                    setActiveSectionId={setActiveSectionId} 
                />
                <Search 
                    isSearching={isSearching} 
                    setIsSearching={setIsSearching} 
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue} 
                    data={data}
                />
            </div>
        </>
    )
}

export default Header