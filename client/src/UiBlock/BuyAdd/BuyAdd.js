import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import './BuyAdd.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {IconButton} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isAuth: false,
            isUseClickCoords: false,
        }
    }

    changeSlider(event, value) {
        this.setState({isUseClickCoords: value});
    }

    handleAdding() {
        this.props.addBuy(this.state.isUseClickCoords);
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.isOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                    fullWidth={true}
                >
                    <DialogTitle id="form-dialog-title">Добавить покупку</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите информацию о расходах
                        </DialogContentText>
                        <div class='BuyAdd-product-container'>
                            <TextField
                                placeholder="Наименование"
                                inputProps={{ 'aria-label': 'description' }}
                                className='BuyAdd-product-input'
                                variant="outlined"
                                color="primary"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={this.handlePriceChange}
                                value={this.props.currentBuyValue} label="Размер траты" />
                            <div>
                                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
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
                            <IconButton aria-label="delete" disabled color="primary">
                                <AddCircleIcon fontSize="large"/>
                            </IconButton>
                        </div>
                        <List>
                            {[0, 1, 2].map((item) => (
                                <ListItem key={item}>
                                    <ListItemText primary={'Молоко'} />
                                </ListItem>
                            ))}
                        </List>
                        <Switch
                            checked={this.state.isUseClickCoords}
                            onChange={this.changeSlider.bind(this)}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAdding.bind(this)} color="primary">
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