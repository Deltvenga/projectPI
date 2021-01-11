import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

export class BuyAddDialog extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }

    handleAddingClose = () => {
        this.props.closeHandler();
    }

    handleChange = (event) => {
        this.props.setCurrentBuyType(event.target.value);
    }

    handlePriceChange = (event) => {
        this.props.setCurrentBuyValue(event.target.value);
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
                    <DialogTitle id="form-dialog-title">Добавить покупку</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите информацию о расходах
                        </DialogContentText>
                                <TextField id="standard-basic" onChange={this.handlePriceChange} value={this.props.currentBuyValue} label="Размер траты" />
                                <br />
                                <br />
                                <div>
                                    <InputLabel id="demo-simple-select-label">Тип расхода</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.props.currentBuyType}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value={1}>Домашние расходы</MenuItem>
                                        <MenuItem value={2}>Развлечения</MenuItem>
                                        <MenuItem value={3}>Здоровье</MenuItem>
                                    </Select>
                                </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.addBuy} color="primary">
                            Добавить
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default BuyAddDialog;