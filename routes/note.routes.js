const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('../middlewares/authenticator');
const { NoteModel} = require('../models/NoteModel');
const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get('/', async(req, res) => {
    let token = req.headers.authorization
    jwt.verify(token, 'manish', async(err, decode) => {
        try{
            let data = await NoteModel.find({user:decode.userId})
            res.send({
                data:data,
                message: 'success',
                status: 1
            })
        } catch(err){
            res.send({
                message: err.message,
                status: 0
            })
        }
    })
})

noteRouter.post('/create', async(req, res) => {
    try{
        let note = new NoteModel(req.body);
        await note.save();
        res.send({
            message: 'note created',
            status: 1
        })
    } catch(e){
        res.send({
            message: e.message,
            status: 0
        })
    }
})

noteRouter.patch('/', async(req, res) => {
    let {id} = req.headers
    try{
        await NoteModel.findByIdAndUpdate({_id: id}, req.body)
        res.send({
            message: 'note updated',
            status: 1
        })
    }catch(err){
        res.send({
            message: err.message,
            status: 0
        })
    }
})

noteRouter.delete('/', async(req, res) => {
    let {id} = req.headers
    try{
        await NoteModel.findByIdAndDelete({_id: id})
        res.send({
            message: 'note deleted',
            status: 1
        })
    }catch(err){
        res.send({
            message: err.message,
            status: 0
        })
    }
})


module.exports = {
    noteRouter
}