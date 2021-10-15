import { Form, Input, Button, Table, Space } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../../store/store';
import { addStudents, viewStudents, deleteStudent, updateStudent, getStudentById } from '../student/student.reducer';

export interface IStudentsProps extends StateProps, DispatchProps { }


const Student = (props: any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [id, setId] = useState('')

    useEffect(() => {
        dispatch(props.viewStudents())
    }, [props.students]);

    const onFinish = (data: any) => {
        if (props.studentDetail._id) {
            dispatch(props.updateStudent(id, {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }))
        }
        else {
            dispatch(props.addStudents(data))
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            firstName: props.studentDetail.firstName,
            lastName: props.studentDetail.lastName,
            email: props.studentDetail.email
        })
    }, [props.studentDetail])

    const updateData = (id: any) => {
        setId(id)
        dispatch(props.getStudentById(id))
    }

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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => updateData(record._id)} >
                        Update
                    </Button>
                    <Button type="primary" onClick={() => dispatch(props.deleteStudent(record._id))} danger >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <div className='form-class'>
            <h1 style={{ marginLeft: 550, marginTop: 100 }}>Crud Operation React Redux</h1>
            <Form name="nest-messages"
                layout='horizontal'
                onFinish={onFinish}
                form={form}
                style={{ width: '50%', marginLeft: 450, marginTop: 100 }}
            >
                <Form.Item
                    name={'firstName'}
                    label="Name"
                    style={{ width: '50%' }}
                >
                    <Input style={{ marginLeft: 40 }} />
                </Form.Item>
                <Form.Item
                    name={'lastName'}
                    label="Last Name"
                    style={{ width: '53%' }}
                >
                    <Input style={{ marginLeft: 10 }} />
                </Form.Item>
                <Form.Item
                    name={'email'}
                    label="Email"
                    style={{ width: '50%' }}
                >
                    <Input style={{ marginLeft: 40 }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <Table dataSource={props.students} columns={columns} style={{ width: '50%', marginLeft: 450, marginTop: 100 }} />;
        </div>
    )
}

const mapStateToProps = (storeState: IRootState) => {
    return {
        students: storeState.student.students,
        studentDetail: storeState.student.studentDetail
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        addStudents,
        viewStudents,
        deleteStudent,
        updateStudent,
        getStudentById
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Student);