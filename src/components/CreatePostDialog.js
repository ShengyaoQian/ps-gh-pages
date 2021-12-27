import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

class CreatePostDialog extends React.Component {

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  keyPressForTitle(event){
      if(event.keyCode === 13){ // enter
        this.setState({title: `${event.target.value}\\n`});
      }
   }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleHoursChange(event) {
    this.setState({hours: event.target.value});
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.createPost(this.state.title, this.state.content, this.state.hours);
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      hours: 0
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.keyPressForTitle = this.keyPressForTitle.bind(this);

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <Dialog open={this.props.createPostOpen} onClose={this.props.handleClose}>
        <DialogTitle>Create a post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a post, enter title, content and number of hours before close.
            People will not be able to reply after the close time and the replies will be
            released all at once at close time.
          </DialogContentText>
          <Stack spacing={2} sx={{ width: '98%', m: 2}}>
            <TextField
              id="outlined-multiline-static"
              label="Title"
              multiline
              rows={2}
              value={this.state.title}
              onChange={this.handleTitleChange}
              placeholder="Title"
            />
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={4}
              value={this.state.content.replace(/↵/g, "\n")}
              onChange={this.handleContentChange}
              placeholder="Content"
            />
            <TextField
              id="outlined-number"
              label="Hours before closing"
              type="number"
              value={this.state.hours}
              onChange={this.handleHoursChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>Cancel</Button>
          <Button onClick={this.handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreatePostDialog;
