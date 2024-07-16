//importamos el Modelo
import CooksModel from "../models/CooksModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllCooks = async (req, res) => {
    try {
        const cooks = await CooksModel.findAll();
        res.json(cooks);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getCooks = async (req, res) => {
    try {
        const cooks = await CooksModel.findOne({
            where: { id: req.params.id }
        });
        res.json(cooks);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createCooks = async (req, res) => {
    try {
        const cooks = await CooksModel.create(req.body);
        res.json(cooks);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateCooks = async (req, res) => {
    try {
        const cooks = await CooksModel.findOne({
            where: { id: req.params.id }
        });
        await cooks.update(req.body);
        res.json(cooks);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteCooks = async (req, res) => {
    try {
        await CooksModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};