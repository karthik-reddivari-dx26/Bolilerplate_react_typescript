import axios from 'axios';

export const ACTION_TYPES = {
    ADD_STUDENT: 'ADD_STUDENT',
    VIEW_STUDENT: 'VIEW_STUDENT'
};

const intialState = {
    students: []
}

export type StudentState = Readonly<typeof intialState>



//Reducer 

export default (state: StudentState = intialState, action: any): StudentState => {

    switch (action.type) {
        case 'ADD_STUDENT': {
            return { ...state, students: action.payload };
        }
        case 'VIEW_STUDENT': {
            return { ...state, students: action.payload }
        }
        default:
            return state
    }
}


//action

export const addStudents = async (data: any, dispatch: any) => {
    const finalData: any = await axios.post('https://mongodbconnection.herokuapp.com/studentDetail', data)
    dispatch({
        type: ACTION_TYPES.ADD_STUDENT,
        payload: finalData.data
    })
}


export const viewStudents = async (dispatch: any) => {

    const studentData: any = await axios.get('https://mongodbconnection.herokuapp.com/studentDetail')
    dispatch({
        type: ACTION_TYPES.ADD_STUDENT,
        payload: studentData.data,
    })
}