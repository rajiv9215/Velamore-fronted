// About.jsx
import aboutimg from '../Assets/about4.jpeg';
import React from "react";
import { ShieldCheck, Leaf, Star } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white text-gray-900 py-16 px-6 md:px-12 lg:px-32">
      {/* About Intro */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Redefining Luxury in Every Thread
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600">
          At <span className="font-semibold text-black">Velamore</span>, we don’t just create T-shirts — we craft elevated essentials for modern minimalists who believe in luxury that lasts.
        </p>
      </div>

      {/* Image & Philosophy */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-12">
        <div className="flex justify-center">
          <img
            src={aboutimg}
            alt="Premium T-shirt Material"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <p className="text-gray-600 text-lg mb-4">
            Every fabric, every silhouette, every stitch — designed with intention. We partner with premium textile mills and ethical factories to ensure every tee delivers uncompromising comfort and style.
          </p>
          <p className="text-gray-600 text-lg">
            Timeless essentials for those who understand that less is more — and that quality never goes out of style.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-24">
        <h2 className="text-3xl font-bold mb-10">Why Choose Velamore?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto text-left">
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Impeccable Quality</h3>
            <p className="text-gray-600">
              Every tee goes through a rigorous quality check, ensuring longevity and luxury you can feel.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Leaf className="w-10 h-10 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainable Fabric</h3>
            <p className="text-gray-600">
              We use eco-friendly, breathable cotton blends that are kind to your skin and the planet.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Star className="w-10 h-10 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Minimal Design</h3>
            <p className="text-gray-600">
              No noise, no clutter — just clean, modern essentials that elevate your everyday look.
            </p>
          </div>
        </div>
      </div>

      {/* Founder’s Note */}
      <div className="bg-gray-50 p-10 rounded-xl shadow-lg max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">A Note from the Founder</h2>
        <p className="text-gray-700 text-lg mb-6 italic">
          "I created Velamore because I couldn’t find T-shirts that balanced premium feel with timeless style. What started as a personal need is now a growing mission — to make minimal luxury accessible, ethical, and effortless."
        </p>
        <p className="text-black font-semibold text-lg">– Rajiv Ranjan</p>
      </div>
    </div>
  );
};

export default About;
