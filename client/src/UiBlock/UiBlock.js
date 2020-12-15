import React, { Component } from 'react';
import './UiBlock.css';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import NavigationIcon from '@material-ui/icons/Navigation';
import PersonIcon from '@material-ui/icons/Person';
import FriendsAddingDialog from "./FriendsAddingDialog/FriendsAddingDialog";
import Fab from "@material-ui/core/Fab";
import PersonProfileOpener from "./PersonProfile/PersonProfileOpener";

export class UiBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuBarOpen: false,
            open: true,
            openFriendAddingDialog: false,
            personProfileOpen: false
        }
        this.classes = makeStyles((theme) => ({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
            nested: {
                paddingLeft: theme.spacing(4),
            },
        }));
    }


    toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ isMenuBarOpen: !this.state.isMenuBarOpen });
    };

    handleMenuClick = () => (event, type) => {
        if(type === 'AddFriend') {
            console.log(true);
            this.setState({openFriendAddingDialog: true})
        }
        if(type === 'MyProfile') {
            this.setState({personProfileOpen: true});
        }
    }


    updateLocationHandler() {
        const self = this;
        navigator.geolocation.getCurrentPosition((position) => {
            self.setState({curPos: {lat: position.coords.latitude, lng: position.coords.longitude }});
            this.props.updatePosition(this.state.curPos);
        });
    }

    render() {
        return (
            <div className="App-uiBlock">
                <Fab
                    className="App-uiBlock__mainButton"
                    onClick={this.toggleDrawer()}
                    variant="extended"
                    color="primary"
                    aria-label="add">
                    <NavigationIcon/>
                    Открыть меню
                </Fab>
                <div>
                    <FriendsAddingDialog
                        isOpen={this.state.openFriendAddingDialog}
                        closeHandler={() => {this.setState({openFriendAddingDialog: false})}}/>
                    <Drawer anchor="bottom" open={this.state.isMenuBarOpen} onClose={this.toggleDrawer()}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Меню
                                </ListSubheader>
                            }
                            className={this.classes.root}
                        >
                            <ListItem button onClick={() => {this.setState({openFriendAddingDialog: true})}}>
                                <ListItemIcon>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Добавить друга" />
                            </ListItem>
                            <ListItem button onClick={() => {this.handleMenuClick('FindFriends')}}>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Найти друзей" />
                            </ListItem>
                            <ListItem button onClick={() => {this.updateLocationHandler()}}>
                                <ListItemIcon>
                                    <AutorenewIcon />
                                </ListItemIcon>
                                <ListItemText primary='Обновить мое местоположение' />
                            </ListItem>
                            <ListItem button onClick={() => {this.setState({personProfileOpen: true})}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Мой профиль" />
                            </ListItem>
                        </List>
                    </Drawer>
                </div>
                <PersonProfileOpener open={this.state.personProfileOpen} close={() => {this.closeProfilePerson()}} />
            </div>
        );
    }

    closeProfilePerson() {
        this.setState({personProfileOpen: false});
    }
}

export default UiBlock;
