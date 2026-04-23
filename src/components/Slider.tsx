"use client";

import { motion } from "framer-motion";

export default function Slider() {
  // Get current day & date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const currentDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="overflow-hidden whitespace-nowrap bg-white py-3">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="text-md text-white"
      >
        <h3 className="text-black">
            {currentDate} — Welcome to ShopEase. All our online activities are functional.
        </h3>
         
      </motion.div>
    </div>
  );
}
