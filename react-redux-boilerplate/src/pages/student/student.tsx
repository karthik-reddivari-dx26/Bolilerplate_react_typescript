import { Form, Input, InputNumber, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../../store/store';
import { addStudents, viewStudents } from '../student/student.reducer';

export interface IStudentsProps extends StateProps, DispatchProps { }


const Student = (props: any) => {
    const dispatch = useDispatch();
    const [studentData, setStudentData]: any = useState([]);
    const onFinish = (data: any) => {
        props.addStudents(data.user, dispatch)
    };

    useEffect(() => {
        props.viewStudents(dispatch);

    }, []);

    useEffect(() => {
        console.log("props.students :: ",props.students);
        props.students.map((item: any, i:number) => {
            setStudentData([{
                key: i,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                contact: item.contact ? item.contact : ""
            }])
        })
    }, [props.students])

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
    ];

    return (
        <div>
            <h1>Student Registration</h1>
            <Form name="nest-messages"
                onFinish={onFinish}
            >

                <Form.Item
                    name={['user', 'firstName']}
                    label="Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'lastName']}
                    label="Last Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={studentData} />
        </div>
    )
}

const mapStateToProps = (storeState: IRootState) => ({
    students: storeState.student.students
});
const mapDispatchToProps = (dispatch:any) => {
    return {
        addStudents,
        viewStudents
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Student);