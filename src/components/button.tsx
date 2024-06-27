import { motion } from "framer-motion";
import Image from "next/image";

interface EncryptButtonProps {
  imgSrc: string;
  hoverGradient: string;
}

const EncryptButton: React.FC<EncryptButtonProps> = ({ imgSrc, hoverGradient }) => {
  return (
    <motion.button
      whileHover={{ background: hoverGradient }}
      className="group relative overflow-hidden rounded-lg border-[1px] border-black p-2"
      style={{ width: "70px", height: "70px", margin: "8px" }} 
    >
      <div className="flex items-center justify-center w-full h-full">
        <motion.div
          whileHover={{ rotate: -360 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }} 
          className="flex items-center justify-center w-full h-full"
        >
          <Image src={imgSrc} alt='' width={24} height={24} layout="fixed" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default EncryptButton;
