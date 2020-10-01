import React, {Component} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PersonProfile from "./PersonProfile";


export class PersonProfileOpener extends Component {

    handleClose = () => {
        this.props.close();
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open}>
                    <DialogContent>
                        <PersonProfile />
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
export default PersonProfileOpener;