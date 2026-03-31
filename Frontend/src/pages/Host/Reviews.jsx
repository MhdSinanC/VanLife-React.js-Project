import { BsStarFill } from 'react-icons/bs'                  // Icon for star ratings
import ratingImg from '../../assets/images/Group 314.png'    // Static image for rating distribution graph
import './Reviews.css'


// Component to display host reviews and ratings
export default function Reviews() {

    // TODO: Fetch reviews dynamically from backend API
    // Static review data (can be replaced with API data)
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 4,
            name: "Sandy",
            date: "December 12, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
    ]

    return (
        <section className="host-reviews">

            {/* Header section */}
            <div className="top-text">
                <h2>Your reviews</h2>
                <p>Last <span>30 days</span></p>
            </div>
            {/* Ratings summary graph */}
            <img className='graph' src={ratingImg} alt="rating" />
            {/* Total reviews count */}
            <h3>Reviews({reviewsData.length})</h3>
            {/* Reviews list */}
            {reviewsData.map(review => (
                <div key={review.id}>
                    <div className="review">

                        {/* Star rating (dynamic based on review.rating) */}
                        {[...Array(5)].map((_, index) => (
                            <BsStarFill
                                key={index}
                                // Highlight stars based on rating value
                                className={index < review.rating ? 'star-active' : 'star-inactive' }
                            />
                        ))}

                        {/* Reviewer info */}
                        <div className="review-info">
                            <p className='name'>{review.name}</p>
                            <p className='date'>{review.date}</p>
                        </div>
                        {/* Review text */}
                        <p className='review-text'>{review.text}</p>
                    </div>
                    {/* Divider between reviews */}
                    <hr />
                </div>
            ))}

        </section>
    )
}