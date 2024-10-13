import { Link } from "react-router-dom"

export default function Navbar(){
    return (
        <>
        <nav>
        <ul>
            {/* <li><a href="#">Home</a></li> */}
            <Link to="/">Home</Link>
            {/* <li><a href="#">Feedback Form</a></li> */}
            <Link to="/feedback-form">Feedback Form</Link>
            {/* <li><a href="#">Posts</a></li> */}
            <Link to="/posts">Posts</Link>
            {/* <li><a href="#">About</a></li> */}
            <Link to="/about">About</Link>
            </ul>
            </nav>
            </>
    )
}