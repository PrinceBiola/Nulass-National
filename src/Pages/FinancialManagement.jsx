import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const FinancialManagement = () => {
    const [financialData, setFinancialData] = useState({ totalIncome: 0, pendingPayments: 0, applications: [] });

    useEffect(() => {
        const fetchFinancialData = async () => {
            const response = await axios.get('/api/financials', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setFinancialData(response.data);
        };
        fetchFinancialData();
    }, []);

    const data = {
        labels: ['Total Income', 'Pending Payments'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [financialData.totalIncome, financialData.pendingPayments],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Financial Management</h1>
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <Bar data={data} />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Applications Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Payment Status</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {financialData.applications.map(app => (
                            <tr key={app._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{app.firstName} {app.lastName}</td>
                                <td className="py-2 px-4 border-b">{app.email}</td>
                                <td className="py-2 px-4 border-b">{app.phoneNumber}</td>
                                <td className="py-2 px-4 border-b">{app.status}</td>
                                <td className="py-2 px-4 border-b">{app.paymentStatus}</td>
                                <td className="py-2 px-4 border-b">{app.amount || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Additional UI components for notifications can be added here */}
        </div>
    );
};

export default FinancialManagement; 