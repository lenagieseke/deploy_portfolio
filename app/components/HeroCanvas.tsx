const HeroCanvas = ({ children }: { children: React.ReactNode }) => {
    return (
    // Create a full-width box that keeps a 16 : 9 shape, 
    // hides anything spilling outside it, 
    // and lets children be absolutely positioned relative to it.
    // px-4 sm:px-8 lg:px-16

    <section className="relative 
        w-full h-[50vh]
        overflow-hidden">
        {children}
    </section>
    );
}

export default HeroCanvas;