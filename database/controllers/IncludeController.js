//importamos el Modelo
import IncludeModel from "../models/IncludeModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllInclude = async (req, res) => {
    try {
        const includes = await IncludeModel.findAll();
        res.json(includes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getInclude = async (req, res) => {
    try {
        const includes = await IncludeModel.findOne({
            where: { id: req.params.id }
        });
        res.json(includes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createInclude = async (req, res) => {
    try {
        includes = await IncludeModel.create(req.body);
        res.json(includes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateInclude = async (req, res) => {
    try {
        const includes = await IncludeModel.findOne({
            where: { id: req.params.id }
        });
        await includes.update(req.body); // Cambiar "product" a "audio"
        res.json(includes);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteInclude = async (req, res) => {
    try {
        await IncludeModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Include eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};