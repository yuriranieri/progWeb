const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');

router.post('/', [
	check('nome', 'Nome é campo obrigatório.')
		.trim().escape().notEmpty(),
	check('email', 'E-mail é campo obrigatório.')
		.trim().escape().notEmpty().bail()
		.isEmail().withMessage('E-mail inválido.'),
	check('senha', 'Senha é campo obrigatório.')
		.trim().escape().notEmpty(),
	check('confSenha', 'Confirmar senha é campo obrigatório.')
		.trim().escape().notEmpty().bail()
		.custom((value, { req }) => value === req.body.senha)
		.withMessage('Senhas não conferem.'),
	check('cidade').trim().escape(),
	check('idade', 'Idade deve ser um número inteiro maior ou igual a 0.')
		.trim().escape().optional()
		.isInt({ min: 0}).toInt(),
	check('comentarios').trim().escape(),
	check('sexo').trim().escape(),
	check('termos', 'Você precisa concordar com os termos de uso.')
		.trim().escape().toBoolean().custom(value => value)
], ((req, res) => {
	const erros = validationResult(req);
	const usuario = req.body;

	const contexto = {
		usuario: usuario,
		erros: erros.array()
	};

	if (!erros.isEmpty()) {
		return res.status(422).json(contexto);
	} else {
		return res.json(contexto);
	}
});

module.exports = router;
