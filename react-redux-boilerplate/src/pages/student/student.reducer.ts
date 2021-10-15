import axios from 'axios';

export const ACTION_TYPES = {
    ADD_STUDENT: 'ADD_STUDENT',
    VIEW_STUDENT: 'VIEW_STUDENT',
    DELETE_STUDENT: 'DELETE_STUDENT',
    UPDATE_STUDENT: 'UPDATE_STUDENT',
    GET_STUDENT: 'GET_STUDENT'
};

const intialState = {
    students: [] as Array<any>,
    studentDetail: {}
}

export type StudentState = Readonly<typeof intialState>



//Reducer 

export default (state: StudentState = intialState, action: any): StudentState => {

    switch (action.type) {
        case 'ADD_STUDENT':
            let stud = state.students
            stud.push(action.payload)
            return { ...state, students: stud };

        case 'VIEW_STUDENT': {
            return { ...state, students: action.payload };
        }

        case 'DELETE_STUDENT': {
            let index = state.students.findIndex(element => element._id === action.payload._id)
            state.students.splice(index, 1)
            return { ...state, students: state.students };
        }
        case 'UPDATE_STUDENT': {
            let index = state.students.findIndex(element => element._id === action.payload._id)
            state.students[index].firstName = action.payload.firstName
            state.students[index].lastName = action.payload.lastName
            state.students[index].email = action.payload.email
            return { ...state, students: state.students };
        }
        case 'GET_STUDENT': {
            return { ...state, studentDetail: action.payload };
        }
        default:
            return state
    }
}


//action

export const addStudents = (data: any) => async (dispatch: any) => {
    const addStudentData: any = await axios.post('https://mongodbconnection.herokuapp.com/studentDetail', data)
    await dispatch({
        type: ACTION_TYPES.ADD_STUDENT,
        payload: addStudentData.data
    })
}


export const viewStudents = () => async (dispatch: any) => {
    const studentData: any = await axios.get('https://mongodbconnection.herokuapp.com/studentDetail')
    await dispatch({
        type: ACTION_TYPES.VIEW_STUDENT,
        payload: studentData.data
    })
}

export const deleteStudent = (id: any) => async (dispatch: any) => {
    const deleteStudentData: any = await axios.delete(`https://mongodbconnection.herokuapp.com/studentDetail/${id}`)
    await dispatch({
        type: ACTION_TYPES.DELETE_STUDENT,
        payload: deleteStudentData.data
    })
}

export const updateStudent = (id: any, data: any) => async (dispatch: any) => {
    const updateStudentData: any = await axios.put(`https://mongodbconnection.herokuapp.com/studentDetail/${id}`, data)
    await dispatch({
        type: ACTION_TYPES.UPDATE_STUDENT,
        payload: updateStudentData.data
    })
}

export const getStudentById = (id: any) => async (dispatch: any) => {
    const getStudentData: any = await axios.get(`https://mongodbconnection.herokuapp.com/studentDetail/${id}`)

    dispatch({
        type: ACTION_TYPES.GET_STUDENT,
        payload: getStudentData.data
    })
}