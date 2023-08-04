import { motion } from "framer-motion";
import React from "react";

const LoadingDot = {
    display: "block",
    width: "1rem",
    height: "1rem",
    backgroundColor: '#ffff',
    borderRadius: "50%"
};

const LoadingContainer = {
    width: 'min-parent',
    height: 'min-parent',
    display: "flex",
    justifyContent: "space-evenly",
    position: 'absolute',
    alignItems: 'center'
};

const ContainerVariants = {
    initial: {
        transition: {
            staggerChildren: 0.2
        }
    },
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const DotVariants = {
    initial: {
        y: "0%"
    },
    animate: {
        y: "100%"
    }
};

const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
};

export default function Loading() {
    return (
        <div
            style={{
                width: "300px",
                height: '300px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <motion.div
                style={LoadingContainer}
                variants={ContainerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.span
                    style={LoadingDot}
                    variants={DotVariants}
                    transition={DotTransition}
                />
                <motion.span
                    style={LoadingDot}
                    variants={DotVariants}
                    transition={DotTransition}
                />
                <motion.span
                    style={LoadingDot}
                    variants={DotVariants}
                    transition={DotTransition}
                />
            </motion.div>
        </div>
    );
}
