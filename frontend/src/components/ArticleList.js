import React, {Component} from 'react';
import Table  from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class ArticleList extends Component {
  constructor(){
    super()
    this.state = {
    }
  }

  formatMessage(message){
    return <tr className='message'
      key={message._id}>
      <td>{message.topic}</td>
      <td>{message.title}</td>
      <td>{message.author}</td>
      <td>{message.pageRange}</td>
      <td>{message.year}</td>
      <td>{message.source}</td>
    </tr>      
    }
    render(){
      if (!this.props.messages || this.props.messages === undefined){
        return <ul id='message_list'>no messages</ul>
      }
      if (this.props.messages){
        return <div>
        <Table style = {divStyle} striped bordered hover responsive>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Title</th>
            <th>Author</th>
            <th>Page(s)</th>
            <th>Year</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
        {this.props.messages.map(message=>{
          return this.formatMessage(message)
        })}
        </tbody>
        </Table>
        <Button variant="secondary" onClick={() =>{this.props.clearSearch();}}>Clear Search</Button>{' '}
        </div>
      }
    }
  };

  const divStyle = {
    marginTop: '20px',
  };

  export default ArticleList
