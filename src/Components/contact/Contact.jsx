import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_4amrnzh", // Replace with your EmailJS Service ID
        "template_p8jg4mj", // Replace with your EmailJS Template ID
        formData,
        "OUK74NYd54332V0rc" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setFormData({ user_name: "", user_email: "", message: "" });
          setLoading(false);
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        (error) => {
          toast.error("Failed to send. Please try again.");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#1a1a1a] px-6 py-12 md:px-20 lg:px-32">
      <Helmet>
        <title>Contact Us | Velamore</title>
        <meta
          name="description"
          content="Get in touch with Velamore for support, partnerships, or inquiries."
        />
      </Helmet>

      {/* Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="text-base md:text-lg text-gray-600">
          Have a question, feedback, or collaboration idea? We’d love to hear
          from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <MapPin className="text-[#FF4141]" />
            <div>
              <h4 className="font-semibold text-lg">Office Address</h4>
              <p className="text-gray-600">Koderma City, IN 825410,JH</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-[#FF4141]" />
            <div>
              <h4 className="font-semibold text-lg">Phone</h4>
              <p className="text-gray-600">+91 9263601915</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-[#FF4141]" />
            <div>
              <h4 className="font-semibold text-lg">Email</h4>
              <p className="text-gray-600">velamorefashion@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#f9f9f9] p-6 sm:p-8 rounded-xl shadow-md space-y-6"
        >
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF4141]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF4141]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF4141]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#FF4141] text-white py-2 px-6 rounded-full hover:bg-[#e63a3a] transition-all disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
