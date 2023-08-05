import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      messages.push({id: messages.length, text: input, sender: 'user'})
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        if (input.trim() !== "") {
            messages.push({id: messages.length, text: input, sender: 'user'})
            setInput("");
          }

    }
  }

  return (
    <Paper
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size="medium"
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
        
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: isBot ? "primary.light" : "secondary.light",
          borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          maxWidth: '550px'
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;