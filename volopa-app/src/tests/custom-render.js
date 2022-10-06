import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import store from "../App/library/redux/store";
import {Provider} from "react-redux";


const Wrapper = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };