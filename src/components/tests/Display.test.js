import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

const testDisplay = {
    name: "X Chronicals",
    summary: "The chronicles of an individual named 'X'.",
    seasons: [ {id: 0, name: 'Season 1', episodes:[]} ]
    //add in approprate test data structure here.
}

test("renders without error", () => {
    render(<Display />)
});

test('test show component showing after button click', () => {
    const displayFunction = jest.fn()
    render(<Display displayFunction = {displayFunction}/>)

    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = screen.queryByTestId('show-container');
    waitFor( () => expect(show).toBeInTheDocument());
});

test('test correct number of seasons after button click',() => {
    render (<Display show = {testDisplay}/>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    waitFor( () => {
        expect(screen.getAllByTestId('season-option')).toHaveLength(testDisplay.seasons.length)
    });
});

test('test if optional function is being called', () => {
    const mockClick = jest.fn();
    render(<Display handleClick = {mockClick}/>);
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    waitFor( () => expect(mockClick).toHaveBeenCalledTimes(1));
})










///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.