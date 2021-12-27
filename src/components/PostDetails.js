import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

class PostDetails extends React.Component {
    render() {
      return (
        <Dialog
         open={this.props.showReplies}
         onClose={this.props.handleCloseShowReplies}
         fullWidth
         maxWidth="lg">
          <DialogTitle>Replies for this post</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ width: '95%', m: 2}}>
              {this.props.replies.map((reply, key) => {
                  return (
                    <Card>
                      <React.Fragment>
                        <CardContent>
                          <Typography style={{ wordWrap: "break-word" }} sx={{ fontSize: 20 }} color="text.secondary" paragraph>
                              {reply.content}
                          </Typography>
                          <Typography style={{ wordWrap: "break-word" }} variant="overline" inline gutterBottom>
                              Author: {reply.author}
                          </Typography>
                        </CardContent>
                      </React.Fragment>
                    </Card>
                  )
              })}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseShowReplies}>Close</Button>
          </DialogActions>
        </Dialog>
      );
    }
}

export default PostDetails;
