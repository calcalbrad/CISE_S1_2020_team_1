import React, { Component } from 'react';
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
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
  constructor(){
    super()
    this.state = {
      articles: []
    }
  }

  /* added by Luke */
  orderByYearDesc(){
    const sorted = [...this.state.articles].filter(article => typeof article.year != 'undefined').sort((a,b) => b.year - a.year);
    this.setArticles(sorted);
  }

  /* added by Luke */
  orderByYearAsc(){
    const sorted = [...this.state.articles].filter(article => typeof article.year != 'undefined').sort((a,b) => a.year - b.year);
    this.setArticles(sorted);
  }


  setError(error){
    this.setState({
      error: error
    })
  }

  setArticles(articles){
    this.setState({
      articles: articles
    })
  }

  componentDidMount(){
    this.getAllMessages()
  }

  getAllMessages=()=>{
    axios.get(`/getarticles`)
    .then((result)=>{
      console.log("hi" + result.data)
      this.setArticles(result.data)
    })
    .catch((err)=>{
      this.setError(err)
    })
  }

  searchMessage = (keyword) => {
    axios.get(`/search/${keyword}`, {
      keyword: keyword
    })
    .then((result)=>{
      this.setArticles(result.data)
    })
    .catch((err)=>{
      this.setError(err)
    })
  }

  submitMessage = (data) => {
    axios.post(`/submit`, {
      content: data
    })
    .then(()=>{
      this.getAllMessages()
    })
    .catch((err)=>{
      this.setError(err)
    })
  }

  deleteMessage = (id) => {
    axios.delete(`/delete/${id}`, {
      id: id
    })
    .then((result)=>{
      this.getAllMessages()
    })
    .catch((err)=>{
      this.setError(err);
    })
  }

  sendUpdate = (id, content) => {
    axios.put(`/update/${id}`, {
      content: content
    })
    .then((result)=>{
      this.getAllMessages()
    })
    .catch((err)=>{
      this.setError(err);
    })
  }

  /* added by luke */
  submitArticle = (data) => {
    console.log(data);
    axios.post(`/submit`, {
      article: data
    })
    .then(()=>{
      this.getAllMessages()
    })
    .catch((err)=>{
      this.setError(err)
    })
  }

  render(){
    return (
      <React.Fragment>
        <Navbar className="justify-content-between" bg="dark" variant="dark">
          <Navbar.Brand>SEER Search</Navbar.Brand>
          <MessageForm
          ref='messageFormRef'
          searchMessage={this.searchMessage}
          />
        </Navbar>
      <ErrorHandler
      error={this.state.error}
      />
      <Container>
      <Row>
        <Col sm={10}>
          <MessageList
          messages={this.state.articles}
          handleDelete={this.deleteMessage}
          sendUpdate={this.sendUpdate}
          clearSearch={this.getAllMessages}
          />
        </Col>
        <Col sm={2}>
        <DropdownButton style={divStyle} id="dropdown-basic-button" title="Sort">
          <Dropdown.Item onClick={() =>{this.orderByYearDesc();}}>Sort by Newest</Dropdown.Item>
          <Dropdown.Item onClick={() =>{this.orderByYearAsc();}}>Sort by Oldest</Dropdown.Item>
        </DropdownButton>
        </Col>
      </Row>
      </Container>
      <SubmitArticleForm 
        submitMessage={this.submitArticle}
      />
      </React.Fragment>
    );
  }
}

const divStyle = {
  marginTop: '20px',
};


export default MessageApp;
