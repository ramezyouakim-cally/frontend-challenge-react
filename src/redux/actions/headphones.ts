/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '../store';

export const getAll = async() => {
    try {
        await fetch('src/data/headphones.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: any) => {
                store.dispatch({
                    type: 'GET_ALL_HEADPHONES',
                    payload: data
                })

                return data;
            })
    } catch (error) {
        console.error(error)
    }
}