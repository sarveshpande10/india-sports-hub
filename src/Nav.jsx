import { GoChevronDown } from "react-icons/go";


const Nav = ({ showMenu, setShowMenu }) => {
    return (
        <nav>
            <ul>
                <li>Home</li>
                <li>Videos</li>
                <li 
                    className="dropdown" 
                    onMouseEnter={() => setShowMenu("sports")}  
                    onMouseLeave={() => setShowMenu(null)}
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
                >Tournaments
                    <GoChevronDown size={20} />
                    {showMenu === "tournaments" && <ul className="dropdown-menu">
                        <li>Olympics</li>
                        <li>World Cup</li>
                    </ul>}
                </li>
                <li>Brand Collaborations</li>
                <li 
                    className="dropdown" 
                    onMouseEnter={() => setShowMenu("more")} 
                    onMouseLeave={() => setShowMenu(null)}
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