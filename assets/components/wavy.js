import React from "react";
import {motion} from "framer-motion";
import {Text} from "@chakra-ui/react";
import PropTypes from "prop-types";

const Wavy = ({text, delay, duration, setReplay, replay}) => {
    const letters = Array.from(text);

    const container = {
        visible: (i = 1) => ({
            transition: {staggerChildren: duration, delayChildren: i * delay}
        }),
    }

    const child = {
        visible: {
            y: 0,
            transition: {
                type: "spring",
            }
        },
        hidden: {
            y: 75,
            transition: {
                type: "spring",
            }
        }
    }

    return <>
        <motion.h1
            variants={container}
            initial={"hidden"}
            style={{display: "flex", overflow: "hidden"}}
            animate={replay ? "visible" : "hidden"}
            onAnimationComplete={() => {
            setReplay(!replay);
            setTimeout(() => setReplay(true), 600)
        }}>
            {letters.map((letter, index) => {
                return <motion.span key={index} variants={child}>
                    {letter === " " ?
                        "\u00A0" :
                        <Text bgClip={'text'} bgGradient={'linear(to-l, #7928CA, #FF0080)'}>{letter}</Text>
                    }
                </motion.span>
            })}
        </motion.h1>
    </>
}

Wavy.propTypes = {
    text: PropTypes.string,
    delay: PropTypes.number,
    duration: PropTypes.number,
    setReplay: PropTypes.func,
    replay: PropTypes.bool,
}

export default Wavy;