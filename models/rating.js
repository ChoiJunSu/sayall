const Sequelize = require('sequelize');

module.exports = class Rating extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true
            },
            requestId: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            userId: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            objectivity: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            quickness: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            kindness: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Rating',
            tableName: 'rating',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Rating.belongsTo(db.Request, {
            foreignKey: 'requestId',
            targetKey: 'id'
        });
        db.Rating.belongsTo(db.Request, {
            foreignKey: 'userId',
            targetKey: 'receiverId'
        });
    }
};