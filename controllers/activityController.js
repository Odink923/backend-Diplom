const {Activity} = require("../models/models");
class ActivityController {
    async create(req,res){
        const {name} = req.body
        const activity = await Activity.create({name})
        return res.json(activity)
    }
    async getAll(req,res){
        const activity = await Activity.findAll()
        return res.json(activity)
    }

}

module.exports = new ActivityController()