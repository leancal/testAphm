//importamos el Modelo
import FeaturesModel from "../models/FeaturesModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllFeatures = async (req, res) => {
    try {
        const features = await FeaturesModel.findAll();
        res.json(features);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getFeatures = async (req, res) => {
    try {
        const features = await FeaturesModel.findOne({
            where: { id: req.params.id }
        });
        res.json(features);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createFeatures = async (req, res) => {
    try {
        features = await FeaturesModel.create(req.body);
        res.json(features);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateFeatures = async (req, res) => {
    try {
        const features = await FeaturesModel.findOne({
            where: { id: req.params.id }
        });
        await features.update(req.body); // Cambiar "product" a "audio"
        res.json(features);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteFeatures = async (req, res) => {
    try {
        await FeaturesModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Features eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};