const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const accountModel = require('../models/accountModel');

exports.signup = async (req, res, next) => {
    if (req.body && req.body.username && req.body.password && req.body.fullname) {
        const account = await accountModel.getAccountByUserName(req.body.username);
        if (account) {
            return res.status(202).json({
                message: "Username đã tồn tại."
            })
        }
        var salt = await bcrypt.genSalt(10);
        var passHash = await bcrypt.hash(req.body.password, salt);
        try {
            const newAccount = {
                username: req.body.username,
                password: passHash,
                fullname: req.body.fullname,
                is_block: false
            }
            await accountModel.addAccount(newAccount);
            return res.status(200).json({
                message: "Đăng ký thành công."
            })
        } catch (error) {
            return res.status(404).json({
                message: "Error add account."
            })
        }
    } else {
        return res.status(202).json({
            message: "Vui lòng điền đủ các trường."
        })
    }
}

exports.signin = async (req, res, next) => {
    if (req.body && req.body.username && req.body.password) {
        const account = await accountModel.getAccountByUserName(req.body.username);
        if (account[0]) {
            const checkPass = await bcrypt.compare(req.body.password, account[0].password);
            if (checkPass) {
                const accessToken = jwt.sign({ id: account[0].account_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                return res.status(200).json({
                    accessToken,
                    fullname: account[0].fullname
                })
            } else {
                return res.status(202).json({
                    message: "Sai mật khẩu."
                })
            }

        } else {
            return res.status(202).json({
                message: "Username không tồn tại."
            })
        }
    } else {
        return res.status(202).json({
            message: "Vui lòng điền đủ các trường."
        })
    }
}

exports.getAllAccounts = async (req, res, next) => {
    const accounts = accountModel.getAllAccounts();
    return res.status(200).json(accounts);
}

exports.getAccountById = async (req, res, next) => {
    if (req.userId) {
        const account = await accountModel.getAccountById(req.userId);
        return res.status(200).json({
            username: account[0].usename,
            fullname: account[0].fullname
        });
    }
    return res.status(202).json({
        message: "Empty request"
    })
}
