import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
       tasks: []
    },
    reducers: {
        // Payload is always a task object
        set_tasks: (state, action) => {
            state.tasks = action.payload;
        },
        add_task: (state, action) => {
            state.tasks = [...state.tasks, action.payload];
        },
        complete_task: (state, action) => {
            const task = state.tasks.filter(task => task.id === action.payload.id)?.at(0);
            if (task) {
                task.completed = true;
                const other_tasks = state.tasks.filter(task => task.id !== action.payload.id);
                state.tasks = [...other_tasks, task];
            } else {
                console.error(`Task could not be completed: ${task}`);
            }
        }

    }
})



// Action creators are generated for each case reducer function
export const { set_tasks, add_task, complete_task } = tasksSlice.actions

export default tasksSlice.reducer