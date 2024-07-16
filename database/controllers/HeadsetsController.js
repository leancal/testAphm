//importamos el Modelo
import HeadsetsModel from "../models/HeadsetsModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllHeadsets = async (req, res) => {
    try {
        const headsets = await HeadsetsModel.findAll();
        res.status(200).json(headsets);
    } catch (error) {
        console.error('Error al obtener headsets:', error);
        res.status(500).json({ message: 'Error al obtener headsets' });
    }
};

// Mostrar un registro
export const getHeadsets = async (req, res) => {
    try {
        const headsets = await HeadsetsModel.findOne({
            where: { id: req.params.id }
        });
        res.json(headsets);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createHeadsets = async (req, res) => {
    try {
        const headsets = await HeadsetsModel.create(req.body);
        res.json(headsets);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateHeadsets = async (req, res) => {
    try {
        const headsets = await HeadsetsModel.findOne({
            where: { id: req.params.id }
        });
        await headsets.update(req.body);
        res.json(headsets);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteHeadsets = async (req, res) => {
    try {
        await HeadsetsModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};