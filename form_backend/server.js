const express = require('express');
const cors = require('cors');
const app = express();

const port = 5000;
const hostName = 'ec2-54-196-186-91.compute-1.amazonaws.com';
const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRouter);

app.listen(port, hostname, () => {
	console.log(`Server is running on port: ${port}`);
});

