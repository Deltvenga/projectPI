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



export class RegisterDialog extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }


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
            isAuth: false
        }


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
                        />
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
                        <Button onClick={this.handleClose} color="primary">
                            Зарегистрироваться
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default RegisterDialog;
