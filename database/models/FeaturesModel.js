import db from '../db.js';
import { DataTypes } from 'sequelize';

const FeaturesModel = db.define('features', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING }
}, {
    tableName: 'features',
    timestamps: false,
});

export default FeaturesModel;
