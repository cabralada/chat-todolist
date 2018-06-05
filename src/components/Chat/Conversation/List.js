import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



class ListChat extends Component {

    scrollToBottom = () => {
        this.listContainer.scrollTop = this.listContainer.scrollHeight;
    }
    
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        let arr = this.props.data;
        let signature = "Sent by " + this.props.user;
        let complete = arr.length > 0;

        return (
            <div
                className={!complete ? 'empty' : null}
                style={styleMaster}
                ref={(element) => { this.listContainer = element; }}
            >

                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            {arr.length > 1 ? 'Lists of ' : 'Starting with'} {arr.length}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List className="list">
                    {
                        arr.map((index, item) => {
                            return (
                                <div key={item}>
                                    <ListItem>
                                        <ListItemText
                                            primary= {index}
                                            secondary = {signature}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton 
                                                onClick={(e) => this.props.editItem(item)} 
                                                aria-label="Edit">
                                                <EditIcon />
                                            </IconButton>
                                            {
                                                !this.props.editInfo ?
                                                <IconButton
                                                    onClick={(e) => this.props.deleteItem(item)}
                                                    aria-label="Delete">
                                                    <DeleteIcon />
                                                </IconButton> : null
                                            }

                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })
                    }
                    
                </List>
            </div>
        )
    }
}

export default ListChat;

const styleMaster = {
    maxHeight: '50vh',
    overflow: 'auto'
};
