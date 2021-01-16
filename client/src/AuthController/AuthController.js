import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { useCookies } from 'react-cookie';
import RegisterDialog from "./RegisterDialog/RegisterDialog";
import LoginDialog from "./LoginDialog/LoginDialog";

export class AuthController extends Component {
    handleClose = () => {
        this.setState({mainDialogOpen: false});
    }

    handleOpen = () => {
        this.setState({mainDialogOpen: true});
    }

    constructor(props) {
        super(props);
        this.state = {
            mainDialogOpen: false,
            isAuth: false,
            isRegisterOpened: false,
            isLoginOpened: false
        }
    }

    componentDidMount() {
        if(!this.props.isAuth) {
            // this.handleOpen();
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.mainDialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Вы не зарегистрированы!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                             Хотите зарегистрироваться или войти?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({isRegisterOpened: true})}} color="primary">
                            Зарегистрироваться
                        </Button>
                        <Button onClick={() => {this.setState({isLoginOpened: true})}} color="primary" autoFocus>
                            Войти
                        </Button>
                    </DialogActions>
                </Dialog>
                <RegisterDialog
                    isOpen={this.state.isRegisterOpened}
                    setUserInfo={this.props.setUserInfo}
                    closeHandler={() => {this.setState({isRegisterOpened: false})}}/>
                <LoginDialog
                    isOpen={this.state.isLoginOpened}
                    closeHandler={() => {this.setState({isLoginOpened: false})}}/>
            </div>
        );
    }
}
export default AuthController;
