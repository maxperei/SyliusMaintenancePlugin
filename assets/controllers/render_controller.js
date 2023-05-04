import {default as ReactRender} from 'ux-react/assets/dist/render_controller.js';
import {createElement, useState} from "react";
import {ChakraProvider, Box, Text} from '@chakra-ui/react'
import {motion} from "framer-motion";

export default class extends ReactRender {
    static values = {
        props: String,
    }

    connect() {
        const props = JSON.parse(this.propsValue);
        super._renderReactElement(createElement(
            ChakraProvider,
            null,
            createElement(
                greetings,
                props,
            )
        ));
    }
}

function greetings({fullName}) {
    const [replay, setReplay] = useState(true);

    setTimeout(() => {
        setReplay(true)
    }, 600)

    return createElement(
        'div',
        null,
        createElement(
            Box,
            {
                bgGradient: 'radial(gray.300, yellow.400, pink.200)',
                w: '100%',
                h: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            createElement(wavyText, {
                text: fullName,
                delay: 0,
                duration: 0.05,
                replay: replay,
            }),
        )
    )
}

function wavyText({text, delay, duration, replay, ...props}) {
    const letters = Array.from(text);

    const container = {
        hidden: {
            opacity: 0
        },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {staggerChildren: duration, delayChildren: i * delay}
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        }
    }

    return createElement(
        motion.h1,
        {
            variants: container,
            style: {display: "flex", overflow: "hidden"},
            initial: 'hidden',
            animate: 'visible',
            ...props
        },
        letters.map((letter, index) => {
            return createElement(motion.span,
                {key: index, variants: child},
                letter === " " ? createElement(Text, {
                    fontFamily: 'system-ui',
                    bgGradient: 'linear(to-l, #7928CA, #FF0080)',
                    bgClip: 'text',
                    fontSize: '6xl',
                    fontWeight: 'extrabold',
                }, "\u00A0") : createElement(Text, {
                    fontFamily: 'system-ui',
                    bgGradient: 'linear(to-l, #7928CA, #FF0080)',
                    bgClip: 'text',
                    fontSize: '6xl',
                    fontWeight: 'extrabold',
                }, letter)
            )
        })
    )
}