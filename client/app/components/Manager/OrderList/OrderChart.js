import React from 'react';
import { Bar } from 'react-chartjs-2';

const OrderChart = () => {
  // Sample data (replace with your actual order data)
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Orders',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56], // Replace with your order count data
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Order Statistics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrderChart;
