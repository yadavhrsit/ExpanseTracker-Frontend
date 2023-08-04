import { motion, useMotionValue, useTransform } from "framer-motion";

export function Success() {

    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

    return (
        <motion.div
            style={{
                width: 'min-parent',
                height: 'min-parent',
                borderRadius: 30,
                backgroundColor: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            animate={{
                scale: 1,
                backgroundColor: "rgba(255, 255, 255, 1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}

        >
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">
                <motion.path
                    d="M38 74.707l24.647 24.646L116.5 45.5"
                    fill="transparent"
                    strokeWidth="20"
                    stroke="#39e"
                    strokeLinecap="round"
                    animate={{ pathLength: 0.9 }}
                    style={{ pathLength: pathLength, opacity: opacity }}
                />
            </svg>
        </motion.div>
    );
}
