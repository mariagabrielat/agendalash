const { Usuarios } = require('../database/models');  // Importa o modelo de usuário

// Função para criar um novo usuário
const createUser = async (req, res) => {
    try {
        // Captura os dados do corpo da requisição
        const { nome, telefone, tipo, senha } = req.body;

        // Verifica se os dados necessários foram enviados
        if (!nome || !telefone || !tipo || !senha) {
            return res.status(400).json({ error: 'Nome, telefone, tipo e senha são obrigatórios.' });
        }

        // Cria um novo usuário no banco de dados
        const newUser = await Usuarios.create({
            nome,
            telefone,
            tipo,
            senha,
        });

        // Retorna a resposta com o usuário criado
        return res.status(201).json(newUser); // Status 201 para criação bem-sucedida
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Função para editar um usuário
const updateUser = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário da URL
    const { nome, telefone, tipo, senha } = req.body; // Obtém os novos dados do corpo da requisição

    try {
        // Procura o usuário pelo ID
        const user = await Usuarios.findByPk(id);

        // Se o usuário não for encontrado, retorna erro
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Atualiza o usuário com os novos dados
        await user.update({
            nome,
            telefone,
            tipo,
            senha,
        });

        // Retorna o usuário atualizado
        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Função para excluir um usuário
const deleteUser = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário da URL

    try {
        // Procura o usuário pelo ID
        const user = await Usuarios.findByPk(id);

        // Se o usuário não for encontrado, retorna erro
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Exclui o usuário
        await user.destroy();

        // Retorna confirmação de exclusão
        return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Função para visualizar todos os usuários
const getAllUsers = async (req, res) => {
    try {
        // Busca todos os usuários no banco
        const users = await Usuarios.findAll();

        // Se não houver usuários, retorna uma mensagem informando
        if (users.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        }

        // Retorna todos os usuários encontrados
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};


// Função para buscar o nome do usuário pelo ID
const getUserNameById = async (req, res) => {
    try {
        // Recupera o ID do usuário a partir dos parâmetros da requisição
        const { id } = req.params;

        // Busca o usuário pelo ID
        const user = await Usuarios.findOne({ where: { id } });

        // Se o usuário não for encontrado, retorna uma mensagem de erro
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Retorna o nome do usuário
        return res.status(200).json({ nome: user.nome });
    } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};
// Função de login
const login = async (req, res) => {
    const { telefone, senha } = req.body;

    try {
        // Valida se os campos foram enviados
        if (!telefone || !senha) {
            return res.status(400).json({ error: 'Telefone e senha são obrigatórios.' });
        }

        // Busca o usuário pelo telefone e senha
        const usuario = await Usuarios.findOne({
            where: { telefone, senha },
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário ou senha inválidos.' });
        }

        // Retorna os dados do usuário
        return res.status(200).json({
            message: 'Login realizado com sucesso.',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                telefone: usuario.telefone,
                tipo: usuario.tipo,
            },
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};
module.exports = { 
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    login,
    getUserNameById

 };
