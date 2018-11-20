const Joi = require('joi');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const data = require('./data');
const validateCourse = require('./validate');

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(data.courses);
});

app.get('/api/courses/:id', (req, res) => {
    
  const course = data.courses.find(item => item.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('nie znaleziono kursu o podanym ID');

  res.send(course);
});


app.post('/api/courses', (req, res) => {

  console.log(req.body.name)

  const { error } = validateCourse(req)
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: data.courses.length + 1,
    name: req.body.name
  };
  data.courses.push(course);
  res.send(course);
});

app.post('/api/courses/:id', (req, res) => {
  res.status(404).send('Nie znaleziono kursu o podanym ID')
})


app.put('/api/courses/:id', (req, res) => {
    
  const course = data.courses.find(item => item.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('Nie znaleziono kursu o podanym ID')

  const { error } = validateCourse(req); // result.error
  if(error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
  const course = data.courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('nie znaleziono kursu o podanym ID');

  const index = data.courses.indexOf(course);
  const deleteItem = data.courses.splice(index, 1);
  
  res.send(deleteItem);
});




app.listen(port, () => {
  console.log(`server started on port ${port}`)
})