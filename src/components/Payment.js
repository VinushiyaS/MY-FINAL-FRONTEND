import React, { useState } from 'react'; // Ensure useState is imported
import { useNavigate } from 'react-router-dom';

function Payment() {
    const [selectedPlan, setSelectedPlan] = useState('');
    const navigate = useNavigate();
      // Ensure this function is defined and used correctly
      const handlePaymentSuccess = () => {
        alert('Payment successful! Redirecting to Committee Leader Dashboard.');
        navigate('/home');
    };
    const plans = {
        '2 days': 500,
        '1 month': 1750,
        '3 months': 4500,
        '6 months': 7250,
        '1 year': 9799
        

    };


   
    return (
        <div className="container">
            <h2>Payment for Committee Leader Subscription</h2>
            <div className="form-group">
                <label>Select Subscription Plan:</label>
                <select 
                    className="form-control"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                >
                    <option value="">Select a plan</option>
                    {Object.entries(plans).map(([plan, amount]) => (
                        <option key={plan} value={plan}>
                            {plan} - LKR {amount}
                        </option>
                    ))}
                </select>
            </div>
            {/* Add payment integration here */}
            <button className="btn" onClick={handlePaymentSuccess}>
                Pay Now
            </button>
        </div>
    );
}

export default Payment;
