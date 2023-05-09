import {default as ReactRender} from 'ux-react/assets/dist/render_controller.js';
import {createElement} from "react";
import {ChakraProvider} from '@chakra-ui/react';
import Jumbotron from "../components/jumbotron";

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
                Jumbotron,
                props,
            )
        ));
    }
}