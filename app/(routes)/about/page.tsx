import AccordionAbout from "@/app/components/AccordionAbout";
import HeroSectionTextImage from "@/app/components/HeroSectionTextImage";

const About = () => {
    return (
    <>
        <HeroSectionTextImage
            title="Lena Gieseke"
            text="My background is in research, industry practice, and artistic work in computer graphics, with a focus on generative methods such as procedural algorithms, materials and shading, and their creative controllability. Generative AI has naturally joined this focus in recent years. In times of automation, I like to think about how technology can also support humans in analogous spaces, e.g., in a performative context, connect us and improve our experiences in the world. I am also working on how to safeguard European values of democracy, cultural diversity, and fairness across systems, algorithms, and contemporary media production. Additionally, as part of the Film University, I investigate computational filmmaking, technical direction and emerging production technologies. My guiding principle is a commitment to technology that inspires and expands human agency without letting the technical machinery and its human masters further mutate into an overpowering hydra."
            imgFile="/img/about/gieseke.jpg"
            alt="Portrait of Lena Gieseke"
        />
        <AccordionAbout />
    </>
    );
}

export default About;