import { BsStarFill } from 'react-icons/bs'                  // Icon for star ratings
import ratingImg from '../../assets/images/Group 314.png'    // Static image for rating distribution graph


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
        <section className="host-reviews max-w-125 px-4">

            {/* Header section */}
            <div className="top-text flex items-center gap-4">
                <h2 className='text-[32px] my-6.5 font-black'>Your reviews</h2>
                <p className='text-[#4D4D4D] mt-5 mb-4'>Last <span className='font-bold underline'>30 days</span></p>
            </div>
            {/* Ratings summary graph */}
            <img className='graph w-full' src={ratingImg} alt="rating" />
            {/* Total reviews count */}
            <h3 className='text-[1.17rem] my-[1.17rem] font-black'>Reviews({reviewsData.length})</h3>
            {/* Reviews list */}
            {reviewsData.map(review => (
                <div key={review.id}>
                    <div className="review">
                        <div className='star-container flex'>
                            {/* Star rating (dynamic based on review.rating) */}
                            {[...Array(5)].map((_, index) => (
                                <BsStarFill
                                    key={index}
                                    // Highlight stars based on rating value
                                    className={index < review.rating ? 'star-active text-[#FF8C38]' : 'star-inactive text-[#E4E5E9]'}
                                />
                            ))}
                        </div>


                        {/* Reviewer info */}
                        <div className="review-info flex gap-1.25 font-semibold">
                            <p className='name text-[#161616] mt-2.5 mb-4'>{review.name}</p>
                            <p className='date text-[#8C8C8C] mt-2.5 mb-4'>{review.date}</p>
                        </div>
                        {/* Review text */}
                        <p className='review-text mt-0'>{review.text}</p>
                    </div>
                    {/* Divider between reviews */}
                    <hr className='my-2'/>
                </div>
            ))}

        </section>
    )
}