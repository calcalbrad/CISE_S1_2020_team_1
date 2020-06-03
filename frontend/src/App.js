import React, { Component } from 'react';
import MessageList from './components/messageList.js'
import SearchForm from './components/searchForm.js'
import ErrorHandler from './components/errorHandler.js'
import SubmitArticleForm from './components/submitArticleForm'
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css';

class MessageApp extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      topics: []
    }
  }

  /* Start of sort functions */

  orderByYearDesc() {
    const sorted = [...this.state.articles].filter(article => typeof article.year != 'undefined').sort((a, b) => b.year - a.year);
    this.setArticles(sorted);
  }

  orderByYearAsc() {
    const sorted = [...this.state.articles].filter(article => typeof article.year != 'undefined').sort((a, b) => a.year - b.year);
    this.setArticles(sorted);
  }

  orderByTitleAlphabetical() {
    const sorted = [...this.state.articles].filter(article => typeof article.title != 'undefined').sort((a, b) => (a.title > b.title) ? 1 : -1);
    this.setArticles(sorted);
  }

  orderByTitleAlphabeticalReverse() {
    const sorted = [...this.state.articles].filter(article => typeof article.title != 'undefined').sort((a, b) => (a.title < b.title) ? 1 : -1);
    this.setArticles(sorted);
  }

  orderBySourceAlphabetical() {
    const sorted = [...this.state.articles].filter(article => typeof article.source != 'undefined').sort((a, b) => (a.source > b.source) ? 1 : -1);
    this.setArticles(sorted);
  }

  orderBySourceAlphabeticalReverse() {
    const sorted = [...this.state.articles].filter(article => typeof article.source != 'undefined').sort((a, b) => (a.source < b.source) ? 1 : -1);
    this.setArticles(sorted);
  }

  orderByAuthorAlphabetical() {
    const sorted = [...this.state.articles].filter(article => typeof article.author != 'undefined').sort((a, b) => (a.author > b.author) ? 1 : -1);
    this.setArticles(sorted);
  }

  orderByAuthorAlphabeticalReverse() {
    const sorted = [...this.state.articles].filter(article => typeof article.author != 'undefined').sort((a, b) => (a.author < b.author) ? 1 : -1);
    this.setArticles(sorted);
  }

  /* End of sort functions */

  setError(error) {
    this.setState({
      error: error
    })
  }

  setArticles(articles) {
    this.setState({
      articles: articles
    })
  }

  setTopics(topics) {
    this.setState({
      topics: topics
    })
  }


  componentDidMount() {
    this.getTopics()
    this.getAllMessages()
  }

  getAllMessages = () => {
    axios.get(`/getarticles`)
      .then((result) => {
        this.setArticles(result.data)
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  // get topics
  getTopics = () => {
    axios.get(`/gettopics`)
      .then((result) => {
        this.setState({
          topics: result.data
        })
      })
      .catch((err) => {
        this.setError(err)
      })
  }


    /* added by luke */
    submitArticle = (data) => {
      axios.post(`/submit`, {
        article: data
      })
        .then(() => {
          this.getAllMessages()
        })
        .catch((err) => {
          this.setError(err)
        })
    }

  // search function
  submitSearch = (searchData) => {
    axios.post(`/search`, {
      searchData: searchData
    })
      .then((result) => {
        this.setArticles(result.data)
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  deleteMessage = (id) => {
    axios.delete(`/delete/${id}`, {
      id: id
    })
      .then((result) => {
        this.getAllMessages()
      })
      .catch((err) => {
        this.setError(err);
      })
  }

  sendUpdate = (id, content) => {
    axios.put(`/update/${id}`, {
      content: content
    })
      .then((result) => {
        this.getAllMessages()
      })
      .catch((err) => {
        this.setError(err);
      })
  }



  render() {
    return (
      <React.Fragment>
        <Navbar className="justify-content-between" bg="light">
          <Navbar.Brand>
            <img
            src="/seer-logo.png"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
      </Navbar.Brand>

        </Navbar>
        <ErrorHandler
          error={this.state.error}
        />
        <Container fluid>
          <Row>
            <Col sm={8}>
              <MessageList
                messages={this.state.articles}
                handleDelete={this.deleteMessage}
                sendUpdate={this.sendUpdate}
                clearSearch={this.getAllMessages}
              />
              <SubmitArticleForm
              submitArticle={this.submitArticle}
              />
            </Col>
            <Col sm={4}>
              <div style = {divInline}>
              <DropdownButton style={divStyle} id="dropdown-basic-button" title="Sort">
                <Dropdown.Item onClick={() => { this.orderByYearDesc(); }}>Sort by Newest</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderByYearAsc(); }}>Sort by Oldest</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderByTitleAlphabetical(); }}>Sort by title</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderByTitleAlphabeticalReverse(); }}>Sort by title reverse</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderByAuthorAlphabetical(); }}>Sort by author</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderByAuthorAlphabeticalReverse(); }}>Sort by author reverse</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderBySourceAlphabetical(); }}>Sort by source</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.orderBySourceAlphabeticalReverse(); }}>Sort by source reverse</Dropdown.Item>
              </DropdownButton>
              </div>
              <SearchForm
                topics={this.state.topics}
                ref='messageFormRef'
                submitSearch={this.submitSearch}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const divStyle = {
  marginTop: '20px',
};
const divInline = {
  display:"inline-block",
}

export default MessageApp;
