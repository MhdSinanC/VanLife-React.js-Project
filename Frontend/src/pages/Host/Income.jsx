// Importing static assets and styles for the component
import IncGraph from '../../assets/images/Group-312.png';


// Income component displays earnings summary and recent transactions
export default function Income() {

    // TODO: Replace static data with backend API call
    // Static transaction data
    const transactionsData = [
        { amount: 720, date: "01/03/2023", id: "1" },
        { amount: 560, date: "12/12/2022", id: "2" },
        { amount: 980, date: "03/12/2022", id: "3" },
    ]

    const totalIncome = transactionsData.reduce((sum, t) => sum + t.amount, 0);

    return (
        <section className="host-income px-4">
            {/* Section title */}
            <h1 className='text-[36px] my-6 font-black'>Income</h1>

            {/* Time range indicator */}
            <p className='text-[#4D4D4D] my-[0.8rem]'>Last <span className='font-bold underline'>30 days</span></p>

            {/* Total income summary */}
            <h2 className='text-[48px] font-extrabold my-7.5'>${totalIncome.toLocaleString()}</h2>

            {/* Income graph visualization */}
            <img src={IncGraph} alt="Income graph" className="graph w-full max-w-125" />

            {/* Transactions header with count */}
            <div className="income-info-header max-w-125 flex justify-between items-center">
                <h3 className='text-[24px] my-6 font-black'>Your transactions ({transactionsData.length})</h3>
                <p className='text-[#4D4D4D]'>
                    Last <span className='font-bold underline'>30 days</span>
                </p>
            </div>

            {/* Transactions list */}
            <div className="transactions max-w-125 flex flex-col gap-[1.7rem]">
                {transactionsData.map(transaction => (
                    <div key={transaction.id} className="transaction flex items-center justify-between py-0 px-8.75 bg-white">
                        {/* Transaction amount */}
                        <h3 className='text-[36px] font-semibold my-7.5'>${transaction.amount}</h3>

                        {/* Transaction date */}
                        <p className='text-[#4D4D4D] text-[20px] my-5'>{transaction.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}