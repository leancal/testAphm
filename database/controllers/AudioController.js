//importamos el Modelo
import AudioModel from "../models/AudioModel.js";

//**  Metodos para el CRUD  **//

// Mostrar todos los registros
export const getAllAudio = async (req, res) => {
    try {
        const audio = await AudioModel.findAll(); // Cambiar Audio a AudioModel
        console.log('Audio data:', audio); // Verificar que los datos sean correctos
        res.json(audio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un registro
export const getAudio = async (req, res) => {
    try {
        const audio = await AudioModel.findOne({
            where: { id: req.params.id }
        });
        res.json(audio);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createAudio = async (req, res) => {
    try {
        const audio = await AudioModel.create(req.body);
        res.json(audio);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateAudio = async (req, res) => {
    try {
        const audio = await AudioModel.findOne({
            where: { id: req.params.id }
        });
        await audio.update(req.body); // Cambiar "product" a "audio"
        res.json(audio);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Eliminar un registro
export const deleteAudio = async (req, res) => {
    try {
        await AudioModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.json({ message: error.message });
    }
};
