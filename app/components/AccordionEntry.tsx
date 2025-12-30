"use client";

import { ReactNode } from "react";

type AccordionEntryProps = {
    title: string;
    index: number;
    openIndex: number | null;
    onToggle: (index: number) => void;
    children: ReactNode;
};

const AccordionEntry = ({
    title,
    index,
    openIndex,
    onToggle,
    children
}: AccordionEntryProps) => {
    const isOpen = openIndex === index;

    return (
    <div className="border-b border-gray-300">
    <button
    onClick={() => onToggle(index)}
    className={
        "w-full flex justify-between items-center py-3 px-4 transition-colors " +
        (isOpen
        ? "bg-gray-100 font-medium rounded-t-sm border-b border-gray-300"
        : "bg-transparent hover:bg-gray-50 rounded-sm")
    }
    >
    <span>{title}</span>
    <span className="text-2xl leading-none">{isOpen ? "−" : "+"}</span>
    </button>

        {isOpen && (
            /* prose and prose-neutral come from Tailwind’s typography plugin. It’s a preset stylesheet that gives markdown-like HTML elements (headings, lists, paragraphs, blockquotes, code blocks) a sensible typographic baseline. Without it, Tailwind v4 makes everything extremely “neutral”: lists have no bullets, headings have no spacing, and everything collapses into plain text.*/
            <article className="
                about-table [&_tr:last-child]:border-b [&_tr]:border-gray-300
                prose prose-neutral max-w-none py-3 px-4 bg-gray-50 rounded-b-lg
                prose-p:text-sm
                prose-p:leading-snug
                prose-p:max-w-none
                prose-li:text-sm
                prose-li:leading-snug
                prose-h2:text-base
                prose-h3:text-base
                prose-h2:mt-10
                prose-h3:mt-8
                prose-h4:mt-6
                hyphens: auto
                pb-12
            ">
            {children}
            </article>
            
        )}
    </div>
    );
};

export default AccordionEntry;