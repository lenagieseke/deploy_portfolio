"use client";

import { useState } from "react";
import AccordionEntry from "./AccordionEntry";
import Vita, { metadata as vitaMetadata } from "@/app/(routes)/about/content/vita.mdx";
import Topics, {metadata as topicsMetadata } from "@/app/(routes)/about/content/topics.mdx";
import Grants, {metadata as grantsMetadata } from "@/app/(routes)/about/content/grants.mdx";
import Publications, {metadata as publicationsMetadata } from "@/app/(routes)/about/content/publications.mdx";
import Teaching, {metadata as teachingMetadata } from "@/app/(routes)/about/content/teaching.mdx";
import Committees, {metadata as committeesMetadata } from "@/app/(routes)/about/content/committees.mdx";
import Reviewing, {metadata as reviewingMetadata } from "@/app/(routes)/about/content/reviewing.mdx";
import Talks, {metadata as talksMetadata } from "@/app/(routes)/about/content/talks.mdx";
import University, {metadata as universityMetadata } from "@/app/(routes)/about/content/university.mdx";


const AccordionAbout = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
    <>
        <section className="relative w-full mb-6 px-3 sm:px-6 lg:px-12 text-left">


            <AccordionEntry
                title={vitaMetadata.title}
                index={0}
                openIndex={openIndex}
                onToggle={toggle}
            >
                <Vita />
            </AccordionEntry>


            <AccordionEntry
                title={topicsMetadata.title}
                index={1}
                openIndex={openIndex}
                onToggle={toggle}
            >
                <Topics />
            </AccordionEntry>


            <AccordionEntry
                title={grantsMetadata.title}
                index={2}
                openIndex={openIndex}
                onToggle={toggle}
            >
                <Grants />
            </AccordionEntry>


            <AccordionEntry
                title={publicationsMetadata.title}
                index={3}
                openIndex={openIndex}
                onToggle={toggle}
            >
                <Publications />
            </AccordionEntry>

            <AccordionEntry
                title={teachingMetadata.title}
                index={4}
                openIndex={openIndex}
                onToggle={toggle}
            >
            <Teaching />
            </AccordionEntry>

            <AccordionEntry
                title={talksMetadata.title}
                index={5}
                openIndex={openIndex}
                onToggle={toggle}
            >
            <Talks />
            </AccordionEntry>

            <AccordionEntry
                title={committeesMetadata.title}
                index={6}
                openIndex={openIndex}
                onToggle={toggle}
            >
            <Committees />
            </AccordionEntry>

            <AccordionEntry
                title={reviewingMetadata.title}
                index={7}
                openIndex={openIndex}
                onToggle={toggle}
            >
            <Reviewing />
            </AccordionEntry>

            <AccordionEntry
                title={universityMetadata.title}
                index={8}
                openIndex={openIndex}
                onToggle={toggle}
            >
            <University />
            </AccordionEntry>


        </section>
    </>
    );
};

export default AccordionAbout;