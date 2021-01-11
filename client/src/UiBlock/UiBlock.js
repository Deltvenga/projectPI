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
import BuyAddDialog from "./BuyAdd/BuyAdd";
import axios from "axios";

class UserMark {
    constructor(markLocation, markType, markValue) {
        this.location = markLocation;
        this.type = markType;
        this.value = markValue;
    }
}

export class UiBlock extends Component {
    constructor(props) {
        super(props);
        this.userMarks = [new UserMark(
            {
                lat: 57.2531122,
                lng: 65.6689453
            }, 1, 1000
        )];
        this.state = {
            isMenuBarOpen: false,
            open: true,
            openFriendAddingDialog: false,
            personProfileOpen: false,
            buyAddDialog: false,
            currentBuyType: 1,
            currentBuyValue: 0,
            curPos: {
                lat: 57.25310,
                lng: 65.668923
            }
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
            self.setState({curPos: {lat: 57.15313,
                    lng: 65.56891 }});
            this.props.updatePosition(this.state.curPos);
        });
    }

    addNewMark() {
        this.props.userMarks.push(
            new UserMark({lat: this.state.curPos.lat, lng: this.state.curPos.lng },
                this.state.currentBuyType,
                this.state.currentBuyValue
            )
        );
        axios.post('http://localhost:3001/insertMark',null, {
            params: {
                userId: '5fd78c514fb6173abed4d1be',
                userMarks: this.props.userMarks
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
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
                    <BuyAddDialog
                        currentBuyType={this.state.currentBuyType}
                        currentBuyValue={this.state.currentBuyValue}
                        setCurrentBuyValue={(value) => {this.setState({currentBuyValue: value})}}
                        setCurrentBuyType={(value) => {this.setState({currentBuyType: value})}}
                        isOpen={this.state.buyAddDialog}
                        closeHandler={() => {this.setState({buyAddDialog: false})}}
                        addBuy={() => {this.addNewMark()}}
                    />
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
                            <ListItem button onClick={() => {this.setState({buyAddDialog: true})}}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Добавить покупку" />
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
