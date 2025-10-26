'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const COLORS = [];

const MENU_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'About Me', url: '/#about-me' },
  { name: 'Experience', url: '/#my-experience' },
  { name: 'Projects', url: '/#selected-projects' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Toggle button */}
      <div className="sticky top-0 z-[4]">
        <button
          className="group size-12 absolute top-5 right-5 md:right-10 z-[2]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={cn(
              'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px]',
              {
                'rotate-45 -translate-y-1/2': isMenuOpen,
                'md:group-hover:rotate-12': !isMenuOpen,
              },
            )}
          ></span>
          <span
            className={cn(
              'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px]',
              {
                '-rotate-45 -translate-y-1/2': isMenuOpen,
                'md:group-hover:-rotate-12': !isMenuOpen,
              },
            )}
          ></span>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[2] bg-black/70 transition-all duration-150',
          {
            'opacity-0 invisible pointer-events-none': !isMenuOpen,
          },
        )}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden flex flex-col justify-between py-10 px-10',
          { 'translate-x-0': isMenuOpen },
        )}
      >
        {/* Background Animation */}
        <div
          className={cn(
            'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-background-light duration-700 delay-150 z-[-1]',
            { 'translate-x-0': isMenuOpen },
          )}
        ></div>

        {/* Top Section: Menu + Social */}
        <div className="space-y-12 text-left">
          {/* MENU */}
          <div>
            <p className="text-muted-foreground mb-5 md:mb-8 tracking-wide uppercase text-sm">
              Menu
            </p>
            <ul className="space-y-6">
              {MENU_LINKS.map((link, idx) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      router.push(link.url);
                      setIsMenuOpen(false);
                    }}
                    className="group text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-4 text-foreground hover:text-primary hover:translate-x-2 transition-all duration-200"
                  >
                    <span
                      className={cn(
                        'size-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all',
                        COLORS[idx],
                      )}
                    >
                      <MoveUpRight
                        size={12}
                        className="scale-0 group-hover:scale-100 transition-all"
                      />
                    </span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <p className="text-muted-foreground mb-5 md:mb-8 tracking-wide uppercase text-sm">
              Social
            </p>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg capitalize hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Contact */}
        <div className="text-left">
          <p className="text-muted-foreground mb-4 uppercase text-sm">
            Get in Touch
          </p>
          <a
            href={`mailto:${GENERAL_INFO.email}`}
            className="text-sm hover:underline"
          >
            {GENERAL_INFO.email}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

