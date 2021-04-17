const express = require('express');
const cors = require('cors');
const app = express();

const port = 5000;
const hostName = 'ec2-3-88-201-68.compute-1.amazonaws.com';
const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRouter);

app.listen(port, hostname, () => {
	console.log(`Server is running on port: ${port}`);
});

