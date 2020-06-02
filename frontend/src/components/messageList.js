import React, {Component} from 'react';
import Table  from 'react-bootstrap/Table';
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
/*       return <li
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
      </Card> */

    return <tr className='message'
      key={message._id}>
      <td>{message.topic}</td>
      <td>{message.title}</td>
      <td>{message.author}</td>
      <td>{message.pageRange}</td>
      <td>{message.source}</td>
    </tr>      
    }
    render(){
      if (!this.props.messages || this.props.messages === undefined){
        return <ul id='message_list'>no messages</ul>
      }
      if (this.props.messages){
        console.log(this.props.messages)
        var messageArray = Array.from(this.props.messages)
        return <div>
        <Table style={divStyle} striped bordered hover>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Title</th>
            <th>Author</th>
            <th>Page Range</th>
            <th>Year</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
        {/* <ul id='message_list'> */}
        {this.props.messages.map(message=>{
          return this.formatMessage(message)
        })}
        {/* </ul> */}
        </tbody>
        </Table>
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
