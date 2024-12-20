const db = require('../database/database');

const createAccount = (req, res) => {
  const { cpf, email, celular, senha } = req.body;
  const user_id = req.user.id;

  if (!cpf || !email || !celular || !senha) {
    return res.status(400).json({ error: 'CPF, email, celular e senha são obrigatórios' });
  }

  const query = `INSERT INTO accounts (user_id, cpf, email, celular, senha) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [user_id, cpf, email, celular, senha], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, user_id, cpf, email });
  });
};

const getAccounts = (req, res) => {
  const { user_id } = req.query;

  db.all('SELECT id, cpf, email, celular, senha, created_at FROM accounts WHERE user_id = ?', [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
};

const getAccountById = (req, res) => {
  const { id } = req.params;

  db.all('SELECT id, cpf, email, celular, senha, created_at FROM accounts WHERE id = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    res.json(rows[0]);
  });
};

const deleteAccount = (req, res) => {
  const accountId = req.params.id;
  const userId = req.query.user_id;

  if (parseInt(userId) !== req.user.id) {
    return res.status(403).json({ error: 'Você não tem permissão para excluir esta conta' });
  }

  const query = 'DELETE FROM accounts WHERE id = ? AND user_id = ?';
  
  db.run(query, [accountId, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Conta não encontrada ou você não tem permissão para excluí-la' });
    }

    res.status(200).json({ message: 'Conta excluída com sucesso' });
  });
};

const updateAccount = (req, res) => {
    const { id } = req.params;
    const { cpf, email, celular, senha } = req.body;
  
    // Verificar se os dados foram passados corretamente
    if (!cpf || !email || !celular || !senha) {
      return res.status(400).json({ error: 'Todos os campos (cpf, email, celular, senha) são obrigatórios' });
    }
  
    // Query para atualizar os dados da conta
    const query = `UPDATE accounts SET cpf = ?, email = ?, celular = ?, senha = ? WHERE id = ? AND user_id = ?`;
    db.run(query, [cpf, email, celular, senha, id, req.user.id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Conta não encontrada ou você não tem permissão para atualizá-la' });
      }
  
      res.status(200).json({ message: 'Conta atualizada com sucesso' });
    });
  };
module.exports = { createAccount, getAccounts, getAccountById, deleteAccount, updateAccount };
