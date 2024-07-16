import db from '../db.js';
import { DataTypes } from 'sequelize';

const AudioModel = db.define('audio', {
    id: { type: DataTypes.STRING, primaryKey: true },
    sku: { type: DataTypes.STRING },
    longDesc: { type: DataTypes.TEXT },
    shortDesc: { type: DataTypes.TEXT },
    name: { type: DataTypes.STRING },
    img_url: { type: DataTypes.JSON },
    banners: { type: DataTypes.JSON },
    buyLink: { type: DataTypes.STRING },
    driveLink: { type: DataTypes.STRING },
    categories: { type: DataTypes.STRING },
    colors: { type: DataTypes.JSON },
    featuredFeatures: { type: DataTypes.JSON },
    features: { type: DataTypes.JSON },
    includes: { type: DataTypes.JSON },
    line: { type: DataTypes.STRING },
    published: { type: DataTypes.BOOLEAN },
    secondCategories: { type: DataTypes.STRING },
    selectedCollection: { type: DataTypes.STRING },
    thirdsCategories: { type: DataTypes.STRING }
}, {
    tableName: 'audio', // Nombre de la tabla en la base de datos
    timestamps: false,
});


export default AudioModel;
