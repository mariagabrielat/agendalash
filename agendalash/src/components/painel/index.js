import React, { useState, useEffect } from 'react';
import './style.css';
import api from '../../services/api'; // Supondo que sua instância API esteja aqui

function Painel() {
  // Estado para armazenar os agendamentos
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [userType, setUserType] = useState('');
  const [servicos, setServicos] = useState([
                                            'Extensão de Cílios Clássica - R$150,00',
                                            'Extensão de Cílios Volume Russo - R$250,00',
                                            'Manutenção - R$70,00',
                                            'Remoção de Cílios - R$66,00'
                                              //Colocar os serviços aqui!!
                                           ]); // Estado para armazenar os serviços disponíveis

  const [selectedServico, setSelectedServico] = useState({}); // Serviço selecionado por horário

  // Recuperando dados do usuário
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Definir os horários de 8h às 18h
  const horarios = Array.from({ length: 11 }, (_, i) => {
    const hour = 8 + i;
    return `${hour < 10 ? '0' : ''}${hour}:00`; // Formatação para 08:00, 09:00, etc.
  });

  // Verificando o tipo de usuário
  useEffect(() => {
    if (user) {
      setUserType(user.tipo); // tipo pode ser 'cliente', 'funcionario', 'admin'
    }
  }, [user]);

  // Definir a data de hoje apenas se não houver uma data selecionada previamente
  useEffect(() => {
    if (!selectedDate) {
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today); // Atualiza apenas na primeira renderização
    }
  }, []); // Só vai rodar na montagem inicial do componente

  // Função para buscar os agendamentos do backend para o dia selecionado
  const fetchAgendamentos = async (date) => {
    try {
      const response = await api.get(`/agendamentos/lista`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtra os agendamentos para a data selecionada
      const agendamentosDoDia = response.data.filter(agendamento => agendamento.dataAg === date);
      console.log(agendamentosDoDia);

      if (agendamentosDoDia.length > 0) {
        // Caso haja agendamentos, busca o nome do cliente e formata a hora
        const agendamentosComNomeCliente = await Promise.all(agendamentosDoDia.map(async (agendamento) => {
          const horaFormatada = agendamento.hora.split(':').slice(0, 2).join(':'); // Remove os segundos
          const nomeCliente = await fetchNomeCliente(agendamento.id_usuario); // Busca o nome do cliente
          return { ...agendamento, nome_cliente: nomeCliente, hora: horaFormatada };
        }));

        setAgendamentos(agendamentosComNomeCliente);
      } else {
        // Se não houver agendamentos, exibe os horários disponíveis
        setAgendamentos([]); // Define uma lista vazia para mostrar todos os horários disponíveis
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const fetchNomeCliente = async (idUsuario) => {
    try {
      const response = await api.get(`/usuarios/getUsuarios/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      return response.data.nome; // ou o campo correto que tenha o nome do usuário
    } catch (error) {
      console.error('Erro ao buscar nome do cliente:', error);
    }
  };

  // Chama o backend para criar um novo agendamento
  const createAgendamento = async (horario) => {
    if (userType !== 'cliente') return; // Apenas cliente pode agendar
    const servicoEscolhido = selectedServico[horario]; // Pega o serviço selecionado para o horário

    if (!servicoEscolhido) {
      alert('Por favor, selecione um serviço para o horário!');
      return;
    }

    try {
      console.log(selectedDate, horario, user.id, servicoEscolhido)
      const response = await api.post('/agendamentos/agendar', {
        dataAg: selectedDate,
        hora: horario,
        id_usuario: user.id,
        servico: servicoEscolhido, // Envia o serviço selecionado
        statusAg: 'Reservado'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgendamentos(prev => [...prev, response.data]);
      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  };

  // Função para mudar a data
  const changeDay = (delta) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + delta);
    const newDateString = newDate.toISOString().split('T')[0]; // Converte para 'YYYY-MM-DD'
    setSelectedDate(newDateString); // Atualiza o estado com a nova data
  };

  // Função para buscar os agendamentos do backend para o dia selecionado
  useEffect(() => {
    if (selectedDate) {
      fetchAgendamentos(selectedDate); // Recarrega os agendamentos ao alterar a data
    }
  }, [selectedDate]); // Vai ser chamada quando a data for alterada

  // Função para editar um agendamento (admin)
  const handleEdit = async (agendamento) => {
    try {
      const response = await api.put(`/agendamentos/editar/${agendamento.id}`, {
        statusAg: agendamento.statusAg === 'Disponível' ? 'Agendado' : 'Disponível'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgendamentos(prev => prev.map(a => a.id === agendamento.id ? response.data : a));
    } catch (error) {
      console.error('Erro ao editar agendamento:', error);
    }
  };

  // Função para deletar um agendamento (admin)
  const handleDelete = async (id) => {
    try {
      await api.delete(`/agendamentos/deletar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgendamentos(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
    }
  };

  return (
    <main className="content">
      <header>
        <h1>Painel de Agendamentos</h1>
        <p>Gerencie seus agendamentos diários</p>
      </header>

      <div className="schedule-navigation">
        <button onClick={() => changeDay(-1)}>&#9664; Dia Anterior</button>
        <span id="current-date">{selectedDate}</span>
        <div className="date-picker">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)} // Atualiza a data ao selecionar
          />
        </div>
        <button onClick={() => changeDay(1)}>Próximo Dia &#9654;</button>
      </div>

      <section className="schedule-table">
        <table>
          <thead>
            <tr>
              <th>Horários</th>
              {userType === 'admin' && <th>Cliente</th>}
              <th>Status</th>
              <th>Serviço</th>
              {userType === 'admin' && <th>Ações</th>}
              {userType === 'cliente' && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => {
              // Verifica o status do agendamento para o horário específico
              const agendamentoExistente = agendamentos.find(a => a.hora === horario);
              const status = agendamentoExistente ? agendamentoExistente.statusAg : 'Disponível';
              const servico = agendamentoExistente ? agendamentoExistente.servico : '';
              const nomeCliente = agendamentoExistente ? agendamentoExistente.nome_cliente : ''; // Exibindo o nome do cliente

              return (
                <tr key={horario}>
                  <td>{horario}</td>
                  {userType === 'admin' && <td>{nomeCliente}</td>}

                  <td>{status}</td>
                  <td>
                    {status === 'Disponível' && (
                      <select
                        onChange={(e) => setSelectedServico(prev => ({ ...prev, [horario]: e.target.value }))}
                        value={selectedServico[horario] || ''}
                      >
                        <option value="">Selecione um serviço</option>
                        {servicos.map((servico) => (
                          <option key={servico} value={servico}>{servico}</option>
                        ))}
                      </select>
                    )}
                    {status !== 'Disponível' && <span>{servico}</span>}
                  </td>
                  {userType === 'admin' && (
                    <>
                      <td>
                        <button onClick={() => handleEdit(agendamentoExistente)}>
                          {status === 'Disponível' ? 'Agendar' : 'Cancelar'}
                        </button>
                      </td>

                    </>
                  )}
                  {userType === 'cliente' && status === 'Disponível' && (
                    <td>
                      <button onClick={() => createAgendamento(horario)}>Agendar</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Painel;
