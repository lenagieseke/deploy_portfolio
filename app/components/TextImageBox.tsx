import Image from "next/image";

export type TextImageProps = {
  text: string;
  imgFile: string;
  alt: string;
};

const TextImageBox = ({ text, imgFile, alt }: TextImageProps) => {
  return (
    <section>
        
        {/* 
            md:mr-6   space between image and text (mr = margin-right)
            md:mb-4   ensures wrapped text doesn't collide under the image  
        */}
      <div className="md:float-left md:mr-12 mb-6 md:w-[300px] lg:w-[380px]">
        <Image
          src={imgFile}
          alt={alt}
          width={800}
          height={800}
          className="w-full h-auto object-cover rounded-sm"
        />
      </div>

      <p className="p-2 md:max-w-[70ch] xl:max-w-[100ch]">{text}</p>
    </section>
  );
};

export default TextImageBox;