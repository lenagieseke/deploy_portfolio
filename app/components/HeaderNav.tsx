"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HeaderNav = () => {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu on Escape
    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    // Close menu on outside click
    useEffect(() => {
        if (!open) return;

        const onClick = (e: MouseEvent) => {
        const t = e.target as Node;
        if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
        setOpen(false);
        };

        document.addEventListener("click", onClick, { passive: true });
        return () => document.removeEventListener("click", onClick);
    }, [open]);

    return (
        <div className="flex items-center gap-4">

        {/* Desktop nav (inline links) */}
        <nav className="main-nav" aria-label="Main">
            <Link href="/" className="main-nav-link">
            HOME
            </Link>
            {/* <Link href="/projects" className="main-nav-link">
            Projects
            </Link> */}
            <Link href="/about" className="main-nav-link">
            ABOUT
            </Link>
            <Link href="/contact" className="main-nav-link">
            CONTACT
            </Link>
        </nav>

        {/* Mobile menu (button + dropdown) */}
        <div className="relative md:hidden">
            <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen(prev => !prev)}
            className="btn btn-mobile"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="main-menu"
            >
            Menu
            <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            >
                <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
                />
            </svg>
            </button>

            {open && (
            <div
                ref={menuRef}
                id="main-menu"
                className="menu-panel"
            >
                <nav aria-label="Main">
                <ul className="menu-panel-list">
                    <li>
                    <Link
                        href="/"
                        className="menu-panel-link"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    </li>
                    {/* <li>
                    <Link
                        href="/projects"
                        className="menu-panel-link"
                        onClick={() => setOpen(false)}
                    >
                        Projects
                    </Link>
                    </li> */}
                    <li>
                    <Link
                        href="/about"
                        className="menu-panel-link"
                        onClick={() => setOpen(false)}
                    >
                        About
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/contact"
                        className="menu-panel-link"
                        onClick={() => setOpen(false)}
                    >
                        Contact
                    </Link>
                    </li>
                </ul>
                </nav>
            </div>
            )}
        </div>
        </div>
    );
};

export default HeaderNav;