"use client"

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-end justify-start overflow-hidden">
      
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/FINAL.mp4" type="video/mp4" />
        <img src="/images/hero1.jpg" alt="Fallback" className="w-full h-full object-cover" />
      </video>

      {/* Content Container */}
      {/* Increased horizontal padding (px) to push text further right */}
      <div className="relative z-20 py-12 px-12 md:px-32 lg:px-48 max-w-5xl text-white text-left">
        <div className="p-6 md:p-8 inline-block">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-4 leading-tight">
            Welcome to <span className="">ShopVerse</span>
          </h2>
          <p className="text-md sm:text-lg md:text-xl mb-8 font-medium max-w-lg">
            Find the best products at unbeatable prices, delivered straight to your door.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 mb-10 rounded-md border-dashed border-red-600 text-md font-extralight transition-all duration-300 transform hover:scale-105">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;