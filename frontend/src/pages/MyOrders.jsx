import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingOrderId, setProcessingOrderId] = useState(null);

  const navigate = useNavigate();

  // =========================
  // FETCH USER ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders/my");
      setOrders(data?.orders || []);
    } catch (error) {
      console.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // HANDLE RESUME STRIPE PAYMENT
  // =========================
  const handlePayNow = async (orderId) => {
    try {
      setProcessingOrderId(orderId);

      const { data } = await axios.post(
        `/payment/create-payment-intent/${orderId}`
      );

      navigate(`/payment/${orderId}`, {
        state: {
          clientSecret: data.clientSecret,
          publishableKey: data.publishableKey,
        },
      });
    } catch (error) {
      console.error(error.response?.data?.message);
    } finally {
      setProcessingOrderId(null);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading your orders...
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!orders.length) {
    return (
      <div className="text-center mt-20 text-gray-600">
        You have no orders yet.
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-xl p-6 mb-6"
        >
          {/* Header */}
          <div className="flex justify-between mb-3">
            <p className="font-semibold">
              Order ID: {order._id}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Items */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          {/* Footer */}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <div>
              <p className="text-sm">
                Payment:
                <span
                  className={`ml-2 font-semibold ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : order.paymentStatus === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>

              <p className="text-sm">
                Status:
                <span className="ml-2 font-semibold text-indigo-600">
                  {order.orderStatus}
                </span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold mb-2">
                ₹{order.totalAmount}
              </p>

              {/* Show Resume Button only if Stripe + Pending */}
              {order.paymentMethod === "Stripe" &&
                order.paymentStatus === "pending" && (
                  <button
                    onClick={() => handlePayNow(order._id)}
                    disabled={processingOrderId === order._id}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {processingOrderId === order._id
                      ? "Processing..."
                      : "Complete Payment"}
                  </button>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
