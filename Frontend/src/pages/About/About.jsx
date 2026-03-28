import bgImg from '../../assets/images/about-hero.png'
import { Link } from 'react-router-dom'
import './About.css';


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
            <div className="about-page-container">
                {/* Top section with hero image and description */}
                <div className="about-page-top">
                    <img src={bgImg} className='about-hero-img' alt="People enjoying vanlife road trip" />
                    <div className="about-page-content">
                        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                        <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                        <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                    </div>
                </div>

                {/* Call-to-action section */}
                <div className="about-page-cta">
                    <h2>Your destination is waiting.<br />Your van is ready.</h2>
                    {/* Redirects users to vans listing page */}
                    <Link className="link-button" to="/vans">Explore our vans</Link>
                </div>
            </div>
    )
}