import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export class Stats extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }

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
                    <DialogTitle id="form-dialog-title">Анализ</DialogTitle>
                    <DialogContent>

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
export default Stats;