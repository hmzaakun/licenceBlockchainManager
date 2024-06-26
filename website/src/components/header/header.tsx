import { useState } from "react";
import { Link } from "react-router-dom";
import Connect from "../connexion/connectButton";
import { useConnectedWallets } from "thirdweb/react";
import BuyWithMoonpay from "../connexion/buyCrypto";

const Header = () => {
    const wallets = useConnectedWallets();
    const [showModal, setShowModal] = useState(false);

    return (
        <header className="absolute z-40 w-full">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link to={"/"} className="text-gray-500 transition hover:text-gray-500/75"> Home </Link>
                            </li>
                            <li>
                                <Link to={"/Licences"} className="text-gray-500 transition hover:text-gray-500/75"> Licences </Link>
                            </li>
                            <li>
                                <Link to={"/Profile"} className="text-gray-500 transition hover:text-gray-500/75"> My licences </Link>
                            </li>
                            <li>
                                <Link to={"/Create"} className="text-gray-500 transition hover:text-gray-500/75"> Create </Link>
                            </li>
                            <li>
                                <Link to={"/Proxy"} className="text-gray-500 transition hover:text-gray-500/75"> Proxy </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-2 items-center">
                            <Connect />
                            {wallets.length > 0 && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="block rounded-md bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-950 transition"
                                >
                                    Buy crypto
                                </button>
                            )}
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <BuyWithMoonpay visible={showModal} />
        </header>
    );
}

export default Header;