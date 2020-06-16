import React from 'react';
import ReactDOM from 'react-dom';
import SEERApp from '../App'
import axios from 'axios';
import mockAxios from '../__mocks__/axios.js'
import mockMessages from '../__mocks__/messages.json'
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter()})

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe('SEER App', () => {

  beforeEach(function(){
    mockAxios.post.mockImplementation(() =>
    Promise.resolve({
      data: []
    }));
    mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: mockMessages
    }));
    mockAxios.delete.mockImplementation(() =>
    Promise.resolve({
      data: []
    }));
  })

  afterEach(function(){
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
    mockAxios.delete.mockClear()
  })

  it('renders without crashing', () => {
    spyOn(console, 'error');

    const component = mount(<SEERApp/>);
    expect(component).toMatchSnapshot();
  });

  it('has textbox', () => {
    spyOn(console, 'error');

    const component = mount(<SEERApp/>);
    expect(component.exists('textarea#message_box'));
  });

  it('has submit button', () => {
    spyOn(console, 'error');

    const component = mount(<SEERApp/>);
    expect(component.exists('button#submit'));
  });

  it('has message list', () => {
    spyOn(console, 'error');

    const component = mount(<SEERApp/>);
    expect(component.exists('ul#article_list'));
  });

  it('Loads data from api', () => {
    spyOn(console, 'error');

    mount(<SEERApp />);
    expect(mockAxios.get).toHaveBeenCalled();
  });

  it('should contain a list of articles', () => {
    spyOn(console, 'error');

    const component = shallow(<SEERApp/>);
    act(() => {
      render(component, container);
    });

    expect(component.find('ArticleList')).toBeTruthy();
  });

  it('should contain a sorting function', () => {
    spyOn(console, 'error');
    
    const component = shallow(<SEERApp/>);
    act(() => {
      render(component, container);
    });

    expect(component.find('Dropdown Button')).toBeTruthy();
  });
});
