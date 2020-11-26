const Sequelize = require('sequelize');

module.exports = class Request extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true
            },
            senderId: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            receiverId: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            companyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            targetName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            reply: {
                type: Sequelize.TEXT
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Request',
            tableName: 'Request',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Request.belongsTo(db.User, {
            as: 'sender',
            foreignKey: 'senderId',
            targetKey: 'id'
        });
        db.Request.belongsTo(db.User, {
            as: 'receiver',
            foreignKey: 'receiverId',
            targetKey: 'id'
        });
        db.Request.belongsTo(db.Company, {
            foreignKey: 'companyId',
            targetKey: 'id'
        });
    }
};