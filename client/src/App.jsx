import { useState } from 'react';
import logo from './assets/download.png'
import {Modal, Typography, Box, TextField, LinearProgress} from '@mui/material';
import axios from "axios";
import GPTResponse from './components/GPTResponse';
function App() {
const [open, setOpen]=useState(false);
const [prompt, setPrompt]=useState("");
const [response, setResponse]= useState("");
const [loading, setLoading]=useState(false);
const handleOpen = () =>{
  setOpen(true);
}
const handleClose = () =>{
  setOpen(true);
}

const handleSubmit=async(e)=>{
e.preventDefault();
setResponse("");
setLoading(true);
const res=await axios.post("http://localhost:3000/chat", {prompt: prompt});
setResponse(res);
setLoading(false);

}
  return (
    <div className="app">
      <img src={logo}/>
      <button onClick={handleOpen} className='btn'>Ask me Anything</button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  className="chatgpt-modal"
>
  <Box className="container">
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Start asking me questions!
    </Typography>
    <form style={{display: 'flex', flexDirection: "column", alignItems: "center"}} onSubmit={(e)=>{handleSubmit(e)}}>
      <TextField value={prompt} onChange={(e)=> setPrompt(e.target.value)}id="outlined-basic" label="Query" variant="outlined" sx={{margin: "15px 0px", width: "100%"}}/>
      <button type="submit" className="btn">Submit</button>
    </form>
    {loading && <LinearProgress sx={{margin: "20px 0"}}/>}
    {response && <GPTResponse response={response} />}
  </Box>
</Modal>
    </div>

  )
}

export default App
