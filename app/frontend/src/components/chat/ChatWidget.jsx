import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";

const GREETING = {
  role: "assistant",
  content:
    "Hi! I am Pabasara's AI assistant. Ask me about his skills, his projects, or how to get in touch.",
};

const SUGGESTIONS = [
  "What does Pabasara build?",
  "Which skills does he have?",
  "How can I contact him?",
];

const FALLBACK_ERROR =
  "I cannot reach the assistant right now. Please email pabasaramalinda2@icloud.com instead.";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current && inputRef.current.focus();
  }, [open]);

  const send = async (raw) => {
    const text = (raw === undefined ? input : raw).trim();
    if (!text || busy) return;

    const next = messages.concat([{ role: "user", content: text }]);
    setMessages(next);
    setInput("");
    setBusy(true);

    let answer = FALLBACK_ERROR;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING).slice(-10) }),
      });
      const data = await res.json().catch(() => ({}));
      answer = (res.ok ? data.reply : data.error) || FALLBACK_ERROR;
    } catch {
      answer = FALLBACK_ERROR;
    }

    setMessages((prev) => prev.concat([{ role: "assistant", content: answer }]));
    setBusy(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open AI chat"}
        data-testid="chat-toggle"
        className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full border border-[var(--cyan)]/40 bg-[#07090e]/90 text-[var(--cyan)] shadow-xl backdrop-blur-xl transition-transform duration-300 hover:scale-105"
      >
        {open ? <X size={20} /> : <Bot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-testid="chat-panel"
            className="fixed bottom-24 right-5 z-[90] flex h-[26rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#07090e]/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--cyan)]/40 text-[var(--cyan)]">
                <Bot size={16} />
              </span>
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--cyan)]">
                  AI Assistant
                </p>
                <p className="text-xs text-zinc-400">Ask about Pabasara</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--cyan)]/15 px-3 py-2 text-sm text-zinc-100"
                      : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.05] px-3 py-2 text-sm text-zinc-300"
                  }
                >
                  {m.content}
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-[var(--cyan)]/50 hover:text-[var(--cyan)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {busy && (
                <p className="mr-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <Sparkles size={12} className="animate-pulse" /> thinking
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-[var(--cyan)]/50"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--cyan)] text-black transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
