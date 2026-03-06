import { motion, type Variants } from 'framer-motion';
import { type PropsWithChildren } from 'react';

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

export default function PageTransition({ children }: PropsWithChildren) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{ minHeight: '100vh' }}
        >
            {children}
        </motion.div>
    );
}
