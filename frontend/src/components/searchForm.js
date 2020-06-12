import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SearchForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      topic: '',
      source: '',
      yearsoffset: '0'
    }
  }

  createSelectItems() {
    var topics = this.props.topics;

    let items = [];
    for (let i = 0; i < topics.length; i++) {
      items.push(<option key={i} value={topics[i]}>{topics[i]}</option>);
    }
    return items;
  }

  onChange = (e) => {
    if (e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  processSubmit(e) {
    e.preventDefault()
    this.props.submitSearch(this.state)
  }

  handleOptionChange = changeEvent => {
    this.setState({
      yearsoffset: changeEvent.target.value
    });
  };


  render() {
    if (this.props.topics) {
      return (
        <Card style={divStyle}>
          <Card.Header>Search</Card.Header>
          <Card.Body>
            <Form ref='formRef' onSubmit={(e) => this.processSubmit(e)}>
              <Form.Group controllId="formTitle">
                <Form.Control type="text" placeholder="Article Title" onChange={(e) => this.onChange(e)}
                  value={this.state.title} name='title' id='title' />
              </Form.Group>
              <Form.Group controllId="formAuthor">
                <Form.Control type="text" placeholder="Article Author" onChange={(e) => this.onChange(e)}
                  value={this.state.author} name='author' id='author' />
              </Form.Group>
              <Form.Group controllId="formTopic">
                <Form.Control as="select" onChange={(e) => this.onChange(e)}
                  name='topic' id='topic'>
                  <option value="">All topics</option>
                  {this.createSelectItems()}
                </Form.Control>
              </Form.Group>
              <Form.Group controllId="formSource">
                <Form.Control type="text" placeholder="Article Source" onChange={(e) => this.onChange(e)}
                  value={this.state.source} name='source' id='source' />
              </Form.Group>

              <Form.Group controllId="formYearToggle">
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="0"
                    checked={this.state.yearsoffset === "0"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  All years
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="5"
                    checked={this.state.yearsoffset === "5"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Last 5 years
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="10"
                    checked={this.state.yearsoffset === "10"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Last 10 years
                </label>
              </div>
              </Form.Group>

              <Button variant="primary" name="Submit" id="Submit" type="submit">
                Submit
            </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    } else {
      return <ul id='searchform'>no topics</ul>
    }
  }
}
const divStyle = {
  marginTop: '20px',
};
export default SearchForm;
