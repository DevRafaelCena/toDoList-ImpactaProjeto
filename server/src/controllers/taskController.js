const { Task } = require('../db/models'); // Certifique-se de que o modelo Task esteja correto

module.exports = {
  createTask: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          message: 'É necessário informar o título e a descrição da tarefa.',
        });
      }

      //verficar se a tarefa já existe
      const taskExists = await Task.findOne({ where: { title } });

      if (taskExists) {
        return res.status(400).json({ message: 'Já existe uma tarefa com o título informado.' });
      }

      const task = await Task.create({ title, description });

      res.status(201).json(task);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ message: 'Erro ao criar tarefa.' });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      //obter todas as tarefas ordenada por id de forma decrescente
      const tasks = await Task.findAll({ order: [['id', 'DESC']] });
      res.json(tasks);
    } catch (error) {
      console.error('Erro ao obter tarefas:', error);
      res.status(500).json({ message: 'Erro ao obter tarefas.' });
    }
  },

  deleteOneTask: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'É necessário informar o id da tarefa.' });
      }

      //verificar se a tarefa existe
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      await task.destroy();

      res.status(204).end();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      res.status(500).json({ message: 'Erro ao deletar tarefa.' });
    }
  },

  updateOneTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: 'É necessário informar o título e a descrição da tarefa.' });
      }

      if (!id) {
        return res.status(400).json({ message: 'É necessário informar o id da tarefa.' });
      }

      //verificar se a tarefa existe
      let task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      await task.update({ title, description });

      task = await Task.findByPk(id);

      res.status(201).json(task);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
  },

  markTaskAsDone: async (req, res) => {
    try {
      const { id } = req.params;

      console.log('id', id);

      if (!id) {
        return res.status(400).json({ message: 'É necessário informar o id da tarefa.' });
      }

      //verificar se a tarefa existe
      let task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      await task.update({ completedAt: new Date() });

      task = await Task.findByPk(id);

      res.status(201).json(task);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
  },
};
