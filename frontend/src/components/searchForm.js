import React from 'react';
class SearchForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      topic: '',
      source: ''
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
      // to parse as int:
      //this.setState({[e.target.name]: parseInt(e.target.value)})
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  processSubmit(e) {
      e.preventDefault()
      this.props.submitSearch(this.state)
  }

  render() {
    if (this.props.topics){
    return (
      <form
        ref='formRef'
        onSubmit={(e) => this.processSubmit(e)}
      >
        <label htmlFor="title">Search by article title:</label>
        <input type="text"
          onChange={(e) => this.onChange(e)}
          value={this.state.title}
          name='title'
          id='title'>
        </input>
        <br />
        <label htmlFor="author">Search by article author:</label>
        <input type="text"
          onChange={(e) => this.onChange(e)}
          value={this.state.author}
          name='author'
          id='author'
          >
        </input>
        <br />
        <label htmlFor="topic">Search by SE topic:</label>
        <select
           onChange={(e) => this.onChange(e)}
          // value={this.state.topic}
          name='topic'
          id='topic'>
          >
          <option value=""> All topics </option>
          {this.createSelectItems()}
        </select>
        <br />
        <label htmlFor="source">Search by article source:</label>
        <input type="text"
          onChange={(e) => this.onChange(e)}
          value={this.state.source}
          name='source'
          id='source'>
        </input>
        <br />
        <button
          type="submit"
          name="Submit"
          id="submit">
          Submit
          </button>
      </form>
    );
  } else {
    return <ul id='searchform'>no topics</ul>
  }
}
}

export default SearchForm;
