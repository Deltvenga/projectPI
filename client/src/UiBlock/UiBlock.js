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
import BuyMark from "../MapBlock/BuyMark";
import {Stats} from "./Stats/Stats";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EqualizerIcon from '@material-ui/icons/Equalizer';

export class UiBlock extends Component {
    constructor(props) {
        super(props);
        this.userMarks = [];
        this.state = {
            isMenuBarOpen: false,
            open: true,
            openFriendAddingDialog: false,
            personProfileOpen: false,
            statsDialog: false,
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
        this.deAuthAndClose = this.deAuthAndClose.bind(this);
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
            self.setState({curPos: {lat: position.coords.latitude,
                    lng: position.coords.longitude }});
            this.props.updatePosition(this.state.curPos);
        });
    }

    addNewMark(isUseClickCoords, buyerList) {
        let curCoords = isUseClickCoords ? this.props.curClickCoords : this.state.curPos;
        this.props.addUserMark(
            new BuyMark(curCoords, buyerList)
        );
        axios.post('http://localhost:3001/updateMarks',null, {
            params: {
                userId: this.props.userId,
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

    deAuthAndClose() {
        this.closeProfilePerson();
        this.setState({isMenuBarOpen: false});
        this.props.deAuth();

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
                        currentBuyName={this.state.currentBuyName}
                        setCurrentBuyName={(value) => {this.setState({currentBuyName: value})}}
                        setCurrentBuyValue={(value) => {this.setState({currentBuyValue: value})}}
                        setCurrentBuyType={(value) => {this.setState({currentBuyType: value})}}
                        isOpen={this.state.buyAddDialog}
                        closeHandler={() => {this.setState({buyAddDialog: false})}}
                        addBuy={(val, val2) => {this.addNewMark(val, val2)}}
                        curClickPos={this.props.curClickCoords}
                    />
                    <Stats
                        userInfo={this.props.userInfo}
                        isOpen={this.state.statsDialog}
                        closeHandler={() => {this.setState({statsDialog: false})}}
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
                            {/*<ListItem button onClick={() => {this.setState({openFriendAddingDialog: true})}}>*/}
                            {/*    <ListItemIcon>*/}
                            {/*        <AddCircleOutlineIcon />*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText primary="Добавить друга" />*/}
                            {/*</ListItem>*/}
                            {/*<ListItem button onClick={() => {this.handleMenuClick('FindFriends')}}>*/}
                            {/*    <ListItemIcon>*/}
                            {/*        <SearchIcon />*/}
                            {/*    </ListItemIcon>*/}
                            {/*    <ListItemText primary="Найти друзей" />*/}
                            {/*</ListItem>*/}
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
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Добавить покупку" />
                            </ListItem>
                            <ListItem button onClick={() => {this.setState({statsDialog: true})}}>
                                <ListItemIcon>
                                    <EqualizerIcon />
                                </ListItemIcon>
                                <ListItemText primary="Статистика покупок" />
                            </ListItem>
                        </List>
                    </Drawer>
                </div>
                <PersonProfileOpener
                    userInfo={this.props.userInfo}
                    open={this.state.personProfileOpen}
                    deAuth={this.deAuthAndClose}
                    close={() => {this.closeProfilePerson()}} />
            </div>
        );
    }

    closeProfilePerson() {
        this.setState({personProfileOpen: false});
    }
}

export default UiBlock;
