import axios from 'axios';

export const ACTION_TYPES = {
    ADD_STUDENT: 'ADD_STUDENT',
    VIEW_STUDENT: 'VIEW_STUDENT',
    DELETE_STUDENT: 'DELETE_STUDENT'
};

const intialState = {
    students: [] as  Array<any>
}

export type StudentState = Readonly<typeof intialState>



//Reducer 

export default (state: StudentState = intialState, action: any): StudentState => {

    switch (action.type) {
        case 'ADD_STUDENT':
            let stud = state.students
            stud.push( action.payload)
            return { ...state,students: stud};

        case 'VIEW_STUDENT':{
            return { ...state,students:action.payload};
        }

        case 'DELETE_STUDENT':{
            let index = state.students.findIndex(element => element._id === action.payload._id)
            state.students.splice(index,1)
            return {...state,students:state.students};
        }
        default:
            return state
    }
}


//action

export const addStudents =  (data: any) => async (dispatch:any) => {
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

export const deleteStudent = (id:any) => async (dispatch: any) => {
    const deleteStudentData: any = await axios.delete(`https://mongodbconnection.herokuapp.com/studentDetail/${id}`)
    await dispatch({
        type: ACTION_TYPES.DELETE_STUDENT,
        payload: deleteStudentData.data
    })
}