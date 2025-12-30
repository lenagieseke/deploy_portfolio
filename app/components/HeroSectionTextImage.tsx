
import HeroTitle from "./HeroTitle";
import TextImageBox, { TextImageProps } from "./TextImageBox";

type HeroSectionTextImageProps = {
  title: string;
} & TextImageProps;

const HeroSectionTextImage = ({ title, text, imgFile, alt }: HeroSectionTextImageProps) => {
    return (

    <section className="relative w-full">
        <HeroTitle text={title} />
        <TextImageBox text={text} imgFile={imgFile} alt={alt} />
    </section>
    );
}

export default HeroSectionTextImage;
