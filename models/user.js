const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            pw: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.User.hasMany(db.WorkedFor, {
            foreignKey: 'userId',
            sourceKey: 'id'
        });
    }
};