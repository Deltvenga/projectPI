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

    handleBuyNameChange = (event) => {
        this.props.setCurrentBuyName(event.target.value);
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isAuth: false,
            isUseClickCoords: false,
            buyerList:[]
        }
    }

    changeSlider(event, value) {
        this.setState({isUseClickCoords: value});
    }

    handleAdding() {
        this.props.addBuy(this.state.isUseClickCoords, this.state.buyerList);
        this.props.closeHandler();
    }

    addNewBuy() {
        let buy = {
            key: this.state.buyerList.length + 1,
            name: this.props.currentBuyName,
            category: this.props.currentBuyType,
            sum: this.props.currentBuyValue
        }
        //this.props.addBuy(this.state.isUseClickCoords);
        let currBuyList = this.state.buyerList;
        currBuyList.push(buy);
        this.setState({ buyerList:currBuyList });
        console.log(this.state);

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
                        <div className='BuyAdd-product-container'>
                            <TextField
                                placeholder="Наименование"
                                inputProps={{ 'aria-label': 'description' }}
                                className='BuyAdd-product-input'
                                variant="outlined"
                                color="primary"
                                onChange={this.handleBuyNameChange}
                                value={this.props.currentBuyName || ''}
                            />
                            <TextField
                                id="standard-basic"
                                onChange={this.handlePriceChange}
                                value={this.props.currentBuyValue || ''} label="Размер траты" />
                            <div>
                                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.props.currentBuyType}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={'home'}>Домашние расходы</MenuItem>
                                    <MenuItem value={'entertainment'}>Развлечения</MenuItem>
                                    <MenuItem value={'health'}>Здоровье</MenuItem>
                                    <MenuItem value={'gifts'}>Подарки</MenuItem>
                                    <MenuItem value={'education'}>Образование</MenuItem>
                                </Select>
                            </div>
                            <Button onClick={this.addNewBuy.bind(this)} color="primary">
                                Добавить
                            </Button>
                        </div>
                        <List>
                            {this.state.buyerList.map((item) => (
                                <ListItem key={item.key}>
                                    <ListItemText primary={item.name}  secondary={item.sum + 'руб.'}/>
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
                            Добавить покупки
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default BuyAddDialog;
