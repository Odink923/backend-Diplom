const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',
    {
        id: {type: DataTypes.INTEGER,primaryKey:true, autoIncrement: true},
        email:{type: DataTypes.STRING, unique:true,},
        password:{type: DataTypes.STRING},
        isActivated:{type:DataTypes.STRING,default:false},
        activationLink: {type: DataTypes.STRING},
        role:{type: DataTypes.STRING, defaultValue:"USER"},
    })
const UserInfo = sequelize.define('userInfo',
    {
        id: {type: DataTypes.INTEGER,primaryKey:true, autoIncrement: true},
        name:{type: DataTypes.STRING, unique:true,},
        number:{type: DataTypes.INTEGER},
        date:{type:DataTypes.DATE},
        yearGetHurt: {type: DataTypes.DATE},
        message:{type: DataTypes.STRING},
    })

const Token = sequelize.define('token', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const Appointment = sequelize.define('appointment',
    {
        id: {type: DataTypes.INTEGER,primaryKey:true, autoIncrement: true},
        name: {type:DataTypes.STRING, allowNull:false},
        date:{type:DataTypes.DATE,unique: true, allowNull:false},
        place:{type:DataTypes.STRING, allowNull:false},
        state:{type:DataTypes.STRING, allowNull:false},
    })
const Type = sequelize.define('type',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    name:{type: DataTypes.STRING, unique:true, allowNull:false},
})

const Activity = sequelize.define('activity',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    name:{type: DataTypes.STRING, unique:true, allowNull:false},
})

const AppointmentInfo = sequelize.define('appointment_info',{
    id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
    title:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false},
})

const TypeActivity = sequelize.define('type_activity',{
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})



User.hasMany(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(Appointment)
Appointment.belongsTo(User)

User.hasMany(Token, { as: 'tokens' });
Token.belongsTo(User);

Type.hasMany(Appointment)
Appointment.belongsTo(Type)

Activity.hasMany(Appointment)
Appointment.belongsTo(Activity)


Appointment.hasMany(AppointmentInfo,{as:'info'})
AppointmentInfo.belongsTo(Appointment)

Type.belongsToMany(Activity, {through: TypeActivity })
Activity.belongsToMany(Type, {through: TypeActivity })

module.exports={
    Token,
    User,
    UserInfo,
    Appointment,
    Type,
    Activity,
    TypeActivity,
    AppointmentInfo
}
