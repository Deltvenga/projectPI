import React, {Component} from 'react';
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import PersonProfileOpener from "../../../PersonProfile/PersonProfileOpener";


export class FriendItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
            curTarget: null,
            isMenuOpen: false,
            isFriendsAddingSnackbarOpen: false,
            isPersonProfileOpened: false
        }
    }

    handleElClick = (event) => {
        this.setState({curTarget: event.target, isMenuOpen: true})
    }

    handleMenuClose = () => {
        this.setState({isMenuOpen: false});
    }

    handleSnackBarClose = () => {
        this.setState({isFriendsAddingSnackbarOpen: false})
    }

    addFriend = () => {
        this.setState({isFriendsAddingSnackbarOpen: true})
        this.handleMenuClose();
    }

    openProfile = () => {
        this.setState({isPersonProfileOpened: true});
        this.handleMenuClose();
    }

    closeProfilePerson = () => {
        this.setState({isPersonProfileOpened: false});
    }

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleElClick} >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/avas/ava.jpg" />
                    </ListItemAvatar>
                    <ListItemText>
                        <div className="App-uiBlock-FriendsList__avaContainer-name">
                            {this.props.data.name}
                        </div>
                    </ListItemText>
                </ListItem>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.curTarget}
                    keepMounted
                    open={this.state.isMenuOpen}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.openProfile}>Профиль</MenuItem>
                    <MenuItem onClick={this.addFriend}>Добавить в друзья</MenuItem>
                </Menu>
                <Snackbar open={this.state.isFriendsAddingSnackbarOpen} autoHideDuration={2000} onClose={this.handleSnackBarClose}>
                    <Alert onClose={this.handleSnackBarClose} severity="success">
                        Заявка на добавление отправлена!
                    </Alert>
                </Snackbar>
                <PersonProfileOpener open={this.state.isPersonProfileOpened}  close={() => {this.closeProfilePerson()}}/>
            </div>
        );
    }
}
export default FriendItem;