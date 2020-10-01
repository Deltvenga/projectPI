import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import FriendsList from "./FriendsList/FriendsList";

export class FriendsAddingDialog extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }

    friendsList = [
        {
            id: 0,
            name: 'Victor',
            avaId: 1
        },
        {
            id: 1,
            name: 'Tatiana',
            avaId: 2
        }
    ]

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
                <Dialog open={this.props.isOpen} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавить друга</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите имя или email друга.
                        </DialogContentText>
                        <TextField
                            fullWidth
                            id="input-with-icon-textfield"
                            label="Поиск"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FriendsList
                            friendsList={this.friendsList}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default FriendsAddingDialog;