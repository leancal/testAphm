import db from '../db.js';
import { DataTypes } from 'sequelize';

const IncludesModel = db.define('includes', {
    id: { type: DataTypes.STRING, primaryKey: true },
    img: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING }
}, {
    tableName: 'includes',
    timestamps: false
});

export default IncludesModel;
