import { Link } from "react-router-dom"         // React Router link for navigation
import './NotFound.css'

// 404 Not Found page component
export default function NotFound() {

    return (
        <div className="not-found">
            {/* Error message displayed when route is not found */}
            <h1>Sorry, the page you were <br/>looking for was not found.</h1>

            {/* Redirect user back to homepage */}
            <Link to={'/'}>Return to home</Link>
        </div>
    )
}