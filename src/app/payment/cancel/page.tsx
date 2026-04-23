"use client";

import Link from "next/link";
import { FiXCircle, FiHome, FiAlertCircle, FiCalendar, FiCreditCard, FiShoppingBag } from "react-icons/fi";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Cancel Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header Cancel Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <FiXCircle className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold mb-3">Payment Canceled</h1>
              <p className="text-lg opacity-90 max-w-md">
                Your payment was not completed. No charges were made to your account.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left - Cancel Details */}
            <div className="p-8 border-r border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-rose-100 to-orange-100 rounded-xl">
                  <FiAlertCircle className="w-6 h-6 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Status</h2>
              </div>

              {/* Transaction Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <FiXCircle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-bold text-lg text-rose-600">Payment Canceled</p>
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
                    <FiCreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Note</p>
                    <p className="font-medium text-gray-900">No charges were made</p>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-100">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 mb-1">Important</p>
                    <p className="text-sm text-amber-700">
                      Your cart items have been preserved. You can return to checkout anytime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-3">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FiHome className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Right - Help & Info */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                  <FiAlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
              </div>

              {/* FAQ/Help Section */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Why was my payment canceled?</h3>
                  <p className="text-sm text-gray-600">
                    Payments can be canceled by you during the checkout process, or due to payment verification issues.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Will I be charged?</h3>
                  <p className="text-sm text-gray-600">
                    No, since the payment was canceled, no charges were made to your payment method.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Can I try again?</h3>
                  <p className="text-sm text-gray-600">
                    Yes, your cart items are saved. You can return to checkout and complete your purchase.
                  </p>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-800 mb-3">Need further assistance?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you're experiencing issues with payments, please contact our support team.
                  </p>
                  <button className="w-full px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
              <FiAlertCircle className="w-4 h-4 text-amber-500" />
              <p>Your shopping cart has been preserved. Feel free to complete your purchase when ready.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}