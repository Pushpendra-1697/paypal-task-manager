const { Router } = require('express');
const dashboardRouter = Router();
const { DashboardModel } = require('../Models/dashboard.model.js');


dashboardRouter.get('/', async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    try {
        if (page) {
            if (Number(page) === 1) {
                let bugs = await DashboardModel.find().skip(0).limit(+limit);
                res.send(bugs);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let bugs = await DashboardModel.find().skip(s).limit(+limit);
                res.send(bugs);
            }
        } else {
            const bugs = await DashboardModel.find();
            res.send(bugs);
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.post('/post', async (req, res) => {
    let payload = req.body;
    try {
        const bugs = new DashboardModel(payload);
        await bugs.save();
        res.status(200).send(bugs);
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
        let bug = await DashboardModel.findOne({ _id: id });
        res.status(200).send(bug);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let bug = await DashboardModel.findByIdAndDelete({ _id: id });
        res.send(bug);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { dashboardRouter };