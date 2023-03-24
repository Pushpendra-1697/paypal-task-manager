const { Router } = require('express');
const dashboardRouter = Router();
const { DashboardModel } = require('../Models/dashboard.model.js');


dashboardRouter.get('/', async (req, res) => {
    let { page = 1, limit = 20 } = req.query;
    try {
        if (page) {
            if (Number(page) === 1) {
                let tasks = await DashboardModel.find().skip(0).limit(+limit);
                res.send(tasks);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let tasks = await DashboardModel.find().skip(s).limit(+limit);
                res.send(tasks);
            }
        } else {
            const tasks = await DashboardModel.find();
            res.send(tasks);
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.post('/post', async (req, res) => {
    let payload = req.body;
    try {
        const tasks = new DashboardModel(payload);
        await tasks.save();
        res.status(200).send(tasks);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.patch('/patch/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await DashboardModel.findByIdAndUpdate({ _id: id }, payload);
        let task = await DashboardModel.findOne({ _id: id });
        res.status(200).send(task);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.patch('/assignee/patch/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await DashboardModel.findByIdAndUpdate({ _id: id }, payload);
        let task = await DashboardModel.findOne({ _id: id });
        res.status(200).send(task);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let task = await DashboardModel.findByIdAndDelete({ _id: id });
        res.send(task);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { dashboardRouter };