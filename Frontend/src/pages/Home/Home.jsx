import { Link } from "react-router-dom"

export default function Home() {
    return (
        <>
            <div className="bg-[linear-gradient(rgba(0,0,0,0.46),rgba(0,0,0,0.46)),url('/home-hero.png')] bg-cover bg-no-repeat bg-center text-white py-[2.81rem] px-[1.43rem] flex flex-col justify-between items-center text-center min-h-[86vh] min-[497px]:items-start min-[497px]:justify-center min-[497px]:text-start min-[497px]:min-h-[86vh]">
                <h1 className="font-bold text-4xl leading-10.5 my-6 min-[497px]:text-[3.25rem] min-[497px]:leading-14.5 min-[497px]:max-w-175 min-[497px]:my-8.5">You got the travel plans, we got the travel vans.</h1>
                <p className="leading-6 my-4 min-[497px]:text-[1.4rem] min-[497px]:leading-8 min-[497px]:max-w-175 min-[497px]:my-5.5">Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                <Link to='/vans' className="inline-block text-center bg-[#FF8C38] w-full mt-6.75 py-3 text-white font-bold rounded-[0.3125rem] cursor-pointer transition-transform duration-100 ease-in-out hover:scale-[0.98] min-[497px]:text-[1.4rem] min-[497px]:max-w-100 min-[497px]:h-12.75 min-[497px]:flex min-[497px]:items-center min-[497px]:justify-center">Find your van</Link>
            </div>
        </>
    )
}