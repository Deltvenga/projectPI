import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { useCookies } from 'react-cookie';
import TextField from "@material-ui/core/TextField";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import './RegisterDialog.css';
import axios from "axios";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";



export class RegisterDialog extends Component {
    constructor(props) {
        super(props);
        this.classes = makeStyles((theme) => ({
            small: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
            large: {
                width: theme.spacing(7),
                height: theme.spacing(7),
            },
        }));
        this.state = {
            isOpen: false,
            isAuth: false,
            isEmailSend: false
        }
    }

    handleClose = () => {
        this.props.closeHandler();
    }

    handleChange = (event) => {
        var newValue = {};
        newValue[event.target.id] = event.target.value;
        this.setState(newValue);
    };

    registerHandler = () => {
        axios.post('http://localhost:3001/createUser', null, {
            params: {
                email: this.state.email,
                userName: this.state.name,
                userPassword: this.state.password
            }
        }).then((response) => {
            this.props.setUserInfo(response.data);
            this.setState({isEmailSend: true})
            this.handleClose();
        })
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.isOpen} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Заполните данные регистрации.
                        </DialogContentText>
                        <div className="App-RegisterDialog__photoBlock">
                            <Avatar className={this.classes.large} >
                                <PhotoCamera />
                            </Avatar>
                            <Button>
                                Установить аватар
                            </Button>
                        </div>

                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Имя"
                            type="name"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="email"
                            label="E-mail"
                            type="email"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            label="Пароль"
                            type="password"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="pass-again"
                            label="Повторите пароль"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.registerHandler} color="primary">
                            Зарегистрироваться
                        </Button>

                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={this.state.isEmailSend}
                    autoHideDuration={6000}
                    onClose={()=> {this.setState({isEmailSend: false})}}
                >
                    <Alert onClose={()=> {this.setState({isEmailSend: false})}} severity="success">
                        Вы успешно зарегистрировались! Вам отправлено письмо подтверждения на почту!
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}
export default RegisterDialog;
