import { useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaCopy,
} from "react-icons/fa";

/* ---------- Typing & Viewport Helpers (Matched to TechStack) ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const useRepeatingInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [inViewKey, setInViewKey] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewKey((prev) => prev + 1);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inViewKey];
};

const useTyping = (
  total,
  { speed = 90, delay = 0, triggerKey = 1 } = {}
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(total);
      return;
    }

    setCount(0);
    let interval;

    const start = setTimeout(() => {
      let current = 0;
      interval = setInterval(() => {
        current += 1;
        setCount(current);

        if (current >= total) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [triggerKey, total, speed, delay]);

  return count;
};

/* ---------- Constants & 3D Heading Shadow ---------- */

const HEADING = "Contact";

const HEADING_SHADOW = [
  "1px 1px 0 #b65b82",
  "2px 2px 0 #a44870",
  "3px 3px 0 #91365f",
  "4px 4px 0 #762747",
  "5px 5px 0 #5e1c38",
  "6px 6px 0 #421329",
  "8px 10px 15px rgba(0,0,0,0.6)",
  "0 0 20px rgba(217,152,182,0.35)",
].join(", ");

const Cursor = ({ className = "ml-2 h-[0.9em] w-[3px]" }) => (
  <span
    aria-hidden="true"
    className={`inline-block animate-pulse bg-[#d98cb3] align-middle motion-reduce:animate-none ${className}`}
  />
);

/* ---------- Contact Details ---------- */

const EMAIL = "afraarshaddev@gmail.com";

const socialLinks = [
  {
    name: "GitHub",
    handle: "@afra-arshad",
    href: "https://github.com/afra-arshad",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    handle: "Afra Arshad",
    href: "https://www.linkedin.com/",
    icon: <FaLinkedinIn />,
  },
];

export default function Contact() {
  const [headRef, headInViewKey] = useRepeatingInView(0.5);
  const headCount = useTyping(HEADING.length, {
    speed: 90,
    triggerKey: headInViewKey,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "sent"
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("sending");

    // Opens user's default mail client pre-filled, or replace with EmailJS / Formspree API
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 500);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-full bg-gradient-to-r from-[#1e0e13] via-[#1c0c11] to-[#150c0f] px-6 py-16 text-[#f1e4ea]"
    >
      {/* 3D Animated Centered Heading (Exact match to TechStack) */}
      <div
        ref={headRef}
        className="mb-12 flex items-center justify-center sm:mb-16"
      >
        <h2
          id="contact-heading"
          aria-label={HEADING}
          className="inline-block min-h-[1.5em] select-none font-mono text-4xl font-black uppercase tracking-[0.15em] text-[#f2c4d8] sm:text-5xl lg:text-6xl"
          style={{
            textShadow: HEADING_SHADOW,
          }}
        >
          <span className="sr-only">{HEADING}</span>
          <span aria-hidden="true">{HEADING.slice(0, headCount)}</span>
          {headCount < HEADING.length && <Cursor />}
        </h2>
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-5xl text-center">
        <h3 className="mb-3 text-3xl md:text-4xl">
          Let's build something{" "}
          <span className="text-[#a8416f]">together</span>
        </h3>
        <p className="mb-12 text-[#a08a93]">
          Have a project idea, front-end role, or collaboration in mind? Feel free to reach out.
        </p>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-5">
        {/* Left Column: Direct Contact Info & Socials */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#8e2f5e]/25 bg-[#200e15]/50 p-6 shadow-xl md:col-span-2">
          <div>
            <h3
              className="mb-4 font-mono text-2xl font-bold uppercase tracking-[0.12em] text-[#f2c4d8]"
              style={{ textShadow: "1px 1px 0 #91365f, 2px 2px 0 #5e1c38" }}
            >
              Get In Touch
            </h3>

            <p className="mb-6 text-sm leading-relaxed text-[#a08a93]">
              I'm currently open to front-end developer opportunities, freelance projects, and creative web collaborations.
            </p>

            {/* Email Card with One-Click Copy */}
            <div className="mb-4 rounded-xl border border-[#8e2f5e]/35 bg-[#190a10]/80 p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d98cb3]">
                  <FaEnvelope /> Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1 rounded-md border border-[#8e2f5e]/50 bg-[#8e2f5e]/20 px-2 py-1 font-mono text-xs text-[#f2c4d8] transition-colors hover:border-[#d98cb3] hover:bg-[#8e2f5e]/40 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all text-sm font-medium text-[#f1e4ea] transition-colors hover:text-[#d98cb3]"
              >
                {EMAIL}
              </a>
            </div>

            {/* Location Card */}
            <div className="mb-6 rounded-xl border border-[#8e2f5e]/35 bg-[#190a10]/80 p-4">
              <span className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d98cb3]">
                <FaMapMarkerAlt /> Location
              </span>
              <p className="text-sm font-medium text-[#f1e4ea]">
                Sargodha, Punjab, Pakistan
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[#a08a93]">
              Connect Online
            </p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-[#8e2f5e]/40 bg-[#8e2f5e]/15 px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d98cb3] hover:bg-[#8e2f5e]/35"
                >
                  <span className="flex items-center gap-3 font-mono font-semibold text-[#f2c4d8]">
                    <span className="text-lg text-[#d98cb3] transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </span>
                    {social.name}
                  </span>
                  <span className="font-mono text-xs text-[#a08a93] group-hover:text-[#f1e4ea]">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#8e2f5e]/25 bg-[#200e15]/50 p-6 sm:p-8 shadow-xl md:col-span-3"
        >
          <h3
            className="mb-6 font-mono text-2xl font-bold uppercase tracking-[0.12em] text-[#f2c4d8]"
            style={{ textShadow: "1px 1px 0 #91365f, 2px 2px 0 #5e1c38" }}
          >
            Send a Message
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#d98cb3]"
              >
                Your Name *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-[#8e2f5e]/40 bg-[#17090e] px-4 py-3 text-sm text-[#f1e4ea] placeholder-[#6e5660] outline-none transition-all duration-300 focus:border-[#d98cb3] focus:ring-2 focus:ring-[#a8416f]/30"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#d98cb3]"
              >
                Your Email *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-[#8e2f5e]/40 bg-[#17090e] px-4 py-3 text-sm text-[#f1e4ea] placeholder-[#6e5660] outline-none transition-all duration-300 focus:border-[#d98cb3] focus:ring-2 focus:ring-[#a8416f]/30"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-subject"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#d98cb3]"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Frontend Project / Collaboration"
              className="w-full rounded-xl border border-[#8e2f5e]/40 bg-[#17090e] px-4 py-3 text-sm text-[#f1e4ea] placeholder-[#6e5660] outline-none transition-all duration-300 focus:border-[#d98cb3] focus:ring-2 focus:ring-[#a8416f]/30"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#d98cb3]"
            >
              Message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or idea..."
              className="w-full resize-none rounded-xl border border-[#8e2f5e]/40 bg-[#17090e] px-4 py-3 text-sm text-[#f1e4ea] placeholder-[#6e5660] outline-none transition-all duration-300 focus:border-[#d98cb3] focus:ring-2 focus:ring-[#a8416f]/30"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#8e2f5e] bg-gradient-to-r from-[#8e2f5e] to-[#a8416f] px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#a8416f]/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d98cb3] hover:brightness-110 disabled:opacity-60 cursor-pointer"
          >
            {status === "sent" ? (
              <>
                <FaCheck /> Message Prepared!
              </>
            ) : status === "sending" ? (
              "Opening Mail..."
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}