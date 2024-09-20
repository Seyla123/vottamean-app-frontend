import { createSlice } from '@reduxjs/toolkit';
import { classApi } from '../../services/classApi';
// Initial state for the slice
const initialState = {
  classes: [],
  selectedClass: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Create the slice
const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    // Set selected class (used when editing or viewing details)
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    // Reset selected class
    resetSelectedClass: (state) => {
      state.selectedClass = null;
    },
  },
  extraReducers: (builder) => {
    // RTK Query status reducers
    builder
      .addMatcher(
        classApi.endpoints.getClassesData.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.classes = action.payload.data;
        }
      )
      .addMatcher(classApi.endpoints.getClassesData.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        classApi.endpoints.getClassesData.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        classApi.endpoints.getClassesById.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.selectedClass = action.payload.data;
        }
      )
      .addMatcher(classApi.endpoints.getClassesById.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        classApi.endpoints.getClassesById.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        classApi.endpoints.postClassesData.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.classes.push(action.payload.data); // Add new class to the list
        }
      )
      .addMatcher(classApi.endpoints.postClassesData.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        classApi.endpoints.postClassesData.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        classApi.endpoints.updateClassesData.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          // Find and update the class in the list
          const index = state.classes.findIndex(
            (cls) => cls.id === action.payload.data.id
          );
          if (index !== -1) {
            state.classes[index] = action.payload.data;
          }
        }
      )
      .addMatcher(classApi.endpoints.updateClassesData.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        classApi.endpoints.updateClassesData.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        classApi.endpoints.deleteClassesData.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          // Remove the deleted class from the list
          state.classes = state.classes.filter(
            (cls) => cls.id !== action.payload.data.id
          );
        }
      )
      .addMatcher(classApi.endpoints.deleteClassesData.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        classApi.endpoints.deleteClassesData.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

// Export actions and reducer
export const { setSelectedClass, resetSelectedClass } = classSlice.actions;
export default classSlice.reducer;