import React, {Component} from 'react';
import Card  from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';

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
      <Card style={divStyle}>
      <Card.Header>{message.title}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Author(s): {message.author}</ListGroup.Item>
        <ListGroup.Item>Pages: {message.pageRange}</ListGroup.Item>
        <ListGroup.Item>Topic: {message.topic}</ListGroup.Item>
        <ListGroup.Item>Year: {message.year}</ListGroup.Item>
      </ListGroup>
    </Card>
      </li>
      
    }
    render(){
      if (!this.props.messages || this.props.messages == undefined){
        return <ul id='message_list'>no messages</ul>
      }
      if (this.props.messages){
        console.log(this.props.messages)
        var messageArray = Array.from(this.props.messages)
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

  const divStyle = {
    marginTop: '20px',
  };

  export default MessageList
