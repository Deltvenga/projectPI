import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { useCookies } from 'react-cookie';
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export class LoginDialog extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isAuth: false,
            email: '',
            password: ''
        }
    }

    handleLogin = () => {
        axios.post('http://localhost:3001/loginUser', null, {
            params: {
                email: this.state.email,
                password: this.state.password
            }
        }).then((answer) => {
            if(!answer.data.error) {
                this.props.setUserInfo(answer.data);
                this.handleClose();
            } else {
                alert(answer.data.error);
            }
        })
    }

    handleChange = (event) => {
        var result = {};
        result[event.target.id] = event.target.value;
        this.setState(result);
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.isOpen} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите данные авторизации.
                        </DialogContentText>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleLogin} color="primary">
                            Войти
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default LoginDialog;
