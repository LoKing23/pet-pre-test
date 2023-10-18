import { render, screen } from "@testing-library/react";
import Header from "./header";

describe('Header', () => {

    it('header text correctly', () => {
        render(<Header />);

        expect(screen.getByRole('name').textContent).toBe('Good morning! cute cat.');
    });

    it('header text correctly', () => {
        render(<Header greeting="Good afternoon!" />);

        expect(screen.getByRole('name').textContent).toBe('Good afternoon! cute cat.');
    });

    it('snapshot header', () => {
        const { baseElement } = render(<Header greeting="Good afternoon!" />);

        expect(baseElement).toMatchSnapshot();
    })

    it('snapshot by name role', () => {
        render(<Header greeting="Good afternoon!" />);

        expect(screen.getByRole('name')).toMatchSnapshot();
    })


    it('snapshot text', () => {
        render(<Header greeting="Good afternoon!" />);

        expect(screen.getByRole('name').textContent).toMatchSnapshot();
    })
})