import db from '../db.js';
import { DataTypes } from 'sequelize';

const FeaturedFeaturesModel = db.define('featuredFeatures', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT }, // Cambiado a DataTypes.TEXT para descripciones más largas
    imgUrl: { type: DataTypes.STRING }
}, {
    tableName: 'featuredFeatures',
    timestamps: false,
});

export default FeaturedFeaturesModel;
