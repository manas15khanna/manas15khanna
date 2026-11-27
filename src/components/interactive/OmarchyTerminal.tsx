import React, { useEffect, useRef, useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CORE_STACK, PROFILE_IDENTITY, PROJECTS, SWITCHBOARD_ROLES } from '../../data/portfolioData';
import { soundEngine } from '../../audio/soundEngine';

interface OmarchyTerminalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSwitchPort: (portId: number) => void;
  onLaunchGame: () => void;
  onTriggerDexter: () => void;
}

interface TermLine {
  id: number;
  type: 'cmd' | 'out' | 'accent' | 'error';
  text: string;
}

const NEOFETCH_ART = [
  '       /\\         manas@omarchy-thinkbook',
  '      /  \\        -----------------------',
  '     /\\   \\       OS: Omarchy (Arch Linux x86_64)',
  '    /      \\      WM: Hyprland (Wayland)',
  '   /   ,,   \\     Host: ThinkBook 14 G7 (Ryzen 7 7735HS)',
  '  /   |  |  -\\    Kernel: Linux 6.11-zen',
  ' /_-""    ""-_\\   Shell: zsh // Terminal-first workflow',
  '                  Editor: Neovim / Obsidian'
];

export const OmarchyTerminal: React.FC<OmarchyTerminalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSwitchPort,
  onLaunchGame,
  onTriggerDexter
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TermLine[]>([
    { id: 1, type: 'accent', text: 'Omarchy Linux (Arch + Hyprland) // zsh session initialized.' },
    { id: 2, type: 'out', text: "Type 'help' for available commands, or 'neofetch'." }
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const appendLines = (lines: Omit<TermLine, 'id'>[]) => {
    const base = Date.now();
    setHistory((prev) => [
      ...prev,
      ...lines.map((l, idx) => ({ ...l, id: base + idx + Math.random() }))
    ]);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    soundEngine.playHoverTick();
    appendLines([{ type: 'cmd', text: `manas@omarchy-thinkbook ❯ ${cmd}` }]);

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    if (lower === 'help') {
      appendLines([
        { type: 'accent', text: 'AVAILABLE COMMANDS:' },
        { type: 'out', text: '  neofetch / fastfetch   Display Omarchy + ThinkBook specs' },
        { type: 'out', text: '  whoami                 Bio, education & location' },
        { type: 'out', text: '  projects               Featured engineering projects' },
        { type: 'out', text: '  skills                 Languages, AI/RAG & Linux stack' },
        { type: 'out', text: '  socials                GitHub, LinkedIn & email' },
        { type: 'out', text: '  switch <1-5>           Patch Ubiquiti Switchboard port' },
        { type: 'out', text: '  game                   Launch Packet Parry mini-game' },
        { type: 'out', text: '  clear                  Clear terminal buffer' }
      ]);
      return;
    }

    if (lower === 'neofetch' || lower === 'fastfetch') {
      appendLines(NEOFETCH_ART.map((line) => ({ type: 'accent', text: line })));
      return;
    }

    if (lower === 'whoami') {
      appendLines([
        { type: 'accent', text: `${PROFILE_IDENTITY.name} — ${PROFILE_IDENTITY.headline}` },
        { type: 'out', text: `Location: ${PROFILE_IDENTITY.location}` },
        {
          type: 'out',
          text: 'Education: B.Tech CSE (Cloud Computing), Amity University Punjab (2023–2027)'
        },
        { type: 'out', text: 'Leadership: President, Technometer Club' }
      ]);
      return;
    }

    if (lower === 'projects') {
      appendLines(
        PROJECTS.map((p) => ({
          type: 'out' as const,
          text: `• ${p.title} — ${p.subtitle} [${p.tags.slice(0, 4).join(', ')}]`
        }))
      );
      return;
    }

    if (lower === 'skills') {
      appendLines([
        { type: 'accent', text: `Languages: ${CORE_STACK.languages.join(', ')}` },
        { type: 'out', text: `AI & Backend: ${CORE_STACK.aiAndBackend.join(', ')}` },
        { type: 'out', text: `Systems & Sec: ${CORE_STACK.systemsAndSecurity.join(', ')}` }
      ]);
      return;
    }

    if (lower === 'socials') {
      appendLines([
        { type: 'out', text: `Email:    ${PROFILE_IDENTITY.email}` },
        { type: 'out', text: `GitHub:   ${PROFILE_IDENTITY.github}` },
        { type: 'out', text: `LinkedIn: ${PROFILE_IDENTITY.linkedin}` }
      ]);
      return;
    }

    if (lower.startsWith('switch ')) {
      const num = parseInt(lower.replace('switch ', '').trim(), 10);
      const role = SWITCHBOARD_ROLES.find((r) => r.id === num);
      if (role) {
        onSwitchPort(num);
        soundEngine.playRj45Snap();
        appendLines([
          { type: 'accent', text: `Patched Cable 0${num} -> ${role.roleTitle} (${role.color})` }
        ]);
      } else {
        appendLines([{ type: 'error', text: 'Usage: switch <1-5>' }]);
      }
      return;
    }

    if (lower === 'game') {
      appendLines([{ type: 'accent', text: 'Launching PACKET PARRY // ZERO-DAY DEFENDER...' }]);
      onClose();
      onLaunchGame();
      return;
    }

    if (lower === 'sudo rm -rf /' || lower === 'sudo rm -rf /*') {
      onTriggerDexter();
      appendLines([
        {
          type: 'error',
          text: 'Nice try. HexaWipe already sanitized that sector. Permission denied.'
        }
      ]);
      return;
    }

    appendLines([
      { type: 'error', text: `zsh: command not found: ${cmd}. Try 'help'.` }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput('');
  };

  return (
    <>
      {/* Persistent Hyprland Waybar Pill docked bottom-left */}
      <div className="fixed bottom-4 left-4 z-50 hidden items-center gap-2 rounded-full border border-white/15 bg-[#0C0E13]/85 px-3 py-1.5 font-mono text-[11px] shadow-titanium backdrop-blur-xl sm:flex">
        <span className="flex items-center gap-1.5 font-bold text-[var(--accent-active)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-active)]" />
          omarchy
        </span>
        <span className="text-white/15">|</span>
        <span className="text-[#949BA8]">1:dev</span>
        <span className="text-[#525866]">2:rag</span>
        <span className="text-[#525866]">3:sec</span>
        <span className="text-white/15">|</span>
        <button
          type="button"
          onClick={() => (isOpen ? onClose() : onOpen())}
          data-interactive="true"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[#F4F5F7] transition-colors hover:bg-[var(--accent-active)] hover:text-[#050608]"
        >
          <Terminal className="h-3 w-3" />
          <span>~ Terminal</span>
        </button>
      </div>

      {/* Floating Translucent Hyprland Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[92] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex h-[460px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--accent-active)]/50 bg-[#080A0F]/95 shadow-[0_0_50px_-15px_rgba(var(--accent-rgb),0.45)] backdrop-blur-xl"
            >
              {/* Hyprland Window Titlebar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#0D1017] px-4 py-2.5 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#949BA8]">
                  <Terminal className="h-3.5 w-3.5 text-[var(--accent-active)]" />
                  <span>manas@omarchy-thinkbook: ~ (zsh)</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1 text-[#949BA8] hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Output Buffer */}
              <div
                ref={scrollRef}
                onClick={() => inputRef.current?.focus()}
                className="flex-1 space-y-1.5 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
              >
                {history.map((line) => (
                  <pre
                    key={line.id}
                    className={`whitespace-pre-wrap font-mono ${
                      line.type === 'cmd'
                        ? 'text-[#F4F5F7]'
                        : line.type === 'accent'
                          ? 'text-[var(--accent-active)]'
                          : line.type === 'error'
                            ? 'text-[#FF2A5F]'
                            : 'text-[#949BA8]'
                    }`}
                  >
                    {line.text}
                  </pre>
                ))}
              </div>

              {/* Quick Command Pills */}
              <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] bg-[#0B0D13] px-4 py-2">
                {['neofetch', 'whoami', 'projects', 'skills', 'switch 3', 'sudo rm -rf /'].map(
                  (quick) => (
                    <button
                      key={quick}
                      type="button"
                      onClick={() => runCommand(quick)}
                      className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#949BA8] hover:border-[var(--accent-active)] hover:text-white"
                    >
                      {quick}
                    </button>
                  )
                )}
              </div>

              {/* Input Prompt */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-white/10 bg-[#07090D] px-4 py-3 font-mono text-xs"
              >
                <span className="shrink-0 text-[var(--accent-active)]">
                  manas@omarchy ❯
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command (try 'help')..."
                  className="w-full bg-transparent text-[#F4F5F7] placeholder-[#525866] focus:outline-none"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
