import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const FeaturedFeaturesForm = ({ selectedFeaturedFeatures, setSelectedFeaturedFeatures, dbFeaturedFeatures, setDbFeaturedFeatures }) => {
    const [newFeaturedFeature, setNewFeaturedFeature] = useState({ id: '', name: '', imgUrl: '', desc: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState('');
    const [selectedExistingFeaturedFeatures, setSelectedExistingFeaturedFeatures] = useState([]);

    const handleAddNewFeaturedFeature = async () => {
        try {
            // Envía una solicitud HTTP POST al backend para agregar la nueva característica destacada a la base de datos
            const response = await axios.post('http://localhost:8000/featuredFeatures', newFeaturedFeature);

            // Actualiza el estado de las características destacadas después de agregar la nueva
            setDbFeaturedFeatures([...dbFeaturedFeatures, response.data]);

            // Restablece el estado del nuevoFeaturedFeature
            setNewFeaturedFeature({ id: '', name: '', imgUrl: '', desc: '' });

            // Opcional: podrías agregar una notificación de éxito aquí si lo deseas
        } catch (error) {
            console.error('Error al agregar la nueva característica destacada:', error);
        }
    };

    const handleAddExistingFeaturedFeatures = () => {
        // Agregar lógica para manejar la selección de características destacadas existentes
        const updatedSelectedFeatures = [...selectedFeaturedFeatures, ...selectedExistingFeaturedFeatures];
        setSelectedFeaturedFeatures(updatedSelectedFeatures);
        setSelectedExistingFeaturedFeatures([]); // Limpiar la selección después de agregar
    };

    useEffect(() => {
        const fetchFeaturedFeatures = async () => {
            try {
                const response = await axios.get('http://localhost:8000/featuredFeatures');
                setDbFeaturedFeatures(response.data);
            } catch (error) {
                console.error('Error fetching featured features:', error);
            }
        };

        fetchFeaturedFeatures();
    }, [setDbFeaturedFeatures]);

    const handleNewFeaturedFeatureChange = (e) => {
        setNewFeaturedFeature({
            ...newFeaturedFeature,
            [e.target.name]: e.target.value
        });
    };

    const handleRemoveFeaturedFeatures = (featureId) => {
        setSelectedFeaturedFeatures((prevSelected) =>
            prevSelected.filter((feature) => feature !== featureId)
        );
    };

    return (
        <Form.Group controlId="featuredFeature">
            {showAlert && (
                <Alert
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    Por favor, complete todos los campos y asegúrese de que el ID de la característica sea único.
                </Alert>
            )}
            <Form.Group className="nice-form-group" controlId="newFeaturedFeatureId">
                <Form.Label>ID de la nueva característica</Form.Label>
                <Form.Control
                    type="text"
                    name="id"
                    value={newFeaturedFeature.id}
                    onChange={handleNewFeaturedFeatureChange}
                />

                <Form.Label>Nombre de la nueva característica</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={newFeaturedFeature.name}
                    onChange={handleNewFeaturedFeatureChange}
                />

                <Form.Label>Descripción de la nueva característica</Form.Label>
                <Form.Control
                    type="text"
                    name="desc"
                    value={newFeaturedFeature.desc}
                    onChange={handleNewFeaturedFeatureChange}
                />

                <Form.Label>Imagen de la nueva característica destacada (URL)</Form.Label>
                <Form.Control
                    type="text"
                    name="imgUrl"
                    value={newFeaturedFeature.imgUrl}
                    onChange={handleNewFeaturedFeatureChange}
                />

                <Form.Label>
                    <Button
                        variant="primary"
                        className="app-content-headerButton"
                        onClick={handleAddNewFeaturedFeature}
                    >
                        Agregar nueva característica destacada
                    </Button>
                </Form.Label>
            </Form.Group>

            <hr />

            <Form.Group controlId="existingFeaturedFeatures" className='checkForm'>
                <Form.Label>Seleccionar características destacadas existentes</Form.Label>
                <br />
                {dbFeaturedFeatures.map(feature => (
                    <Form.Check
                        key={feature.id}
                        type="checkbox"
                        label={`${feature.id} - ${feature.name}`}
                        checked={selectedExistingFeaturedFeatures.includes(feature.id)}
                        onChange={() => {
                            if (selectedExistingFeaturedFeatures.includes(feature.id)) {
                                setSelectedExistingFeaturedFeatures(prevSelected => prevSelected.filter(id => id !== feature.id));
                            } else {
                                setSelectedExistingFeaturedFeatures(prevSelected => [...prevSelected, feature.id]);
                            }
                        }}
                    />
                ))}
            </Form.Group>

            {/* Botón para agregar características destacadas existentes */}
            <Button variant="primary" onClick={handleAddExistingFeaturedFeatures} className='app-content-headerButton'>
                Agregar características destacadas
            </Button>

            <hr />

            {/* Mostrar características destacadas seleccionadas */}
            <Form.Label className='checkForm'>Características destacadas seleccionadas:</Form.Label>

            {selectedFeaturedFeatures.map(featureId => {
                const feature = dbFeaturedFeatures.find(f => f.id === featureId);
                return (
                    <div key={featureId} className='featuresSelected'>
                        <Button
                            type="button"
                            variant="danger"
                            className="app-content-headerButton"
                            onClick={() => handleRemoveFeaturedFeatures(featureId)}
                        >
                            <CloseIcon fontSize="" />
                        </Button>
                        <li key={featureId}>{feature ? feature.name : `Feature ID: ${featureId}`}</li>
                    </div>
                );
            })}

        </Form.Group>
    );
};

export default FeaturedFeaturesForm;
