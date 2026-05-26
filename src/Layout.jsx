import Header from "./Header"
import { Outlet } from 'react-router-dom' 

const Layout = ({ showMenu, setShowMenu, isSearching, setIsSearching, searchValue, setSearchValue, data, activeSectionId, setActiveSectionId }) => {
    return (
        <>
            <Header 
                showMenu={showMenu} 
                setShowMenu={setShowMenu} 
                isSearching={isSearching} 
                setIsSearching={setIsSearching} 
                searchValue={searchValue} 
                setSearchValue={setSearchValue} 
                data={data}
                activeSectionId={activeSectionId} 
                setActiveSectionId={setActiveSectionId} 
            />
            <Outlet />
        </>
    )
}

export default Layout