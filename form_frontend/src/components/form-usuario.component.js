import React, { Component } from 'react';
import axios from 'axios';

export default class FormUsuario extends Component {
    constructor(props) {
        super(props);

        this.backendUrl = 'ec2-3-88-201-68.compute-1.amazonaws.com:5000/usuarios';
        this.baseState = {
            nome: '',
            email: '',
            senha: '',
            confSenha: '',
            cidade: '',
            idade: '',
            comentarios: '',
            sexo: '',
            termos: false,
            cidades: [
                { value: 1, label: "Florianópolis" },
                { value: 2, label: "São José" },
                { value: 99, label: "Outro" }
            ],
            sexos: [
                { value: 'm', label: "Masculino" },
                { value: 'f', label: "Feminino" },
                { value: 'o', label: "Outro" }
            ],
            contexto: {}
        }
        this.state = this.baseState;

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSenha = this.onChangeSenha.bind(this);
        this.onChangeConfSenha = this.onChangeConfSenha.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.onChangeIdade = this.onChangeIdade.bind(this);
        this.onChangeComentarios = this.onChangeComentarios.bind(this);
        this.onChangeSexo = this.onChangeSexo.bind(this);
        this.onChangeTermos = this.onChangeTermos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onChangeNome(e) {
        this.setState({ nome: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeSenha(e) {
        this.setState({ senha: e.target.value })
    }

    onChangeConfSenha(e) {
        this.setState({ confSenha: e.target.value })
    }

    onChangeCidade(e) {
        this.setState({ cidade: e.target.value })
    }

    onChangeIdade(e) {
        this.setState({ idade: e.target.value })
    }

    onChangeComentarios(e) {
        this.setState({ comentarios: e.target.value })
    }

    onChangeSexo(e) {
        this.setState({ sexo: e.target.value })
    }

    onChangeTermos(e) {
        this.setState({ termos: e.target.value })
    }

    onReset(e) {
        this.setState(this.baseState);
    }

    onSubmit(e) {
        e.preventDefault();

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            confSenha: this.state.confSenha,
            cidade: this.state.cidade,
            idade: this.state.idade,
            comentarios: this.state.comentarios,
            sexo: this.state.sexo,
            termos: this.state.termos
        };

        axios.post(this.backendUrl, usuario)
            .then(res => this.setState({ contexto: res.data }))
            .catch(erro => this.setState({ contexto: erro.response.data }));

        this.setState(this.baseState);
    }

    render() {
        const contexto = this.state.contexto;
        let erros = [];
        if (contexto.erros) {
            erros = contexto.erros.map(
                (erro, idx) => (
                    <li key={idx}>{erro.msg}</li>));
        }
        let usuario = [];
        if (contexto.usuario) {
            usuario = [
                (<li key='1'>
                    <b>Nome:</b> {contexto.usuario.nome}
                </li>),
                (<li key='2'>
                    <b>E-mail:</b> {contexto.usuario.email}
                </li>),
                (<li key='3'>
                    <b>Senha:</b> {contexto.usuario.senha}
                </li>),
                (<li key='4'>
                    <b>Confirmar senha:</b> {contexto.usuario.confSenha}
                </li>),
                (<li key='5'>
                    <b>Cidade:</b> {contexto.usuario.cidade}
                </li>),
                (<li key='6'>
                    <b>Idade:</b> {contexto.usuario.idade}
                </li>),
                (<li key='7'>
                    <b>Comentários:</b> {contexto.usuario.comentarios}
                </li>),
                (<li key='8'>
                    <b>Sexo:</b> {contexto.usuario.sexo}
                </li>),
                (<li key='9'>
                    <b>Termos:</b> {contexto.usuario.termos.toString()}
                </li>)

            ]
        }

        return (
            <>
                <h1>
                    Manipulando formulários com Node.js, Express e React
                           </h1>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Novo Usuário</legend>
                               Nome: *<br />
                        <input type="text" value={this.state.nome}
                            onChange={this.onChangeNome} /><br />
                               E-mail: *<br />
                        <input type="text" value={this.state.email}
                            onChange={this.onChangeEmail} /><br />
                               Senha: *<br />
                        <input type="password" value={this.state.senha}
                            onChange={this.onChangeSenha} /><br />
                               Confirmar senha: *<br />
                        <input type="password" value={this.state.confSenha}
                            onChange={this.onChangeConfSenha} /><br />
                               Cidade:<br />
                        <select value={this.state.cidade}
                            onChange={this.onChangeCidade}>
                            <option value="-1">--Selecione</option>
                            {
                                this.state.cidades.map(obj => {
                                    return (<option key={obj.value}
                                        value={obj.value}>{obj.label}</option>);
                                })
                            }
                        </select><br />
                               Idade:<br />
                        <input type="text" value={this.state.idade}
                            onChange={this.onChangeIdade} /><br />
                               Comentários:<br />
                        <textarea value={this.state.comentarios}
                            onChange={this.onChangeComentarios}
                            rows="4" cols="30">
                        </textarea><br />
                               Sexo:<br />
                        {
                            this.state.sexos.map((obj, idx) => {
                                return (<React.Fragment key={idx}>
                                    <input type="radio" name="sexo"
                                        checked={this.state.sexo === obj.value}
                                        value={obj.value}
                                        onChange={this.onChangeSexo} />
                                    {obj.label}
                                </React.Fragment>);
                            })
                        }
                        <br />
                        <br />
                        <input type="checkbox" checked={this.state.termos}
                            onChange={this.onChangeTermos} />
                                        Concordo com os termos de uso *
                                <br />
                        <hr />
                        <input type="submit" value="Enviar" />
                        <input type="button" value="Limpar"
                            onClick={this.onReset} />
                                * Campos obrigatórios
                             </fieldset>
                </form>
                {
                    contexto.erros && <ul>{erros}</ul>
                }

                <h2>Dados recebidos:</h2>
                {contexto.usuario && <ul>{usuario}</ul>}
            </>
        );
    }
}
