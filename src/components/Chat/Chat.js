import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateBaseData } from './../../reducers/data-actions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AddConverstation from './Conversation/Add';
import ListConverstation from './Conversation/List';

// ✓ - Build an app that resembles a chat/todo-list,
// ✓ - but has only one participant: you.

// ✓ - There should be an input field on the bottom, 
// ✓ - when you enter something it appears on top of the input field - like in a chat app. 
// So basically it’s a note sheet to jot down random things for yourself.
// It should be possible as well to edit and delete previous messages.
// ✓ - An item counter is displayed on the top of the app.

// The twist is that you should build it using ✓ Redux and ✓ React. 
// Add ( ✓ useful tests ) to your app and (✓ use css and icon fonts to make it look pretty).

// ✓ The more functional and complete it is, the better.
// ✓ it but let's say before end of day Monday 28th May. 

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            user: 'Cabralada',
            edit: {
                txt: '',
                status: false,
                id: ''
            }
        }
    }

    updateData(value, msg) {
        if(typeof value.txt === 'undefined') {
            // Adding!
            this.setState({
                data : value
            }, () => this.props.onUpdateBaseData(this.state.data))
        }
        else {
            //Editing
            let {data} = this.state;

            let newArray = data.map((index, item) => {
                if (item === value.id ) {
                    data[item] = msg
                }
                return data[item]
            });

            this.setState({
                data: newArray,
                edit: {
                    status: false
                }
            }, () => this.props.onUpdateBaseData(data))
        }

    }

    editItem(param) {
        let {data} = this.state;

        this.setState({
            edit: {
                txt: data[param],
                status: true,
                id: param
            }
        })
    }

    deleteNote(param) {
        let {data} = this.state;

        let newData = data.map((index, item) => {
            if (item === param) return '';
            return this.state.data[item]
        });

        this.setState({
            data: this.cleanArray(newData)
        }, () => this.props.onUpdateBaseData(this.state.data))
    }

    cleanArray(current) {
        let cleanUp = [];

        for (let i = 0; i < current.length; i++) {
          if (current[i]) {
            cleanUp.push(current[i]);
          }
        }
        return cleanUp;
    }

    render() {
        let {data} = this.state;

        const PreLoader = (props) => {
            if (data.length > 0) return null;

            return (
                <Paper style={stylePreload}>
                    Add your first note!!
                </Paper>
            )
        }

        const Application = (props) => {
            return (
                <Paper>
                    <ListConverstation 
                        data={props.data}
                        user={props.user}
                        editInfo={this.state.edit.status}
                        editItem={this.editItem.bind(this)}
                        deleteItem={this.deleteNote.bind(this)}
                    />
                    <AddConverstation
                        updateState={this.updateData.bind(this)}
                        editInfo={this.state.edit}
                        data={props.data} />
                </Paper>
            )
        }

        return (
            <Grid
                container
                style={styleMaster}
                className='chat'
                spacing={16}
                alignItems= 'center'
                direction='row'
                justify= 'center'
            >
                <Grid xs={10} sm={6} item>
                    <PreLoader />
                    <Application 
                        data={data}
                        user={this.state.user}
                    />
                </Grid>
        </Grid>
        );
    }
}

/**
 * mapStateToProps(state):
 * function to map the state provided by the done action 
 * to props in your component;
 */

const mapStateToProps = (state, props) => {
    return {
        data: state.data
    }
}

/*
 * mapActionsToProps(actions):
 * function to map the actions to props in your component; 
 * Currently, only the done action exists and is used when 
 * you are finished fetching props.
 */

const mapActionsToProps = {
    onUpdateBaseData: updateBaseData
}

export default connect(mapStateToProps, mapActionsToProps) (Chat);

const styleMaster = {
    margin: '0 auto',
    maxWidth: '1000px',
    width: 'auto',
    fontSize: '2rem'
};

const stylePreload = {
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '2rem'
}

