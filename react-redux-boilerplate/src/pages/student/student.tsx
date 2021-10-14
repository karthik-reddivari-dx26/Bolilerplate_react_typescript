import { Form, Input, InputNumber, Button, Table, Space } from 'antd';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../../store/store';
import { addStudents, viewStudents,deleteStudent } from '../student/student.reducer';

export interface IStudentsProps extends StateProps, DispatchProps { }


const Student = (props: any) => {
    const dispatch = useDispatch();
    const [studentData, setStudentData]: any = useState([]);

    const onFinish = (data: any) => {
        dispatch(props.addStudents(data.user))
    };

  
    useEffect(() => {
      dispatch(props.viewStudents())
    }, []);

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
            render: (text:any, record:any) => (
                <Space size="middle">
                    <Button type="primary"  onClick={() => dispatch(props.deleteStudent(record._id))} danger >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <div className='form-class'>
            <h1 style={{marginLeft:550,marginTop:100}}>Crd Operation React Redux</h1>
            <Form name="nest-messages"
                onFinish={onFinish}
                layout='horizontal'
                style={{width:'50%',marginLeft:450,marginTop:100}}
            >
                <Form.Item
                    name={['user', 'firstName']}
                    label="Name"
                    style={{width:'50%'}}
                >
                    <Input style={{marginLeft:40}} />
                </Form.Item>
                <Form.Item
                    name={['user', 'lastName']}
                    label="Last Name"
                    style={{width:'53%'}}
                >
                    <Input style={{marginLeft:10}} />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    style={{width:'50%'}}
                >
                    <Input style={{marginLeft:40}} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Add
                    </Button>
                </Form.Item>
            </Form>
                <Table dataSource={props.students} columns={columns} style={{width:'50%',marginLeft:450,marginTop:100}}/>;
        </div>
    )
}

const mapStateToProps = (storeState: IRootState) => {
    return {
        students: storeState.student.students,
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        addStudents,
        viewStudents,
        deleteStudent
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Student);