import React from 'react';
import './App.css';
import PostGrid from './components/PostGrid.js';
import CreatePostDialog from './components/CreatePostDialog.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import initWeb3 from './components/web3.js';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PublicSquareABI from './abis/PublicSquare.js';

// import Web3 from 'web3';
class App extends React.Component {
  async componentWillMount() {
    window.web3 = await initWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    try {
      const publicSquare = new web3.eth.Contract(
          PublicSquareABI,
          // "0xA0C456E4F79d52573c89b7332d73C39580EBc550" // localhost
          "0x03707134B800BD716f094e5C88Ab721Efde8b8B9" // Kovan
      );
      this.setState({ publicSquare:  publicSquare});
      const postCount = await publicSquare.methods.postCount().call();
      this.setState({ postCount: postCount });
      // Load Posts
      for (var i = 0; i < postCount; i++) {
        const post = await publicSquare.methods.posts(i).call();
        this.setState({
          posts: [...this.state.posts, post]
        });
      }
      // Sort posts. Nearest close time
      this.setState({
        posts: this.state.posts.sort((a,b) => a.closeTimestamp - b.closeTimestamp )
      });
      this.setState({ loading: false});
    } catch (err) {
        window.alert(`PublicSquare contract is only deployed on Kovan testnet.\n\n${err}`);
    }
  }

  createPost(title, content, hoursBeforeClose) {
    this.setState({ loading: true });
    this.state.publicSquare.methods.createPost(title, content, hoursBeforeClose).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
    .on("error", function (error) {
        alert(error);
        window.location.reload();
    });
    this.handleClose();
  }

  replyToPost(postId, content) {
    this.setState({ loading: true });
    this.state.publicSquare.methods.replyToPost(postId, content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false });
    })
    .on("error", function (error) {
        alert(error);
    });
  }


  handleClickOpen() {
    this.setState({ createPostOpen: true });
  };

  handleClose() {
    this.setState({ createPostOpen: false });
  };

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      publicSquare: null,
      postCount: 0,
      posts: [],
      loading: true,
      createPostOpen: false
    }
    this.createPost = this.createPost.bind(this);
    this.replyToPost = this.replyToPost.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Stack direction="row" spacing={5}>
            <Typography variant="h4">Public Square</Typography>
            <Button variant="contained" onClick={this.handleClickOpen}>Create Post</Button>
            <Typography variant="h4">{this.state.postCount} Posted</Typography>
            <CreatePostDialog
              createPostOpen={this.state.createPostOpen}
              handleClose={this.handleClose}
              createPost={this.createPost}/>
          </Stack>
        </header>
        <body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
            <Stack spacing={2} direction="column" sx={{ m: 2 }}>
              <Card style={{ backgroundColor: "#99a4aa" }}>
                  <React.Fragment>
                      <CardContent align="left">
                        <Typography style={{ wordWrap: "break-word" }} color="text.secondary">
                        This is a “reddit”-like site with backend smart contract running on Ethereum. <b>You can create posts, reply to other people’s posts.</b><br />
                          A few things to note:<br />
                          &nbsp;&nbsp;1. Posts will show up instantly. But you will be setting <b># of HOURS BEFORE CLOSE</b> on your posts.
                            People can reply to your posts before close time. And the replies will only be accessible after the close time.
                             So no one influences other people’s thoughts.<br />
                          &nbsp;&nbsp;2. You’ll be paying gas fees to post and reply, fees vary depending on the content.<br />
                          &nbsp;&nbsp;3. This is a learning project, could potentially break in unexpected ways. Play at your own risk. You can contact me if you wish.
                        </Typography>
                        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
                          <Typography variant="overline" display="block" color="common.white">
                            <a href="https://twitter.com/Cashmeregoat21">DM @Cashmeregoat21</a>
                          </Typography>
                          <Typography variant="overline" display="block" color="common.white">
                          <a href="mailto:cashmeregoat21@protonmail.com">E-Mail to cashmeregoat21@</a>
                          </Typography>
                        </Stack>
                      </CardContent>
                      </React.Fragment>
                  </Card>
                <PostGrid posts={this.state.posts}
                          replyToPost={this.replyToPost}
                          publicSquare={this.state.publicSquare}/>
              </Stack>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
