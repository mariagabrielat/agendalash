const { Agendamentos } = require('../database/models');

// Função para criar um novo agendamento
const createAgendamento = async (req, res) => {
    const { dataAg, hora, servico, statusAg, id_usuario } = req.body;
    console.log(dataAg,hora,servico,statusAg, id_usuario)
    try {
        // Validação de dados obrigatórios
       // if (!dataAg || !hora || !servico || !statusAg ||  id_usuario) {
        //    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
       // }

        // Criação do agendamento
        const newAgendamento = await Agendamentos.create({
            dataAg,
            hora,
            servico,
            statusAg,
            id_usuario
        });

        return res.status(201).json(newAgendamento);
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};


// Função para editar um agendamento existente
const updateAgendamento = async (req, res) => {
    const { id } = req.params; // Obtém o ID do agendamento
    const { dataAg, hora, servico, statusAg, idUser } = req.body;

    try {
        // Busca o agendamento pelo ID
        const agendamento = await Agendamentos.findByPk(id);

        if (!agendamento) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }

        // Atualiza o agendamento com os novos dados
        await agendamento.update({
            dataAg,
            hora,
            servico,
            statusAg,
            idUser,
        });

        return res.status(200).json(agendamento);
    } catch (error) {
        console.error('Erro ao editar agendamento:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Função para excluir um agendamento
const deleteAgendamento = async (req, res) => {
    const { id } = req.params; // Obtém o ID do agendamento

    try {
        // Busca o agendamento pelo ID
        const agendamento = await Agendamentos.findByPk(id);

        if (!agendamento) {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }

        // Exclui o agendamento
        await agendamento.destroy();

        return res.status(200).json({ message: 'Agendamento excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};



// Função para buscar todos os agendamentos
const getAllAgendamentos = async (req, res) => {
    try {
        // Busca todos os agendamentos diretamente
        const agendamentos = await Agendamentos.findAll();

        // Verifica se não há registros
        if (agendamentos.length === 0) {
            return res.status(404).json({ message: 'Nenhum agendamento encontrado.' });
        }

        // Retorna os agendamentos encontrados
        return res.status(200).json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};


module.exports = { 
    createAgendamento,
    updateAgendamento,
    deleteAgendamento,
    getAllAgendamentos
 };