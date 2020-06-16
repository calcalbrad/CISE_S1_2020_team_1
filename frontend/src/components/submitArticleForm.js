import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SubmitArticleForm extends React.Component {
  constructor(){
    super()
    this.state = {
    title: '',
    author: '',
    pageRange: '',
    topic: '',
    DOI: '',
    year: 2020,
    }
  }

  onChange = (e) => {
      if(e)
      {
          if(e.target.name === 'year'){
            this.setState({[e.target.name]: parseInt(e.target.value)})
          } else {
            this.setState({ [e.target.name]: e.target.value });
          }
      }
  }

  processSubmit(e){
    if (this.state.title.length > 500) {
      alert("Error! The length of the title exceeds the maximum value (500 characters).")
      e.preventDefault()
      return false;
    } else if (this.state.author.length > 500) {
      alert("Error! The length of the author exceeds the maximum value (500 characters).")
      e.preventDefault()
      return false;
    } else {
      e.preventDefault()
      this.props.submitArticle(this.state)
      this.onChange()
      this.setState({title: ''})
      this.setState({author: ''})
      this.setState({pageRange: ''})
      this.setState({topic: ''})
      this.setState({DOI: ''})
      this.setState({source: ''})
      this.setState({year: 2020});
    }
  }

render(){
    return (
      <div>
      <h5>Submit Article</h5>
      <Form ref='formRef' onSubmit={(e)=>this.processSubmit(e)}>
        <Form.Group>
          <Form.Control type="text" placeholder="Article Title" onChange={(e)=>this.onChange(e)}
          value={this.state.title} name='title' id='title'required />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Article Author" onChange={(e)=>this.onChange(e)}
           value={this.state.author} name='author' id='author'required />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Page Range" onChange={(e)=>this.onChange(e)}
           value={this.state.pageRange} name='pageRange' id='pageRange'required />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Article Topic" onChange={(e)=>this.onChange(e)}
           value={this.state.topic} name='topic' id='topic'required />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="DOI" onChange={(e)=>this.onChange(e)}
           value={this.state.DOI} name='DOI' id='DOI'required />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Source" onChange={(e)=>this.onChange(e)}
           value={this.state.source} name='source' id='source'required />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Article Topic" onChange={(e)=>this.onChange(e)}
           value={this.state.year} name='year' id='year'required />
        </Form.Group>
        <Button variant="primary" name="Submit" id="Submit" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    );
  }
}

export default SubmitArticleForm;
