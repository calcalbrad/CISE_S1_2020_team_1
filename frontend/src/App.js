import React, { Component } from 'react';
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
import ErrorHandler from './components/errorHandler.js'
import SubmitArticleForm from './components/submitArticleForm'
import axios from 'axios';

const PORT = 'http://localhost:3001';

class MessageApp extends Component {
  constructor(){
    super()
    this.state = {
      articles: []
    }
  }

  /* added by Luke */
  orderByYearDesc(){
    const sorted = [...this.state.articles].sort((a,b) => {
      if (a.year > b.year) return -1;
      if (a.year < b.year) return 1;
      return 0;
    });
    this.setArticles(sorted);
  }

  /* added by Luke */
  orderByYearAsc(){
    const sorted = [...this.state.articles].sort((a,b) => {
      if (a.year < b.year) return -1;
      if (a.year > b.year) return 1;
      return 0;
    });
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
    axios.get(`${PORT}/`)
    .then((result)=>{
      this.setArticles(result.data)
    })
    .catch((err)=>{
      this.setError(err)
    })
  }

  searchMessage = (keyword) => {
    axios.get(`${PORT}/search/${keyword}`, {
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
    axios.post(`${PORT}/submit`, {
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
    axios.delete(`${PORT}/delete/${id}`, {
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
    axios.put(`${PORT}/update/${id}`, {
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
    axios.post(`${PORT}/submit`, {
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
      <div>
      <ErrorHandler
      error={this.state.error}
      />
      <MessageForm
      ref='messageFormRef'
      searchMessage={this.searchMessage}
      />
      <button onClick={() =>{this.orderByYearDesc();}}> Order from newest to oldest </button>
      <button onClick={() =>{this.orderByYearAsc();}}> Order from oldest to newest </button>
      <MessageList
      messages={this.state.articles}
      handleDelete={this.deleteMessage}
      sendUpdate={this.sendUpdate}
      clearSearch={this.getAllMessages}
      />
      <SubmitArticleForm 
        submitMessage={this.submitArticle}
      />
      
      </div>
    );
  }
}
export default MessageApp;
