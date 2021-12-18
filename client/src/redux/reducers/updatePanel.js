import { createSlice } from "@reduxjs/toolkit";

const emptyState = [];

const panelSlice = createSlice({
    name: 'panel',
    initialState: {
        panel: emptyState
    },
    reducers: {
        updatePanel: (state, action) => {
            state.panel.push(action.payload)
        },
        deleteItem: (state,action)=>{
            state.panel.splice(action.payload,1)
        },
        addQuantity: (state, action) => {

            if(state.panel[action.payload].cantidad <5){
                state.panel[action.payload].cantidad +=1
            }
        },
        subtractQuantity: (state, action) => {

            if(state.panel[action.payload].cantidad > 2){
                state.panel[action.payload].cantidad -=1
            }
        },
        setToInitial(state){
            state.panel = emptyState
        }
        

    }
})

export const {updatePanel, deleteItem, addQuantity, subtractQuantity, setToInitial} = panelSlice.actions;
export default panelSlice.reducer;