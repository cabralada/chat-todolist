import React, { Component } from 'react';
import styled from "styled-components";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Add extends Component {

    constructor(props) {
        super(props);

        let isEdit = props.editInfo.status ? props.editInfo.txt : '';

        this.state = {
            data: props.data,
            msg: isEdit,
            alert: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState (
            {
                [event.target.name] : event.target.value
            }
        );
    }

    cancelAction() {
        this.setState({
            msg : ''
        })

        this.addForm.reset();
    }

    handleSubmit(event) {
        event.preventDefault();

        let {data} = this.state;
        let {msg} = this.state;
        let isEdit = this.props.editInfo.status;

        if (msg.length < 5) {
            this.setState({ alert: true });
            return
        }

        if (isEdit) {
            this.props.updateState(this.props.editInfo, msg)
        } else {
            this.setState({
                data: [...data, msg]
            }, () => this.props.updateState(this.state.data, ''))

            this.cancelAction()
        }
    }

    handleClickOpen = () => {
        this.setState({ alert: true });
    };

    handleClose = () => {
        this.setState({ alert: false });
    };


    render() {

        let labelText = this.props.editInfo.status ? 'Edit your note' : 'Add a new note note';
        let styleTypePost = this.props.editInfo.status ? 'editMsg' : 'addMsg';

        const UserAlert = (props) => {
            return (
                <Dialog
                    open={this.state.alert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Ops!</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You need a minimum of length of 5 character
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }

        return (
            <FormAdd>

                <UserAlert />

                <form
                    ref={input => this.addForm = input}
                    onSubmit={this.handleSubmit}
                    className={styleTypePost}
                    style={addStyle}
                > 
                    <TextField
                        onChange={this.handleChange}
                        style={filedStyle}
                        name='msg'
                        id="multiline-static"
                        label={labelText}
                        multiline
                        rows="4"
                        defaultValue={this.state.msg}
                        margin="normal"
                    />

                    <Button 
                        type="submit"
                        style={filedStyle}
                        variant="outlined" color="primary"
                    >
                        {this.props.editInfo.status ? 'Edit' : 'Create a new note'}
                    </Button>
                </form>
            </FormAdd>
            
        )
    }
}

export default Add;

const filedStyle = {
    width: '100%'
}

const addStyle = {
    padding: '0 1rem 1rem',
    boxSizing: 'border-box',
    borderTop: '1px solid #eee',
}

const FormAdd = styled.div`
    position: relative;

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 20px;
        background: yellow;
        left: 0;
        top: -21px;

        background: rgba(255,255,255,0);
        background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(50%, rgba(255,255,255,0.8)), color-stop(100%, rgba(255,255,255,1)));
        background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%);
        background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%);
        background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
    }
`;