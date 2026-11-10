import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { apiFetch } from '../../../utils/apiFetch';


export default function RentModal({ van, onClose }) {

    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    //Form state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    //Calculate total price live from selected dates
    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;

        const msPerDay = 1000 * 60 * 60 * 24;
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / msPerDay);

        return days > 0 ? days * van.price : 0;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (calculateTotal() <= 0) {
            setError('End date must be after start date');
            return;
        }

        setLoading(true);

        try {
            const res = await apiFetch(
                `${import.meta.env.VITE_API_URL}/api/bookings`,
                token,
                setToken,
                { method: 'POST', body: { vanId: van._id, startDate, endDate } }
            );


            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Booking failed');

            setSuccess(true);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };


    // Today's date in YYYY-MM-DD format (for the min attribute)
    const today = new Date().toISOString().split('T')[0];




    return (
        // Backdrop
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/* Modal box */}
            <div
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {success ? (
                    // ✅ Success screen
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Booking Confirmed! 🎉</h2>
                        <p className="text-gray-600 mb-4">
                            Your booking for <strong>{van.name}</strong> is confirmed.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => navigate('/bookings')}
                                className="bg-[#FF8C38] text-white px-4 py-2 rounded-md font-semibold"
                            >
                                View My Bookings
                            </button>
                            <button
                                onClick={onClose}
                                className="border border-gray-300 px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    // 📅 Booking form
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Rent {van.name}</h2>
                            <button onClick={onClose} className="text-gray-400 text-2xl">&times;</button>
                        </div>
                        <p className="text-gray-500 mb-4">
                            <span className="font-bold text-black">${van.price}</span>/day
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block font-semibold mb-1">Start Date</label>
                                <input
                                    type="date"
                                    min={today}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="w-full border rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">End Date</label>
                                <input
                                    type="date"
                                    min={startDate || today}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    className="w-full border rounded-md p-2"
                                />
                            </div>
                            {/* Live price preview */}
                            {calculateTotal() > 0 && (
                                <div className="bg-orange-50 border border-orange-200 rounded-md p-3 text-center">
                                    <p className="text-gray-500 text-sm">Total</p>
                                    <p className="text-2xl font-black text-[#FF8C38]">${calculateTotal()}</p>
                                </div>
                            )}
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#FF8C38] text-white py-2 px-4 rounded-md font-bold disabled:opacity-50"
                            >
                                {loading ? 'Confirming...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )

}