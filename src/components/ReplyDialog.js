import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

class ReplyDialog extends React.Component {

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleReply(event) {
    event.preventDefault();
    this.props.replyToPost(this.props.postId, this.state.content);
    this.setState({content: ''});
    this.props.handleCloseReply();
  }

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }

  render() {
    return (
      <Dialog
       open={this.props.replyToPostOpen}
       onClose={this.props.handleCloseReply}
       fullWidth
       maxWidth="md">
        <DialogTitle>Reply to the post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your reply will be release at close time.
          </DialogContentText>
          <Stack spacing={2} sx={{ width: '95%', m: 2}}>
            <TextField
              id="outlined-multiline-static"
              label="Reply"
              multiline
              rows={4}
              value={this.state.content}
              onChange={this.handleContentChange}
              placeholder="Reply"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleCloseReply}>Cancel</Button>
          <Button onClick={this.handleReply}>Reply</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ReplyDialog;
