// Importing static assets and styles for the component
import IncGraph from '../../assets/images/Group-312.png';
import './Income.css';


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
        <section className="host-income">
            {/* Section title */}
            <h1>Income</h1>

            {/* Time range indicator */}
            <p>Last <span>30 days</span></p>

            {/* Total income summary */}
            <h2>${totalIncome.toLocaleString()}</h2>

            {/* Income graph visualization */}
            <img src={IncGraph} alt="Income graph" className="graph" />

            {/* Transactions header with count */}
            <div className="income-info-header">
                <h3>Your transactions ({transactionsData.length})</h3>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>

            {/* Transactions list */}
            <div className="transactions">
                {transactionsData.map(transaction => (
                    <div key={transaction.id} className="transaction">
                        {/* Transaction amount */}
                        <h3>${transaction.amount}</h3>

                        {/* Transaction date */}
                        <p>{transaction.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}