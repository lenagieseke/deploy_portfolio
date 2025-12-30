// components/Header.tsx
import Link from "next/link";
import HeaderNav from "./HeaderNav";
import { GetInTouchButton } from "./ButtonSayHi";




const Header = () => {
    return (
        <header className="site-header">
            {/* Left: Site name */}
                <Link href="/" className="site-header-name">
                    Lena Gieseke
                </Link>

            {/* Right: Buttons*/}
            <div className="flex items-center gap-4">
                 <HeaderNav />

                <GetInTouchButton
                email="hello@lenagieseke.com"
                subject="Hello from the website"
                className="btn"
                >
                Say hi!
                </GetInTouchButton>
            </div>
        </header>
    );
}

export default Header;