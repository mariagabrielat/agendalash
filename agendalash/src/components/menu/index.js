import React from 'react';
import './style.css';

function Menu() {
  // Recupera os dados do usuário armazenados no localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userType = user ? user.tipo : 'cliente'; // Se o tipo não estiver disponível, assume 'cliente'

  return (
    <div className="sidebar">
      <h2>Painel {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
      <nav>
        <ul>
          {/* Condicionalmente renderiza os itens do menu */}
          {userType === 'cliente' && (
            <>
              <li><button className="menu-button">Agendar</button></li>
              <li><button className="menu-button">Meus Agendamentos</button></li>
            </>
          )}

          {(userType === 'funcionario' || userType === 'admin') && (
            <>
              <li><button className="menu-button">Agendamentos</button></li>
              <li><button className="menu-button">Clientes</button></li>
              <li><button className="menu-button">Serviços</button></li>
              <li><button className="menu-button">Funcionários</button></li>
              <li><button className="menu-button">Relatórios</button></li>
              <li><button className="menu-button">Configurações</button></li>
              <li><button className="menu-button">Suporte</button></li>
            </>
          )}

          <li><button className="menu-button">Sair</button></li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
