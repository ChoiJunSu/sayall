const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Company',
            tableName: 'company',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Company.hasMany(db.Profile, {
            foreignKey: 'companyId',
            sourceKey: 'id'
        });
        db.Company.hasMany(db.Request, {
            foreignKey: 'companyId',
            sourceKey: 'id'
        });
    }
};