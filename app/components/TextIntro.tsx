const TextIntro = ({ text }: { text: string }) => {
    return (

            <div className="content-center">
                <p className="intro">
                    {text}
                </p>
            </div>

    );
}

export default TextIntro;