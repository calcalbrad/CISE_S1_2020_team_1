import React from 'react';
import ReactDOM from 'react-dom';
import ArticleList from '../components/ArticleList'
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme'
import mockMessages from '../__mocks__/messages.json'
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

describe('Article List', () => {
  it('renders without crashing', () => {
    const component = mount(<ArticleList />);

    expect(component).toMatchSnapshot();
  });

  it('takes messages as props and displays them', () => {
    const component = shallow(<ArticleList />);
    const mockArticles = [
      {
        _id: 1,
        topic: 'Topic',
        title: 'Title',
        author: 'author',
        pageRange: '100',
        year: 2020,
        source: 'Source'
      }
    ]
    component.setProps({messages: mockArticles});

    act(() => {
      render(component, container);
    });

    expect(component.exists('table'));
  });

  it('each message in list has delete button', () => {
    const component = shallow(<ArticleList />);
    const mockArticles = [
      {
        _id: 1,
        topic: 'Topic',
        title: 'Title',
        author: 'author',
        pageRange: '100',
        year: 2020,
        source: 'Source'
      }
    ]
    component.setProps({messages: mockArticles});

    act(() => {
      render(component, container);
    });

    expect(component.exists('button'));
  });
});
