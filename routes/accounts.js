const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/', accountController.createAccount);
router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccountById);
router.delete('/:id', accountController.deleteAccount);
router.put('/:id', accountController.updateAccount);

module.exports = router;
