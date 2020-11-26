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
            },
            nickname: {
                type: Sequelize.STRING(20),
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
        db.User.hasMany(db.Profile, {
            foreignKey: 'userId',
            sourceKey: 'id'
        });
        User.hasMany(db.Request, {
            foreignKey: 'senderId',
            sourceKey: 'id'
        });
        User.hasMany(db.Request, {
            foreignKey: 'receiverId',
            sourceKey: 'id'
        });
    }
};