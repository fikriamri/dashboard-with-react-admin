import * as React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useAuthenticated } from 'react-admin';
import { createStructuredSelector } from 'reselect';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as GET from '../redux/Dashboard/selector';
import * as ACT from '../redux/Dashboard/action';


const Dashboard = (props) => {
    useAuthenticated();
    const { userName, setUserName } = props;
    const [values, setValues] = React.useState({name: '', division: ''})

    const [nameInputted, setNameInputted] = React.useState(props.userName)

    const handleInputChange = e => {
        const {value} = e.target;
        setNameInputted(value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (nameInputted) {
            setUserName(nameInputted);
            setNameInputted('');
        }
    }

    React.useEffect(() => {
        setValues({...values, name: userName})
    }, [userName])

    return (
        <Card>
            <CardHeader title="Welcome to Alterra Course Dashboard" />
            <CardContent>
                <TextField 
                    id="user-name"
                    label="Input Your Name"
                    name="name"
                    value={nameInputted}
                    onChange={handleInputChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            <p>
                Hello {values.name ? values.name : "there"}!
            </p>
            </CardContent>
        </Card>
    )
};

// export default Dashboard;

const mapStateToProps = createStructuredSelector({
    userName: GET.userNameGetter,
  });

const mapDispatchToProps = (dispatch) => {
return {
    setUserName: (userName) => dispatch(ACT.setUserName(userName)),
}
};

export default connect(
mapStateToProps,
mapDispatchToProps,
)(withRouter(Dashboard));
