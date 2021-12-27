import * as React from 'react';
import Stack from '@mui/material/Stack';
import Post from './Post.js';

class PostGrid extends React.Component {
  render() {
    return (
        <Stack spacing={2} sx={{ m: 2 }}>
            {this.props.posts.map((post, key) => {
                return <Post
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          content={post.content}
                          author={post.author}
                          closeTimestamp={post.closeTimestamp}
                          replyToPost={this.props.replyToPost}
                          publicSquare={this.props.publicSquare}/>
            })}
        </Stack>
    );
  }
}

export default PostGrid;
