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

      // this.onChange()
      // this.setState({ title: '' })
      // this.setState({ author: '' })
      // this.setState({ topic: '' })
      // this.setState({ topic: '' })
      // this.setState({ DOI: '' })
      // this.setState({ year: 2020 });
  }

  render() {
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
          id='title'
          required>
        </input>
        <br />
        <label htmlFor="author">Search by article author:</label>
        <input type="text"
          onChange={(e) => this.onChange(e)}
          value={this.state.author}
          name='author'
          id='author'
          required>
        </input>
        <br />
        <label htmlFor="topic">Search by SE topic:</label>
        <input type="text"
          onChange={(e) => this.onChange(e)}
          value={this.state.topic}
          name='topic'
          id='topic'>
        </input>
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
  }
}

export default SearchForm;
