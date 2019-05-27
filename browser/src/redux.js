import { createStore } from 'redux';

const initialState = {
    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    basket: [],
}


const reducer = (state = initialState, action) => {
    const updatedState = { ...state };

}





export const store = createStore(reducer);