import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCookies } from 'react-cookie';
import TextField from "@material-ui/core/TextField";

export class LoginDialog extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isAuth: false
        }
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
                        />
                        <TextField
                            required
                            margin="dense"
                            id="pass"
                            label="Пароль"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Войти
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default LoginDialog;