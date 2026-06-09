import bgImg from '../../assets/images/about-hero.png'
import { Link } from 'react-router-dom'


/**
 * About Page
 * -----------
 * Displays information about the platform and its mission.
 * Includes:
 * - Hero image with descriptive content
 * - Call-to-action section directing users to explore vans
 */
export default function About() {
    return (
            <div className="overflow-x-hidden">
                {/* Top section with hero image and description */}
                <div className="min-[650px]:flex min-[650px]:gap-4">
                    <img src={bgImg} className='w-full max-w-full block min-[650px]:w-[60%] min-[650px]:shrink-0 min-[650px]:h-auto min-[650px]:object-cover' alt="People enjoying vanlife road trip" />
                    <div className="px-8 py-6 text-[#161616] min-[650px]:w-[40%] min-[650px]:shrink-0">
                        <h1 className='leading-9.5 text-[32px] font-black my-5.25 min-[650px]:text-[2.4rem] min-[650px]:font-black min-[650px]:my-6.25 min-[650px]:leading-11.25'>Don’t squeeze in a sedan when you could relax in a van.</h1>
                        <p className='leading-5.5 my-4 min-[650px]:text-[1.4rem] min-[650px]:my-[22.4px] min-[650px]:leading-9'>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                        <p className='leading-5.5 my-4 min-[650px]:text-[1.4rem] min-[650px]:my-[22.4px] min-[650px]:leading-9'>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                    </div>
                </div>

                {/* Call-to-action section */}
                <div className="bg-[#FFCC8D] text-[#161616] rounded-[5px] my-2 mx-8 py-4 px-8 flex flex-col justify-between items-center min-[650px]:flex-row min-[650px]:justify-center min-[650px]:gap-8 min-[650px]:m-0 min-[650px]:rounded-none min-[650px]:w-full min-[650px]:mt-auto">
                    <h2 className='text-[24px] font-black m-0 py-8 text-center min-[650px]:text-[1.8rem] min-[650px]:font-black'>Your destination is waiting.<br />Your van is ready.</h2>
                    {/* Redirects users to vans listing page */}
                    <Link className="bg-[#161616] text-white rounded-[10px] inline-block text-center border-none py-3 px-5.5 font-bold cursor-pointer transition-transform duration-100 ease-in-out hover:translate-px hover:text-[#161616] hover:bg-white min-[650px]:text-[1.3rem]" to="/vans">Explore our vans</Link>
                </div>
            </div>
    )
}