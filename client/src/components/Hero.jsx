export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 to-indigo-800 py-16 font-[sans-serif]">
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/originals/0d/31/3e/0d313e0741d24a50edaf3ff5e10509fe.gif"
          alt="Background Image"
          className="w-full h-full object-cover opacity-50 max-h-screen"
        />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-8 z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Welcome to our Gaming Paradise!
        </h1>
        <p className="text-lg md:text-xl mb-12">
          Prepare for an epic adventure with our thrilling games.
        </p>
      </div>
    </div>
  );
}
