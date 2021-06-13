import App from './App';
import React from 'react'
import {mount} from 'enzyme'
 import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Home from './component/home/Home';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });


describe('rendering components',() => {

  const mockStore = configureMockStore([thunk]);
  const store = mockStore();

  it ("clicks button",() => {
    const medicData = {
      name: "Miguel Rizzo", 
      email: "aa@aa.com", 
      id: "123456", 
      admin: "true"
    }
    const wrapper = mount(<Router><Provider store={store}><Home medicData={medicData} /></Provider></Router>)  
    let button = wrapper.find('[test="BtnPurple"]')
    button.simulate('click');
  })

  it ("recieves medic",() => {
    const medicData = {
        name: "Miguel Rizzo", 
        email: "aa@aa.com", 
        id: "123456", 
        admin: "true"
    }

    const wrapper = renderer.create(<Router><Provider store={store}><Home medicData={medicData} /></Provider></Router>);
    const inst = wrapper.getInstance();
    expect(inst.seeMedic()).toMatchSnapshot()

  })
}) 

