import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ReplyDialog from './ReplyDialog.js';
import PostDetails from './PostDetails.js';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    }));

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentExpanded: false,
      replyToPostOpen: false, // enter reply text box
      showReplies: false, // result replies
      replies: []
    }

    this.handleContentExpandClick = this.handleContentExpandClick.bind(this);
    this.handleClickOpenReply = this.handleClickOpenReply.bind(this);
    this.handleCloseReply = this.handleCloseReply.bind(this);
    this.handleShowReplies = this.handleShowReplies.bind(this);
    this.handleCloseShowReplies = this.handleCloseShowReplies.bind(this);
  }

  handleContentExpandClick() {
    this.setState({contentExpanded: !this.state.contentExpanded});
  }

  handleClickOpenReply() {
    this.setState({ replyToPostOpen: true });
  };

  handleCloseReply() {
    this.setState({ replyToPostOpen: false });
  };

  async getReplies() {
    this.setState({
      replies: []
    });
    const replyIndices = await this.props.publicSquare.methods.getReplyIndicesOfPost(this.props.id).call();
    for (var i = 0; i < replyIndices.length; i++) {
      const reply = await this.props.publicSquare.methods.getReply(replyIndices[i]).call();
      this.setState({
        replies: [...this.state.replies, reply]
      });
    }
  }

  async handleShowReplies() {
    await this.getReplies();
    this.setState({ showReplies: true });
  }

  handleCloseShowReplies() {
    this.setState({ showReplies: false });
  }

  render() {
    let date = new Intl.DateTimeFormat('en-US',
     { year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit' }).format(this.props.closeTimestamp*1000);
    const closed = new Date().getTime() > this.props.closeTimestamp * 1000;
    return (
        <Card variant="outlined">
            <React.Fragment>
                <CardContent>
                <Typography style={{ wordWrap: "break-word" }} sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                    {this.props.title}
                </Typography>
                <Typography variant="overline" display="block" sx={{ m: 2 }} gutterBottom>
                    Author: {this.props.author}
                </Typography>
                </CardContent>
                <ExpandMore
                expand={this.state.contentExpanded}
                onClick={this.handleContentExpandClick}
                aria-expanded={this.state.contentExpanded}
                aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={this.state.contentExpanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography style={{ wordWrap: "break-word" }}>{this.props.content}</Typography>
                    </CardContent>
                </Collapse>
                <CardActions>
                <Button variant="contained" disabled={!closed} onClick={this.handleShowReplies}>
                  Open
                </Button>
                <PostDetails
                  showReplies={this.state.showReplies}
                  handleCloseShowReplies={this.handleCloseShowReplies}
                  replies={this.state.replies}/>
                <Button variant="contained" disabled={closed} onClick={this.handleClickOpenReply}>Reply</Button>
                <ReplyDialog
                 postId={this.props.id}
                 replyToPostOpen={this.state.replyToPostOpen}
                 handleCloseReply={this.handleCloseReply}
                 replyToPost={this.props.replyToPost}/>
                <Typography variant="overline" display="block" sx={{ m: 2 }} gutterBottom>
                  Close at {date}
                </Typography>
                </CardActions>
            </React.Fragment>
        </Card>
    );
  }
}

export default Post;
