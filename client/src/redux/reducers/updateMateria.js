import { createSlice } from "@reduxjs/toolkit";

const materiaSlice = createSlice({
    name: 'dataToUpdate',
    initialState: {
        dataToUpdate:{},
        clicked: false
    },
    reducers: {
        updateMateria: (state, action) => {
            state.dataToUpdate = action.payload
        },
        toggleClicked: (state) => {
            state.clicked = !state.clicked
        }

    }
})

export const {updateMateria, toggleClicked} = materiaSlice.actions;
export default materiaSlice.reducer;