import React from 'React';
import configureStore from 'redux-mock-store'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Chat from './Chat';

import { createStore } from 'redux';
import { updateBaseData } from './../../reducers/data-actions';
import dataReducer from './../../reducers/data-reducer';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {data:[]}
const mockStore = configureStore();

let store, component, redux;

beforeEach(()=>{
    redux = createStore(dataReducer);
    store = mockStore(initialState);
    component = shallow(<Chat store={store} />);
 })

describe('<Chat />', () => {
    it('Should component length 1', () => {
        expect(component.find('Chat').length).toEqual(1)
    });
    
    it('Should props matches with initialState', () => {
        expect(component.find('Chat').prop('data')).toEqual(initialState.data)
    });

    it('Should update data using Redux', () => {
        let newData = ['Ringo', 'John', 'Paul', 'George']
        let startRedux = component.props().onUpdateBaseData(newData);

        redux.dispatch(startRedux)
        expect(redux.getState()).toBe(newData);
    });

    it('Should deleteNote() works', () => {
        let newData = {data:['Ringo', 'John', 'Paul', 'George']}
        store = mockStore(newData);
        component = shallow(<Chat store={store} />);
        const instance = component.dive().instance();

        instance.deleteNote(1); //running function

        expect(instance.state.data).toHaveLength(3)
        expect(instance.state.data).toMatchObject(['Ringo', 'Paul', 'George']);
    })

    it('Should editItem() works', () => {
        let newData = {data:['Ringo', 'John', 'Paul', 'George']}

        store = mockStore(newData);
        component = shallow(<Chat store={store} />);

        const instance = component.dive().instance();

        instance.editItem(1); //running function

        expect(instance.state.edit.status).toBe(true);
        expect(instance.state.edit.txt).toBe('John');
        expect(instance.state.edit.id).toBe(1);
    })
})