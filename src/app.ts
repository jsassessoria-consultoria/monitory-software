import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running fine !!');
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server is running at ${PORT}, open the brownser`)
);
