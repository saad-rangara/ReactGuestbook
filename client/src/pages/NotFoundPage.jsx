import { Link } from 'react-router-dom';
export default function NotFoundPage(){
    return (
        <div className="Not-found">
            <h1>404 Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p><Link to="/">Go back to Home</Link></p>
        </div>
    )
}