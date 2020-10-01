import React, {Component} from 'react';
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import './PersonProfile.css';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


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
                            Here is your name!
                        </Typography>
                    </div>
                </Paper>
            </div>
        );
    }
}
export default PersonProfile;