import React, {Component} from 'react';
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import './PersonProfile.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";


export class PersonProfile extends Component {


    constructor(props) {
        super(props);

        this.state = {
        }

        this.classes = makeStyles((theme) => ({
            large: {
                width: theme.spacing(7),
                height: theme.spacing(7),
            },
        }));
    }

    render() {
        return (
            <div>
                <Paper elevation={3} className="App-uiBlock__PersonProfile-Container">
                    <Container>
                        <Avatar className="App-uiBlock__PersonProfile-ava" alt="Remy Sharp" src="/avas/ava.jpg"  />
                    </Container>
                    <div className="App-uiBlock__PersonProfile-NameBlock">
                        <Typography variant="h6" gutterBottom>
                            Привет, {this.props.userInfo.name}
                        </Typography>
                        {this.props.emailConfirmed ? "Твоя почта подтверждена" : "Почта не подтверждена"}
                            <Button onClick={this.props.deAuth} color="primary">
                                Выйти
                            </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}
export default PersonProfile;
