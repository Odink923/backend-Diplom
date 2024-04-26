const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const uuid = require("uuid");
const mailService = require('../service/mailService')

const generateJwt = (id,email,role) =>{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController{
    async registration(req,res,next){
        const {email, password,role} =req.body
        if(!email||!password){
            return next(ApiError.badRequest("Incorrect email or password"))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest("User already exist"))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const activationLink = uuid.v4();
        const user = await User.create({email,role,password:hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
        const token = generateJwt(user.id,user.email,user.role);
        return res.json({token})
    }
    async login(req,res, next){
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('incorrect password'))
        }
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})
    }

    async activate(req,res,next){
        try {
            const activationLink = req.params.link;
            const user = await User.findOne({where:{activationLink}})
            if(!user){
                throw ApiError.badRequest('Некоректна силка активації')
            }
            user.isActivated = true;
            await user.save();
            return res.redirect(process.env.CLIENT_URL);
        }catch (e){
            next(e);
        }
    }

    async logout(){

    }


    async check(req,res,next){
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})

    }
}

module.exports = new UserController()