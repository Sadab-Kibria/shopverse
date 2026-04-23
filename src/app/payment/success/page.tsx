"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiHome, FiShoppingBag, FiCalendar, FiDollarSign, FiCreditCard, FiPackage } from "react-icons/fi";

interface CartItem {
  name: string;
  price: number;
  cartQuantity: number;
  total: number;
}

export default function PaymentSuccessPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [transactionId, setTransactionId] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedCart = localStorage.getItem("cart") || "[]";
    const items: CartItem[] = JSON.parse(storedCart);
    setCartItems(items);
    const total = items.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(total);

    setTransactionId(`TRX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);

    // Clear the cart after successful payment
    localStorage.removeItem("cart");
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Success Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header Success Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <FiCheckCircle className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold mb-3">Payment Successful!</h1>
              <p className="text-lg opacity-90 max-w-md">
                Thank you for your purchase. Your order has been confirmed and is being processed.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left - Order Summary */}
            <div className="p-8 border-r border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                  <FiShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Transaction Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <FiCreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-bold text-lg text-gray-900">{transactionId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <FiCalendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <FiDollarSign className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Shopping Button */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FiHome className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right - Products List */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                  <FiPackage className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Purchased Items</h2>
              </div>

              {/* Products List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-blue-600 text-sm">
                              {idx + 1}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Quantity:</span>
                              <span className="font-bold text-blue-600">{item.cartQuantity}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Unit Price:</span>
                              <span className="font-bold text-green-600">${item.price.toFixed(2)}</span>
                            </span>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                              ${item.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Order Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Includes all taxes and shipping fees
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
              <p>Your order will be shipped within 2-3 business days. You will receive a confirmation email shortly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}