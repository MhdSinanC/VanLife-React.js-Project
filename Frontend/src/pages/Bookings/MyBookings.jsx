import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { apiFetch } from '../../../utils/apiFetch';

export default function MyBookings() {

    const { token, setToken } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await apiFetch(
                    `${import.meta.env.VITE_API_URL}/api/bookings/my`,
                    token,
                    setToken
                );

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);

                setBookings(data.data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [])



    const handleCancelBooking = async (bookingId) => {
        //1. Confirm with the user first
        const confirmed = window.confirm("Are you sure you want to cancel this booking");
        if (!confirmed) return;

        try {
            const res = await apiFetch(
                `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/cancel`,
                token,
                setToken,
                { method: 'PATCH' }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to cancel booking');

            //2. Update local state so UI updates immediately (no full page reload needed!)
            setBookings(prev => (
                prev.map(item => (
                    item._id === bookingId ? { ...item, status: 'cancelled' } : item
                ))
            ))
        }
        catch (err) {
            alert(err.message);
        }
    }


    if (loading) return <p className='text-center mt-10'>Loading bookings..</p>
    if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>


    return (
        <div className='max-w-3xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-black mb-6'>My Bookings</h1>

            {bookings.length === 0 ? (
                // Empty state
                <div className='text-center py-16'>
                    <p className='text-gray-500 mb-4'>You have no booking yet.</p>
                    <Link
                        to={'/vans'}
                        className='bg-[#FF8C38] text-white px-4 py-2 rounded-md font-semibold'
                    >
                        Browse Vans
                    </Link>
                </div>
            ) : (
                //Booking list
                <div className='flex flex-col gap-4'>
                    {bookings.map(booking => (
                        <div
                            key={booking._id}
                            className='border rounded-lg p-4 flex gap-4 items-center shadow-sm'
                        >
                            {/* Van image*/}
                            <img
                                src={booking.vanId?.imageUrl}
                                alt={booking.vanId?.name}
                                className='w-24 h-20 object-cover rounded-md'
                            />

                            {/* Booking info */}
                            <div className='flex-1'>
                                <h2 className='font-bold text-lg'>{booking.vanId?.name}</h2>
                                <p className='text-gray-500 text-sm'>
                                    {new Date(booking.startDate).toLocaleDateString()} &rarr;{' '}
                                    {new Date(booking.endDate).toLocaleDateString()}
                                </p>
                                <p className='font-semibold text-[#FF8C38] mt-1'>
                                    ${booking.totalPrice} total
                                </p>
                            </div>

                            {/*Status & Cancel Action*/}
                            <div className='flex flex-col items-end gap-2'>
                                <span
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {booking.status}
                                </span>

                                {/* Only show cancel button if booking is still confirmed */}
                                {booking.status === 'confirmed' && (
                                    <button
                                        onClick={() => handleCancelBooking(booking._id)}
                                        className='text-xs text-red-500 hover:text-red-700 font-semibold underline cursor-pointer'
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}