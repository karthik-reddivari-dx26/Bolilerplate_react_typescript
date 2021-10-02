import { createStore, combineReducers, applyMiddleware } from 'redux'
import student, { StudentState } from '../pages/student/student.reducer'
import thunk from 'redux-thunk';

export interface IRootState {
    student: StudentState
}

export const rootReducer = combineReducers({
    student
})

export type AppState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))