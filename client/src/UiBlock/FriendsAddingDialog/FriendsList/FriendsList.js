import React, {Component} from 'react';
import './FriendsList.css';
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
