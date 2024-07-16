//importamos el Modelo
import DiscontinuosModel from "../models/DiscontinuosModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllDiscontinuos = async (req, res) => {
    try {
        const discontinuos = await DiscontinuosModel.findAll(); // Cambiar Audio a AudioModel

        res.json(discontinuos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un registro
export const getDiscontinuo = async (req, res) => {
    try {
        const discontinuos = await DiscontinuosModel.findOne({
            where: { id: req.params.id }
        });
        res.json(discontinuos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createDiscontinuo = async (req, res) => {
    try {
        const discontinuos = await DiscontinuosModel.create(req.body);
        res.json(discontinuos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateDiscontinuo = async (req, res) => {
    try {
        const discontinuos = await DiscontinuosModel.findOne({
            where: { id: req.params.id }
        });
        await discontinuos.update(req.body); // Cambiar "product" a "audio"
        res.json(discontinuos);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteDiscontinuo = async (req, res) => {
    try {
        await DiscontinuosModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
