import HeroCanvas from "./components/HeroCanvas";
import HeroSectionText from "./components/HeroSectionText";

import TextIntro from "./components/TextIntro";
import { ShaderCanvas } from "./components/ShaderCanvas"
import { fragmentShader } from "./components/ShaderCanvas"

const Home = () => {
    return (
        <>
        <TextIntro text='In my work, I explore the interplay of creativity, art, and technology in research and education.'/>
        
        <HeroCanvas>
            <ShaderCanvas
                fragmentShader={fragmentShader}
                className="absolute inset-0 w-full h-full"
            />
        </HeroCanvas> 

       <HeroSectionText
            title="CREATIVE TECHNOLOGIES"
            text="Creative Technologists strive to create new forms of expression and experience while combining creativity, media, and computation with social sensitivity, ethical awareness, and ecological responsibility. We develop tools, methods, and environments that make the digital age more friendly, fun and human."
        />
        </>

    );
}

export default Home;