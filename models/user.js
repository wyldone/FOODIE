

module.exports = function (sequelize, DataTypes) { 
    let User = sequelize.define("User", { 
        name: DataTypes.STRING, 
        email: DataTypes.STRING 
    }); 
    return User; 
};
