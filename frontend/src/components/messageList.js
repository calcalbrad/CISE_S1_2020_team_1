import React, {Component} from 'react';
class MessageList extends Component {
  constructor(){
    super()
    this.state = {
      editMode: {
        id: null,
        content: null
      }
    }
  }

  sendUpdate(){
    this.props.sendUpdate(this.state.editMode.id,this.refs.updateBox.value)
    this.toggleUpdate({id:null,content:null})
  }

  toggleUpdate(message){
    this.setState({
      editMode: {
        id: message._id,
        content: message.title
      }
    })
  }
  formatMessage(message){
      return <li
      className='message'
      key={message._id}>
      title: {message.title}
      <br/>
      author(s): {message.author}
      <br/>
      page range: {message.pageRange}
      <br />
      topic: {message.topic}
      <br />
      year: {message.year}<br /><br />
      </li>
    }
    render(){
      if (!this.props.messages){
        return <ul id='message_list'>no messages</ul>
      }
      if (this.props.messages){
        return <div>
        <ul id='message_list'>
        {this.props.messages.map(message=>{
          return this.formatMessage(message)
        })}
        </ul>
        <button onClick={() =>{
            this.props.clearSearch();
        }}>Clear Search</button>
        </div> 
      }
    }
  };
  export default MessageList
