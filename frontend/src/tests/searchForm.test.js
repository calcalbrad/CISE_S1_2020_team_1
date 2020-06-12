import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from '../components/searchForm'
import Enzyme, { render, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme'
import { getByTestId, fireEvent } from '@testing-library/react';
Enzyme.configure({ adapter: new Adapter()})

describe('Search Form', () => {

  it('renders without crashing', () => {
    const component = mount(<MessageForm/>);
    expect(component).toMatchSnapshot();
  });

  it('has textbox', () => {
    const component = mount(<MessageForm/>);
    expect(component.exists('textarea#message_box'));
  });

  it('has submit button', () => {
    const component = mount(<MessageForm/>);
    expect(component.exists('button#submit'));
  });

  it('should update state message when text entered', () => {
    //const component = shallow(<MessageForm/>);
    //component.find('textarea#message_box').simulate('change', { target: { value: 'Hello' } });
    //expect(component.state('currentMessage')).toEqual('Hello');

    const container = mount(<MessageForm/>);
    const text_box = container.find('message_box')
    text_box.simulate('change', {target: { value: 'Hello' } });
    expect(component.state('currentMessage').toEqual('Hello'));
  });

  it('clears message box on submit', () => {
    const component = mount(<MessageForm
      submitMessage={function(item){return true}}
    />);
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello' } })
    expect(component.state('currentMessage')).toEqual('Hello');
    component.find('form').simulate('submit')
    component.update()
    expect(component.find('textarea#message_box').props().value).toEqual('');
    expect(component.state('currentMessage')).toEqual('');
  });

});
