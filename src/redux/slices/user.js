import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        set_user: (state, action) => {
            state.user = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { set_user } = userSlice.actions

export default userSlice.reducer