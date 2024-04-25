import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FiArrowRight } from "react-icons/fi";
import {
    useMotionTemplate,
    motion,
    MotionValue,
} from "framer-motion";

const Home = ({color}: {color: MotionValue<string>}) => {

    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
    
    return (
        <div className="relative grid min-h-screen place-content-center px-4 py-24 text-gray-200 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
                    Accessing Digital Goods with NFT Licenses
                </h1>
                <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
                    Join a decentralized platform where creators mint NFT licenses, enabling users to easily access and utilize digital products or services.
                </p>
                <motion.button
                    style={{
                        border,
                        boxShadow,
                    }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    whileTap={{
                        scale: 0.985,
                    }}
                    className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                >
                    Register now
                    <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Stars radius={50} count={2500} factor={4} fade speed={2} />
                </Canvas>
            </div>
        </div>
    );
};

export default Home;