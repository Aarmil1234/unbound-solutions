import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    service: formData.service,
    message: formData.message,
    to_email: formData.email,
  };

  try {
    // Send Admin Email
    await emailjs.send(
      "service_2zlcyyh",
      "template_mp4680a",
      templateParams,
      "RsbiBTG_6OObbm0vc"
    );

    try {
      await emailjs.send(
        "service_2zlcyyh",
        "template_5b1w6h8",
        templateParams,
        "RsbiBTG_6OObbm0vc"
      );
    } catch (autoReplyError) {
      console.error("Auto reply failed:", autoReplyError);
    }

    alert("Message sent successfully!");
    setFormData({ name: "", email: "", service: "", message: "" });

  } catch (adminError) {
    console.error("Admin email failed:", adminError);
    alert("Failed to send message. Please check EmailJS settings.");
  }

  setIsSubmitting(false);
};

  const contactInfo = [

    {
      icon: Mail,
      label: "Email Us",
      value: "info@unboundsolutions.in",
      href: "mailto:your@email.com",
    },

    {
      icon: Phone,
      label: "Call Us",
      value: "+91 9700030333",
      href: "tel:+919700030333",
    },

    {
      icon: MapPin,
      label: "Location",
      value: "Ahmedabad, Gujarat",
      href: null,
    },

  ];

  return (

    <section
      id="contact"
      className="py-24 relative bg-muted/30 overflow-hidden"
    >

      {/* Background Pattern */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(47,191,158,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(47,191,158,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-6 relative">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT CONTENT */}

          <div>

            <span className="section-badge mb-4">
              Contact Us
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Get Free{" "}
              <span className="gradient-text">
                Consultation
              </span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-10">

              Ready to grow your business?

              We provide Web Development, WordPress, Shopify,
              UI/UX Design, SEO, Digital Marketing,
              Cyber Security, WhatsApp Automation,
              and Professional Training.

            </p>


            {/* CONTACT INFO */}

            <div className="space-y-6">

              {contactInfo.map((item) => (

                <div
                  key={item.label}
                  className="flex items-center gap-4 group"
                >

                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">

                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />

                  </div>

                  <div>

                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>

                    {item.href ? (

                      <a
                        href={item.href}
                        className="font-medium hover:text-primary"
                      >
                        {item.value}
                      </a>

                    ) : (

                      <span className="font-medium">
                        {item.value}
                      </span>

                    )}

                  </div>

                </div>

              ))}

            </div>


          </div>


          {/* RIGHT CONTENT — CONTACT FORM */}

          <div>

            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 border border-border shadow-card"
            >

              <h3 className="text-xl font-bold mb-6">
                Send Message
              </h3>


              <div className="grid sm:grid-cols-2 gap-6 mb-6">

                <div>

                  <label className="block text-sm mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="John Doe"
                  />

                </div>


                <div>

                  <label className="block text-sm mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="john@email.com"
                  />

                </div>

              </div>


              <div className="mb-6">

                <label className="block text-sm mb-2">
                  Service Interested In
                </label>

                <select
                  required
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      service: e.target.value,
                    })
                  }
                  className="input-field"
                >

                  <option value="">
                    Select Service
                  </option>

                  <option>
                    Web Development
                  </option>

                  <option>
                    WordPress Development
                  </option>

                  <option>
                    Shopify Development
                  </option>

                  <option>
                    UI/UX Design
                  </option>

                  <option>
                    SEO
                  </option>

                  <option>
                    Digital Marketing
                  </option>

                  <option>
                    Cyber Security
                  </option>

                  <option>
                    WhatsApp Automation
                  </option>

                  <option>
                    Professional Training
                  </option>

                </select>

              </div>


              <div className="mb-6">

                <label className="block text-sm mb-2">
                  Message
                </label>

                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="input-field resize-none"
                  placeholder="Tell us about your project..."
                />

              </div>


              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
              >

                {isSubmitting ? "Sending..." : "Send Message"}

                <Send className="w-5 h-5" />

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>

  );

};

export default ContactSection;