import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure'; // Ensure you have this hook to make secure API calls
import useAuth from '../hooks/useAuth';

const Order = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosSecure.get(`/payments?email=${user.email}`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment info:", error);
      }
    };

    if (user?.email) {
      fetchPayments();
    }
  }, [user, axiosSecure]);

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      {/* Banner */}
      <div className='bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col items-center justify-center gap-8'>
          <div className='px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Track All Your<span className='text-green-500'> Orders!</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className='bg-green-500 text-white rounded-sm'>
            <tr>
              <th>Sr No.</th>
              <th>Order Date</th>
              <th>Transaction ID</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.totalPrice}</td>
                <td>{payment.status}</td>
                <td>
                  <button className="btn btn-ghost text-red-600 btn-xs">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
