import Vita from '@/app/(routes)/about/content/vita.mdx'
import AccordionAbout from './AccordionAbout';

const SectionTextDropdown = () => {
  return (
    <>

    <section className="relative w-full text-left">

            {/* prose and prose-neutral come from Tailwind’s typography plugin. It’s a preset stylesheet that gives markdown-like HTML elements (headings, lists, paragraphs, blockquotes, code blocks) a sensible typographic baseline. Without it, Tailwind v4 makes everything extremely “neutral”: lists have no bullets, headings have no spacing, and everything collapses into plain text.
            <article className="prose prose-neutral max-w-none">
            {/* <article className="vita-prose"> // eventually with global styles 
                <Vita />
            </article> */}
            
        <AccordionAbout />
    </section>

    </>
  );
};

export default SectionTextDropdown;
