import React, { useState } from 'react';
import api from '../../services/api';

import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        // Validação básica para senha e confirmação
        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            // Envia os dados de cadastro para o backend
            await api.post('/usuarios/cadastrar', {
                nome,
                telefone,
                senha,
                tipo: 'cliente', // Define o tipo de usuário como cliente
            });

            alert('Cadastro realizado com sucesso!');
            navigate('/'); // Redireciona para a página de login
        } catch (err) {
            setError('Erro ao cadastrar. Tente novamente.');
            console.error('Erro no cadastro:', err);
        }
    };

    return (
        <div className='containerLogin'>
            <div className="login-container">
                <form className="login-form" onSubmit={handleCadastro}>
                    <h1>Cadastro</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            placeholder="Digite seu Nome Completo"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefone">Número de Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                            placeholder="Digite seu Número de Telefone"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmar-senha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmar-senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                            placeholder="Confirme sua senha"
                        />
                    </div>
                    <button type="submit" className="login-button">Cadastrar</button>
                    <p className="login-footer">
                        Já tem uma conta? <a onClick={()=> navigate('/')}>Faça login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
