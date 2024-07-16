//importamos el Modelo
import NotebooksModel from "../models/NotebooksModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllNotebooks = async (req, res) => {
    try {
        const notebook = await NotebooksModel.findAll();
        res.json(notebook);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getNotebooks = async (req, res) => {
    try {
        const notebook = await NotebooksModel.findOne({
            where: { id: req.params.id }
        });
        res.json(notebook);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createNotebooks = async (req, res) => {
    try {
        const notebook = await NotebooksModel.create(req.body);
        res.json(notebook);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateNotebooks = async (req, res) => {
    try {
        const notebook = await NotebooksModel.findOne({
            where: { id: req.params.id }
        });
        await notebook.update(req.body); // Cambiar "product" a "audio"
        res.json(notebook);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteNotebooks = async (req, res) => {
    try {
        await NotebooksModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};