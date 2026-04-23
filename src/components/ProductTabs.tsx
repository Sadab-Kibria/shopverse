import SpecsDisplay from "./SpecsDisplay";

export default function ProductSections({ description, specs }: { description: string, specs: Record<string, any> | null}) {
  return (
    <div className="mt-12 max-w-7xl mx-auto px-4">
      {/* Section Nav */}
      <div className="flex space-x-8 border-b border-gray-200 pb-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <a href="#description" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          Description
        </a>
        <a href="#questions" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          Questions
        </a>
        <a href="#reviews" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          Reviews
        </a>
      </div>

      <div className="mt-10 space-y-16">
        {/* Description */}
        <section id="description" className="scroll-mt-24">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Product Description</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">{description}</p>
        </section>

        <div className="scroll-mt-24">
            <SpecsDisplay specs={specs}/>
        </div>

        {/* Questions with Accordion/Dropdown effect */}
        <section id="questions" className="scroll-mt-24 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {[
              { q: "Does this product come with a warranty?", a: "Yes, we offer a 2-year comprehensive warranty that covers all manufacturing defects." },
              { q: "Is it available in different colors?", a: "Currently, this model is available in Carbon Black, Silver Streak, and Arctic White." },
              { q: "How long is the delivery time?", a: "Standard shipping takes 3-5 business days. Express shipping options are available at checkout." }
            ].map((item, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-300 open:shadow-md">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">{item.q}</span>
                  <span className="text-gray-400 transition-transform duration-300 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-gray-50/50">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="scroll-mt-24 border-t border-gray-100 pt-12 pb-20">
          <h2 className="text-xl font-bold mb-8 text-gray-900">Reviews</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { stars: "★★★★☆", text: "Great product! Works as expected.", user: "James W." },
              { stars: "★★★★★", text: "Amazing quality, totally worth it.", user: "Sophia L." },
              { stars: "★★★☆☆", text: "Good, but could be improved.", user: "Michael K." }
            ].map((rev, i) => (
              <div key={i} className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm transition-all hover:border-gray-300">
                <div className="text-yellow-500 text-sm mb-2">{rev.stars}</div>
                <p className="text-gray-700 text-sm mb-4 italic">"{rev.text}"</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">— {rev.user}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}