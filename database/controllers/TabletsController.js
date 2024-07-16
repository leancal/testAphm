//importamos el Modelo
import TabletsModel from "../models/TabletsModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllTablet = async (req, res) => {
    try {
        const tablet = await TabletsModel.findAll();
        res.json(tablet);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getTablet = async (req, res) => {
    try {
        const tablet = await TabletsModel.findOne({
            where: { id: req.params.id }
        });
        res.json(tablet);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createTablet = async (req, res) => {
    try {
        const tablet = await TabletsModel.create(req.body);
        res.json(tablet);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateTablet = async (req, res) => {
    try {
        const tablet = await TabletsModel.findOne({
            where: { id: req.params.id }
        });
        await tablet.update(req.body); // Cambiar "product" a "audio"
        res.json(tablet);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteTablet = async (req, res) => {
    try {
        await TabletsModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};