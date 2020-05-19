import React from 'react';
class SubmitArticleForm extends React.Component {
  constructor(){
    super()
    this.state = {
    title: '',
    author: '',
    pageRange: '',
    topic: '',
    DOI: ''
    }
  }

  onChange = (e) => {
      if(e)
      {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.currentTitle);
      }
  }


  processSubmit(e){
     e.preventDefault()
     console.log(this.state)
      this.props.submitMessage(this.state)
      this.onChange();
    }

render(){
    return (
        <form
          ref='formRef'
          onSubmit={(e)=>this.processSubmit(e)}
          >
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.title}
           name='title'>
          </textarea>
          <br/>
          <textarea
           onChange={(e)=>this.onChange(e)}
           value={this.state.author}
           name='author'>
          </textarea>
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
