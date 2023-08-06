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

const ChatUI = () => {
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState(
    [
      { id: 1, text: "Hi there!", sender: "bot" },
      { id: 3, text: "How can I assist you today?", sender: "bot" },
    ]
  )
  console.log('start', isTyping);
  const handleSend = () => {
    if (input.trim() !== "") {
      console.log("messages before", messages);
      const updatedMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
      setMessages(updatedMessages);
      setInput("");
      console.log("messages after", updatedMessages);
      setIsTyping(true);
      processMessageToChatGPT(updatedMessages);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();

    }
  } 
  const systemMessage = { 
    "role": "system", "content": "Act as if you are my personal therapist and help me improve my mental health."
  }
  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat
    console.log('inside function', chatMessages);
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "bot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.text}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }
    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.REACT_APP_OPENAI,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      console.log(data.choices[0].message.content);
      setMessages([...chatMessages, {
        text: data.choices[0].message.content,
        sender: "bot"
      }]);
      setIsTyping(false);
    });
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
        {isTyping && <Message message={{ id: Date.now(), text: "AI is thinking...", sender: "bot" }} />}
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