'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8, 9, 13, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              }}
            >
              <Code2 size={18} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#f1f5f9', letterSpacing: '-0.3px' }}>
              Arilla<span style={{ color: '#8b5cf6' }}>soft</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: pathname === link.href ? '#a78bfa' : '#94a3b8',
                  background: pathname === link.href ? 'rgba(124,58,237,0.1)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/teklif-al"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 20px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white',
                background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                transition: 'all 0.2s',
              }}
            >
              Teklif Al <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '8px',
              color: '#f1f5f9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Menüyü aç/kapat"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            background: 'rgba(8, 9, 13, 0.98)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
          }}
          className="lg:hidden"
        >
          <nav style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: pathname === link.href ? '#a78bfa' : '#94a3b8',
                  background: pathname === link.href ? 'rgba(124,58,237,0.08)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/teklif-al"
              style={{
                marginTop: '8px',
                padding: '11px 20px',
                borderRadius: '10px',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                color: 'white',
                background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              }}
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
