"use client";

import { Truck, Headphones, RefreshCcw, Shield } from "lucide-react";

const services = [
  { title: "Free Shipping", sub: "On orders above $50", icon: Truck },
  { title: "24/7 Support", sub: "We’re here to help", icon: Headphones },
  { title: "Easy Returns", sub: "30-day money back", icon: RefreshCcw },
  { title: "Secure Payment", sub: "100% protected checkout", icon: Shield },
];

export default function ServicesCards() {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-12 pb-6 bg-gray-100">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-center min-w-70 h-20 bg-white shadow rounded-lg px-3 hover:shadow-md transition"
        >
          <service.icon className="h-10 w-10 text-white mr-3 flex-shrink-0 bg-blue-600 rounded-full p-1" />
          <div>
            <h4 className="text-md font-semibold text-gray-800">
              {service.title}
            </h4>
            <p className="text-sm text-gray-500">{service.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
