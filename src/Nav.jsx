import { GoChevronDown } from "react-icons/go";


const Nav = ({ showMenu, setShowMenu, activeSectionId, setActiveSectionId }) => {
    return (
        <nav>
            <ul>
                <li 
                    id={activeSectionId === "home" ? "active-section" : ""}
                    onClick={() => setActiveSectionId("home")}
                >Home</li>
                <li
                    id={activeSectionId === "videos" ? "active-section" : ""}
                    onClick={() => setActiveSectionId("videos")}
                >Videos</li>
                <li 
                    className="dropdown" 
                    onMouseEnter={() => setShowMenu("sports")}  
                    onMouseLeave={() => setShowMenu(null)}
                    id={activeSectionId === "sports" ? "active-section" : ""}
                    onClick={() => setActiveSectionId("sports")}
                >Sports
                    <GoChevronDown size={20} />
                    {showMenu === "sports" && <ul className="dropdown-menu">
                        <li>Football</li>
                        <li>Basketball</li>
                    </ul>}
                </li>
                <li 
                    className="dropdown" 
                    onMouseEnter={() => setShowMenu("tournaments")} 
                    onMouseLeave={() => setShowMenu(null)}
                    id={activeSectionId === "tournaments" ? "active-section" : ""}
                    onClick={() => setActiveSectionId("tournaments")}
                >Tournaments
                    <GoChevronDown size={20} />
                    {showMenu === "tournaments" && <ul className="dropdown-menu">
                        <li>Olympics</li>
                        <li>World Cup</li>
                    </ul>}
                </li>
                <li
                    id={activeSectionId === "brand-collab" ? "active-section" : ""}
                    onClick={() => setActiveSectionId("brand-collab")}
                >Brand Collaborations</li>
                <li 
                    className="dropdown" 
                    onMouseEnter={() => setShowMenu("more")} 
                    onMouseLeave={() => setShowMenu(null)}
                    id={activeSectionId === "more" ? "active-section" : ""}
                    onClick={() => setActiveSectionId("more")}
                >More
                    <GoChevronDown size={20} />
                    {showMenu === "more" && <ul className="dropdown-menu">
                        <li>Contact Us</li>
                        <li>About Us</li>
                    </ul>}
                </li>
            </ul>
        </nav>
    )
}

export default Nav