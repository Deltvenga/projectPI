import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid } from '@material-ui/data-grid';
import CategoryList from "../CategoryList";

export class Stats extends Component {
    handleClose = () => {
        this.props.closeHandler();
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isAuth: false,
            result: {}
        }
        this.columns = [
            { field: 'id', headerName: '#', type: 'number', width: 60 },
            { field: 'number', headerName: 'Номер покупки', type: 'number', width: 250 },
            { field: 'category', headerName: 'Категория', width: 250 },
            { field: 'value', headerName: 'Стоимость', type: 'number', width: 250 },
            {
                field: 'date',
                headerName: 'Дата',
                type: 'date',
                width: 200,
            },
            {
                field: 'time',
                headerName: 'Время',
                type: 'time',
                width: 200,
            }
        ];
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isOpen && !prevProps.isOpen) {
            this.prepareGridData();
        }
    }

    prepareGridData() {
        const result = [];
        var id = 1;
        if(!(Object.keys(this.props.userInfo).length === 0 && this.props.userInfo.constructor === Object)) {
            this.props.userInfo.marks.forEach((markItem) => {
                const currentDate = new Date(markItem.date).toLocaleDateString("ru-RU");
                const currentTime = new Date(markItem.date).toLocaleTimeString("ru-RU");
                markItem.buyerList.forEach((item) => {
                    result.push({
                        id: id++,
                        number: item.key,
                        category: CategoryList[item.category],
                        value: Number(item.sum),
                        date: currentDate,
                        time: currentTime
                    })
                })
            })
            this.setState({gridData: result});
        }
    }


    render() {
        return (
            <div>
                <Dialog fullScreen open={this.props.isOpen} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Статистика</DialogTitle>
                    <DialogContent>
                        <div style={{ height: '100%', width: '100%' }}>
                            <DataGrid rows={this.state.gridData} columns={this.columns} pageSize={9} />
                        </div>
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