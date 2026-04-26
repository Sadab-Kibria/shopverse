"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, X } from "lucide-react";
import { FiShoppingCart, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

type Props = {
  name: string;
  price: number;
  cartQuantity: number;
};

export default function PurchaseButton({ name, price, cartQuantity }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartTotal = price * cartQuantity;

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToCart = async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = { name, price, cartQuantity, total: cartTotal };

    const index = existingCart.findIndex((item: any) => item.name === name);

    if (index > -1) {
      existingCart[index].cartQuantity += cartQuantity;
      existingCart[index].total += cartTotal;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

toast.success(
  <div className="flex items-center gap-3">
    <span className="text-blue-600">
      {name} added to cart
    </span>
  </div>,
  {
    duration: 3500,
    position: "bottom-right",
    style: {
      background: "#ffffff",
      borderRadius: "14px",
      padding: "14px 18px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
      border: "1px solid #e5e7eb",
    },
  }
);

    setTimeout(() => {
      setShowModal(false);
      setIsProcessing(false);
    }, 500);
  };

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !isProcessing && setShowModal(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                <FiShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Confirm Purchase
                </h2>
                <p className="text-sm text-gray-600">Add item to your cart</p>
              </div>
            </div>

            {!isProcessing && (
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Product Info */}
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-6">
            <div className="p-2.5 bg-white rounded-xl shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>

            <div>
              <p className="text-gray-800">
                You are about to add{" "}
                <span className="font-bold text-blue-700">{name}</span> to your
                cart!
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Price</span>
                <span className="font-medium">${price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold">{cartQuantity}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {isProcessing ? (
            <div className="py-4 text-center">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-gray-600 font-medium">Adding to cart...</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={addToCart}
                className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Order
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isProcessing && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
            Secure checkout • Free shipping available
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-lg"
      >
        <FiShoppingCart className="w-5 h-5" />
        Confirm Purchase
      </button>

      {mounted && showModal && createPortal(modal, document.body)}
    </>
  );
}