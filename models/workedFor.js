const Sequelize = require('sequelize');

module.exports = class WorkedFor extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true
            },
            userId: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            companyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            position: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATE,
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
        db.WorkedFor.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'id'
        });
        db.WorkedFor.belongsTo(db.Company, {
            foreignKey: 'companyId',
            targetKey: 'id'
        });
    }
};