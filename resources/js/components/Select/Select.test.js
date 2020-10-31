import React from 'react';
import { Select} from './index';
import { render, fireEvent } from '@testing-library/react';

const mockChangeHandler = jest.fn();

describe('Select', () => {
    test('renders correctly', () => {
        const mockOptions = [ 'test1', 'test2' ];

        const { container } = render(<Select options={mockOptions} changeHandler={mockChangeHandler} />);
        expect(container.innerHTML).toMatch("<option>test1</option>")
        expect(container.innerHTML).toMatch("<option>test2</option>")
    })

    test('calls onChange handler', () => {
        const mockOptions = [ 'test1', 'test2' ];
        const {getByRole} = render(<Select options={mockOptions} changeHandler={mockChangeHandler} />);

        fireEvent.change(getByRole('combobox'), {target : { value: 'test2'}});
        expect(mockChangeHandler).toHaveBeenCalled();
    })
})