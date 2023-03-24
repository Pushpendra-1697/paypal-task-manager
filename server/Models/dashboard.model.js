const { Schema, model } = require("mongoose");
const dashboardSchema = new Schema({
    task: String,
    severity: String,
    status: String,
    assign: String
}, {
    versionKey: false
});

const DashboardModel = model('tasks', dashboardSchema);
module.exports = { DashboardModel };