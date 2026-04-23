"use client";

import { useState, useEffect, useRef } from "react";
import { X, ShoppingCart, CreditCard, Printer } from "lucide-react";

type CartItem = {
  name: string;
  price: number;
  cartQuantity: number;
  total: number;
};

export default function NavCartButton() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage whenever cart opens
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, [showCart]);

  // Click outside to close logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };
    if (showCart) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart]);

  const removeItem = (name: string) => {
    const updatedCart = cartItems.filter((item) => item.name !== name);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            cartQuantity: item.cartQuantity,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Payment initialization failed");
    } catch (err) {
      alert("Error starting payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const openCart = () => {
    setShowCart(true);
    // Slight delay for CSS transition
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeCart = () => {
    setIsAnimating(false);
    setTimeout(() => setShowCart(false), 300);
  };

  return (
    <div className="relative">
      {/* Navbar Style Cart Toggle Button */}
      <button
        onClick={showCart ? closeCart : openCart}
        className={`relative p-3 rounded-2xl transition-all duration-300 ${
          showCart ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border-2 border-white">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Sidebar Overlay */}
      {showCart && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeCart}
          />
          
          {/* Sidebar */}
          <div 
            ref={cartRef}
            className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
              isAnimating ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <ShoppingCart size={24} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">My Cart</h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Scrollable Items Section */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.cartQuantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-800">${item.total.toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Section */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <Printer size={18} />
                    Checkout & Print
                  </button>
                  
                  <button
                    onClick={handleStripeCheckout}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><CreditCard size={18} /> Pay Now</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden Print Area */}
      <div ref={printRef} className="hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Order Receipt</h1>
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between py-2 border-b">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">{item.cartQuantity} × ${item.price.toFixed(2)}</p>
              </div>
              <p className="font-bold">${item.total.toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-6 pt-4 border-t text-right text-xl font-bold">
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}