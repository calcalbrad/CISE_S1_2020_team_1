import React from 'react';
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
      alert("Error! The length of the title exceeds the maximum value (500 characters).");
      e.preventDefault();
      return false;
    } else if (this.state.author.length > 500) {
      alert("Error! The length of the author exceeds the maximum value (500 characters).");
      e.preventDefault();
      return false;
    } else {
      e.preventDefault()
      this.props.submitMessage(this.state)
      this.onChange();
    }
  }

render(){
    return (
        <form
          ref='formRef'
          onSubmit={(e)=>this.processSubmit(e)}
          >
          <label htmlFor="title">Article title:</label> 
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.title}
           name='title'
           id='title'
           required>
          </textarea>
          <br/>
          <label htmlFor="author">Article author:</label> 
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.author}
           name='author'
           id='author'
           required>
          </textarea>
          <br/>
          <label htmlFor="pageRange">Page range:</label> 
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.pageRange}
           name='pageRange'
           id='pageRange'>
          </textarea>
          <br/>
          <label htmlFor="topic">Article topic:</label> 
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.topic}
           name='topic'
           id='topic'>
          </textarea>
          <br/>
          <label htmlFor="DOI">Article DOI:</label> 
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.DOI}
           name='DOI'
           id='DOI'>
          </textarea>
          <br/>
          <label htmlFor="year">Article year:</label> 
          <input type = "number"
           onChange={(e)=>this.onChange(e)}
           value={this.state.year}
           name='year'
           id='year'>
          </input>
          <br/>
          <button
            type="submit"
            name="Submit"
            id="submit">
            Submit
          </button>
        </form>
    );
  }
}

export default SubmitArticleForm;
