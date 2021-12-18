import { configureStore } from '@reduxjs/toolkit';
import updateMateriaReducer from './reducers/updateMateria';
import updatePanelReducer from './reducers/updatePanel';

const store = configureStore({
    reducer: {
        updateM: updateMateriaReducer,
        updateP: updatePanelReducer
    }
});

export default store;