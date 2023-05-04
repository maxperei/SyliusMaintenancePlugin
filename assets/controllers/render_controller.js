import {default as ReactRender} from 'ux-react/assets/dist/render_controller.js';
import {createElement} from "react";

export default class extends ReactRender {
    static values = {
        props: String,
    }

    connect() {
        const props = JSON.parse(this.propsValue);
        super._renderReactElement(createElement(
            'div',
            props,
            `Hello, ${props.fullName}`
        ));
    }
}
