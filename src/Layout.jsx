import Header from "./Header"
import { Outlet } from 'react-router-dom' 

const Layout = ({ showMenu, setShowMenu, isSearching, setIsSearching, searchValue, setSearchValue, data }) => {
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
            />
            <Outlet />
        </>
    )
}

export default Layout