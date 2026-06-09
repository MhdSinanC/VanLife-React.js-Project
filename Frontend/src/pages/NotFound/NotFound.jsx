import { Link } from "react-router-dom"         // React Router link for navigation

// 404 Not Found page component
export default function NotFound() {

    return (
        <div className="not-found text-center flex flex-col px-8 mt-8 items-center">
            {/* Error message displayed when route is not found */}
            <h1 className="leading-10.5 text-[32px] font-black">Sorry, the page you were <br/>looking for was not found.</h1>

            {/* Redirect user back to homepage */}
            <Link to={'/'} className="bg-[#161616] text-white mt-8 font-bold text-[18px] p-[0.7rem] rounded-[0.32rem] w-full max-w-[31rem]">Return to home</Link>
        </div>
    )
}