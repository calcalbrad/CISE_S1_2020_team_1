import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from '../components/searchForm'
import Enzyme, { render, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme'
import { getByTestId, fireEvent } from '@testing-library/react';
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

describe('Search Form', () => {

  it('renders without crashing', () => {
    const component = mount(<SearchForm/>);
    expect(component).toMatchSnapshot();
  });

  it('has textbox', () => {
    const component = mount(<SearchForm/>);
    expect(component.exists('textarea#message_box'));
  });

  it('has submit button', () => {
    const component = mount(<SearchForm/>);
    expect(component.exists('button#submit'));
  });

  it('should update title state', () => {
    var component = mount(<SearchForm
      topics={'testtopic1', 'testtopic2'}
    />);
    component.setState({ title: 'Hello' })
    expect(component.state('title')).toEqual('Hello');
  });

  it('should update author state', () => {
    var component = mount(<SearchForm
      topics={'testtopic1', 'testtopic2'}
    />);
    component.setState({ author: 'Hello' })
    expect(component.state('author')).toEqual('Hello');
  });

  it('should update topics state', () => {
    var component = mount(<SearchForm
      topics={'testtopic1', 'testtopic2'}
    />);
    component.setState({ topics: 'testtopic'})
    expect(component.state('topics')).toEqual('testtopic');
  });

  it('should update source state', () => {
    var component = mount(<SearchForm
      topics={'testtopic1', 'testtopic2'}
    />);
    component.setState({ source: 'Hello'})
    expect(component.state('source')).toEqual('Hello');
  });
});
