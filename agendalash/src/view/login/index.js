import React, { useState } from 'react';
import api from '../../services/api';
import './style.css'

import { useNavigate } from 'react-router-dom';
function Login() {
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação programática


    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Envia os dados de login para o backend
            const response = await api.post('/usuarios/login', {
                telefone,
                senha,
            });
            console.log('Login realizado com sucesso:', response.data.usuario);
    
            // Gerar um token aleatório para a sessão
            const token = generateToken();
    
            // Armazenar o token e os dados do usuário no localStorage
            if (token) {
                localStorage.setItem('token', token); // Armazenando o token aleatório
            }
    
            // Armazenar os dados do usuário no localStorage
            localStorage.setItem('user', JSON.stringify(response.data.usuario)); // Armazenando os dados do usuário
    
            // Redireciona para a página inicial após o login
            navigate('/home');
        } catch (err) {
            setError('Usuário ou senha inválidos.');
            console.error('Erro no login:', err);
        }
    };
    
    // Função para gerar um token aleatório
    const generateToken = () => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0].toString(36);  // Converte o número aleatório para base 36 (alfabético e numérico)
    };
    return (
        <div className='containerLogin'>

        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="tel">Número de Telefone</label>
                    <input
                        type="text"
                        id="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                        placeholder="Digite seu Número de Telefone"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        placeholder="Digite sua senha"
                    />
                </div>
                <button type="submit" className="login-button" >Entrar</button>
                <p className="login-footer">
                    Esqueceu a senha? <a href="/recuperar">Recuperar</a><br/>
                    Não tem cadastro? <a onClick={() =>navigate('/user')}>Criar Cadastro</a>
                </p>
            </form>
        </div>
        </div>
    );
}

export default Login;
