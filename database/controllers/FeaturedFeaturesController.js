//importamos el Modelo
import FeaturedFeaturesModel from "../models/FeaturedFeaturesModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllFeaturedFeatures = async (req, res) => {
    try {
        const featuredFeatures = await FeaturedFeaturesModel.findAll();
        res.json(featuredFeatures);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getFeaturedFeatures = async (req, res) => {
    try {
        const featuredFeatures = await FeaturedFeaturesModel.findOne({
            where: { id: req.params.id }
        });
        res.json(featuredFeatures);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createFeaturedFeatures = async (req, res) => {
    try {
        featuredFeatures = await FeaturedFeaturesModel.create(req.body);
        res.json(featuredFeatures);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateFeaturedFeatures = async (req, res) => {
    try {
        const featuredFeatures = await FeaturedFeaturesModel.findOne({
            where: { id: req.params.id }
        });
        await featuredFeatures.update(req.body); // Cambiar "product" a "audio"
        res.json(featuredFeatures);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteFeaturedFeatures = async (req, res) => {
    try {
        await FeaturedFeaturesModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'FeaturedFeatures eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};