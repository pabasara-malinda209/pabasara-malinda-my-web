import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { sendContact } from "@/lib/api";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

const EMPTY = { name: "", email: "", message: "" };
const field =
  "w-full border-b border-white/15 bg-transparent py-4 text-lg text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-[var(--cyan)]";

export const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendContact(form);
      toast.success("Message sent. I'll get back to you soon.");
      setForm(EMPTY);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(Array.isArray(detail) ? "Please check your details and try again." : "Couldn't send right now. Try again shortly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="px-5 py-28 sm:px-10 lg:px-16 lg:py-40" data-testid="contact-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" label="Contact" title={<>Let's build something<br /><span className="text-gradient">that moves.</span></>} />
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">Have a project, a wild idea or just want to say hi? Drop a note and I'll reply within a couple of days.</p>
            <a href={`mailto:${PROFILE.email}`} className="mt-8 inline-flex items-center gap-2 font-display text-2xl font-bold transition-colors hover:text-[var(--cyan)] sm:text-3xl" data-testid="contact-email-link">
              {PROFILE.email} <ArrowUpRight size={22} />
            </a>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <form onSubmit={submit} className="space-y-6" data-testid="contact-form">
              <div className="grid gap-6 sm:grid-cols-2">
                <input required value={form.name} onChange={set("name")} placeholder="Your name" className={field} data-testid="contact-name-input" />
                <input required type="email" value={form.email} onChange={set("email")} placeholder="Email address" className={field} data-testid="contact-email-input" />
              </div>
              <textarea required minLength={5} rows={4} value={form.message} onChange={set("message")} placeholder="Tell me about your project" className={`${field} resize-none`} data-testid="contact-message-input" />
              <button
                type="submit"
                disabled={sending}
                className="group mt-4 inline-flex items-center gap-3 rounded-full bg-[var(--cyan)] px-8 py-4 font-semibold text-black transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
                data-testid="contact-submit-btn"
              >
                {sending ? <Loader2 size={18} className="animate-spin" /> : null}
                {sending ? "Sending" : "Send message"}
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
