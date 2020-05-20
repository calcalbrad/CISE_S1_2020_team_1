import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class MessageForm extends React.Component {
  constructor(){
    super()
    this.state = {
      currentMessage: ''
    }
  }

  changeMessageValue(change){
    this.setState({
      currentMessage: change
    })
  }

  processSubmit(e){
     e.preventDefault()
      this.props.searchMessage(this.state.currentMessage)
      this.changeMessageValue('')
    }

render(){
    return (
      <Form ref='formRef' onSubmit={(e)=>this.processSubmit(e)} inline>
      <FormControl onChange={(e)=>this.changeMessageValue(e.target.value)} value={this.state.currentMessage} id='message_box' required={true} type="text" placeholder="Search" className=" mr-sm-2" />
      <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
export default MessageForm;
