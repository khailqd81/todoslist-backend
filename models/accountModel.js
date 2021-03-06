const db = require('./db');
const tableName = "Accounts"
module.exports = {
    getAllAccounts: async () => {
        const accounts = await db.getAll(tableName);
        return accounts
    },

    getAccountByUserName: async (username) => {
        const account = await db.getByValue(tableName, "username", username);
        return account[0];
    },

    getAccountById: async (id) => {
        const account = await db.getByValue(tableName, "account_id", id);
        return account[0];
    },

    addAccount: async (account) => {
        const addAccount = await db.add(tableName, account);
        return addAccount;
    }
}