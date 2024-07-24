import React, { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Card, CardActions, CardContent, Container, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { BASE_URL } from './helper';
interface Todo {
  _id?: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done"
}
function App() {
  const [state, setState] = useState<Todo>({
    title: "", description: "", status: "To Do"
  })
  const [todo, setTodo] = useState<Todo[]>([])
  const [isUpdate, setIsUpdate] = useState<string | undefined>(undefined)
  const getAllCruds = async () => {
    const resp = await fetch(BASE_URL + "/get", {})
    const result = await resp.json();
    setTodo(result.todo)
    setIsUpdate(undefined);
    setState({
      title: "", description: "", status: "To Do"
    })
  }
  const addTodo = async (event: any) => {
    event.preventDefault();
    let headersList = {
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "title": state.title,
      "description": state.description,
      "status": state.status
    });

    let response = await fetch(BASE_URL + "/add", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    const result = await response.json();
    getAllCruds()
  }
  const updateTodo = async (event: any) => {
    event.preventDefault();
    let headersList = {
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "_id": isUpdate,
      "title": state.title,
      "description": state.description,
      "status": state.status
    });

    let response = await fetch(BASE_URL + "/update", {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });
    await response.json();
    getAllCruds()
  }
  const handleUpdate = (item: Todo) => {
    setIsUpdate(item._id);
    setState(item)
  }

  const deleteTodo = async (id:string) => {
    let headersList = {
      "Content-Type": "application/json"
    }
    let response = await fetch(BASE_URL + "/delete", {
      method: "DELETE",
      body: JSON.stringify({_id:id}),
      headers: headersList
    });
    await response.json();
    getAllCruds()
  }
  useEffect(() => {
    getAllCruds()
  }, []);

  const handleChangeInputValue = (name: string, value: string) => {
    setState({ ...state, [name]: value })
  }
  return (
    <Box>
      <Container maxWidth="lg" >
        <form onSubmit={(event) => isUpdate ? updateTodo(event) : addTodo(event)}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TextField sx={{ mx: 2 }} label="title" variant="filled" name='title' value={state.title} onChange={(even) => handleChangeInputValue(even.target.name, even.target.value)} />

            <TextField label="description" variant="filled" name='description' value={state.description} onChange={(even) => handleChangeInputValue(even.target.name, even.target.value)} />

            <Select
              sx={{ mx: 2 }}
              value={state.status}
              name='status' label="status"
              variant="filled"
              onChange={(even) => handleChangeInputValue(even.target.name, even.target.value)}
            >
              <MenuItem value={"To Do"}>To Do</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Done"}>Done</MenuItem>
            </Select>
            <Button type='submit' onClick={(event) => isUpdate ? updateTodo(event) : addTodo(event)}>{isUpdate ? "update" : "submit"}</Button>
          </Box>
        </form>
        <Box my={3}>
          <Grid container spacing={2}>
            {
              todo.length > 0 && todo.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} lg={4} md={4} >
                  <Card sx={{ minWidth: "100%" }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.status}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={()=>deleteTodo(item._id??'')}>Delete</Button>
                      <Button size="small" onClick={() => handleUpdate(item)}>Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
