import HeroTitle from "./HeroTitle";
import TextBox from "./TextBox";

type HeroSectionTextProps = {
    title: string;
    text: string;
};

const HeroSectionText = ({ title, text }: HeroSectionTextProps) => {
    return (

    <section className="relative w-full">
        <HeroTitle text={title} />
        <TextBox text={text} />
    </section>
    );
}

export default HeroSectionText;
