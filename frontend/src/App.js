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
      messages: []
    }
  }

  setError(error){
    this.setState({
      error: error
    })
  }

  setMessages(messages){
    this.setState({
      messages: messages
    })
  }

  componentDidMount(){
    this.getAllMessages()
  }

  getAllMessages=()=>{
    axios.get(`${PORT}/`)
    .then((result)=>{
      this.setMessages(result.data)
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
      this.setMessages(result.data)
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
      <MessageList
      messages={this.state.messages}
      handleDelete={this.deleteMessage}
      sendUpdate={this.sendUpdate}
      />
      <SubmitArticleForm 
        submitMessage={this.submitArticle}
      />
      </div>
    );
  }
}
export default MessageApp;
