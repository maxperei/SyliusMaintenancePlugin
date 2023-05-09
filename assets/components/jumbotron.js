import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Box} from "@chakra-ui/react";
import Wavy from "./wavy";

const Jumbotron = ({txt}) => {
    const [replay, setReplay] = useState(true);

    return <div>
        <Box
            bgGradient={'radial(gray.300, yellow.400, pink.200)'}
            w={'100%'}
            h={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box
                fontFamily={'system-ui'}
                bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                bgClip={'text'}
                fontSize={'6xl'}
                fontWeight={'extrabold'}
            >
                <Wavy
                    text={txt}
                    delay={0}
                    duration={0.05}
                    setReplay={setReplay}
                    replay={replay}
                />
            </Box>
        </Box>
    </div>
}

Jumbotron.propTypes = {
    txt: PropTypes.string,
}

export default Jumbotron;