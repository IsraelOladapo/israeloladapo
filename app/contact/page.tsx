"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import { Mail, MapPin, Send, User, MessageSquare } from "lucide-react";
import ContactDm from "./sections/ContactDm";
import InputField from "./sections/InputField";
import Social from "./sections/Social";
import { CONTACT, whatsappUrl } from "@/lib/utils";
import LinkedInGitHub from "./sections/LinkedlnGitHub";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current?.reset();
        },
        (error) => {
          console.error(error.text);
          toast.error("Failed to send message. Try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 bg-background text-txt overflow-hidden">
      <Toaster position="top-center" />

      {/* 🌈 Subtle floating glow background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full top-10 left-10"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-secondary/20 blur-[100px] rounded-full bottom-10 right-10"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-txt">Get in Touch</h2>
        <p className="text-text-muted mt-2">
          Have a project or collaboration in mind? Drop a message below.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl px-6">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <ContactDm
            href={`mailto:${CONTACT.email}`}
            label="Email"
            contact={CONTACT.email}
            icon={<Mail className="text-primary w-6 h-6" />}
          />
          <ContactDm
            href={whatsappUrl(CONTACT.whatsappNumber)}
            label="WhatsApp"
            contact={CONTACT.whatsappNumber}
            icon={<MessageSquare className="text-green-600 w-6 h-6" />}
          />

          <div className="flex items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <MapPin className="text-secondary w-6 h-6" />
            <div>
              <h4 className="font-semibold text-txt">Location</h4>
              <p className="text-text-muted">{CONTACT.location}</p>
            </div>
          </div>

          {/* LinkedIn and GitHub */}
          <LinkedInGitHub />
        </motion.div>

        {/* Contact Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-surface p-8 rounded-2xl border border-border shadow-sm space-y-5"
        >
          <InputField
            label="Name"
            name="user_name"
            type="text"
            icon={<User />}
          />

          <InputField
            label="Email"
            name="user_email"
            type="text"
            icon={<Mail />}
          />

          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/40 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4" />
          </button>

          {/* 💬 Social Links */}
          <Social />
        </motion.form>
      </div>
    </section>
  );
}
