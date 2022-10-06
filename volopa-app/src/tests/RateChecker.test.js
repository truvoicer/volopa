import {screen} from "@testing-library/react";
import RateChecker from "../App/components/RateChecker";
import {render} from "./custom-render";
import {unmountComponentAtNode} from "react-dom";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('RateChecker rendering', async () => {
    render(<RateChecker />)

    // verify page content for default route
    expect(screen.getByText(/Rate Checker/i)).toBeInTheDocument()
})