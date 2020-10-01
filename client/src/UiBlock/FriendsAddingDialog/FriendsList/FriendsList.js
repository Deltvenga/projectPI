import React, {Component} from 'react';
import Avatar from "@material-ui/core/Avatar";
import './FriendsList.css';
import {Button} from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FriendItem from "./FriendItem/FriendItem";


export class FriendsAddingDialog extends Component {


    constructor(props) {
        super(props);
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
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={this.classes.root}>
                    {this.props.friendsList.map((item) => (
                        <div className="App-uiBlock-FriendsList__avaContainer">
                            <FriendItem data={item} />
                        </div>
                    ))}
                </List>
            </div>
        );
    }
}
export default FriendsAddingDialog;