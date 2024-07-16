import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const FeaturesForm = ({
    showAlert,
    setShowAlert,
    selectedFeatures,
    setSelectedFeatures,
    featureValueInputs,
    setFeatureValueInputs,
    setDbFeatures, // Añadir setter para dbFeatures
    dbFeatures, // Añadir dbFeatures
}) => {
    const [newFeatureId, setNewFeatureId] = useState('');
    const [newFeatureName, setNewFeatureName] = useState('');

    const handleAddNewFeature = async () => {
        if (newFeatureId && newFeatureName) {
            const existingFeature = dbFeatures.find((feature) => feature.id === newFeatureId);

            if (existingFeature) {
                setShowAlert(true);
                return;
            }

            try {
                await axios.post('http://localhost:8000/features', {
                    id: newFeatureId,
                    name: newFeatureName,
                });

                console.log('Nueva característica agregada con ID:', newFeatureId);
                setDbFeatures([...dbFeatures, { id: newFeatureId, name: newFeatureName }]); // Actualizar dbFeatures
            } catch (error) {
                console.error('Error adding new feature:', error);
            }

            setNewFeatureId('');
            setNewFeatureName('');
            setShowAlert(false);
        } else {
            console.log('Ingresa el ID y el nombre de la nueva característica.');
        }
    };

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await axios.get('http://localhost:8000/features');
                setDbFeatures(response.data);
            } catch (error) {
                console.error('Error fetching features:', error);
            }
        };

        fetchFeatures();
    }, [setDbFeatures]);

    const handleFeaturesChange = (event) => {
        const { value } = event.target;

        setSelectedFeatures((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((selected) => selected !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setFeatureValueInputs((prevValues) => ({
            ...prevValues,
            [value]: '',
        }));
    };

    const handleRemoveFeature = (featureId) => {
        setSelectedFeatures((prevSelected) =>
            prevSelected.filter((feature) => feature !== featureId)
        );
    };

    const handleFeatureValueChange = (e, featureId) => {
        const { value } = e.target;

        setFeatureValueInputs((prevValues) => ({
            ...prevValues,
            [featureId]: value,
        }));
    };

    return (
        <Form.Group controlId="features">
            <Form.Group className='nice-form-group' controlId="newFeaturedFeatureId">
                <Form.Label>ID de la nueva característica</Form.Label>
                <Form.Control
                    type="text"
                    name="newFeatureId"
                    value={newFeatureId}
                    onChange={(e) => setNewFeatureId(e.target.value.replace(/[^0-9]/g, ''))}
                />

                <Form.Label>Nombre de la nueva característica</Form.Label>
                <Form.Control
                    type="text"
                    name="newFeatureName"
                    value={newFeatureName}
                    onChange={(e) => setNewFeatureName(e.target.value)}
                />

                <Form.Label>
                    <Button style={{ marginTop: '10px' }} variant="primary" className="app-content-headerButton" onClick={handleAddNewFeature}>
                        Agregar nueva característica
                    </Button>
                </Form.Label>
                {showAlert && (
                    <Alert show={showAlert} variant="info" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading style={{ color: 'white' }}>Atención!!</Alert.Heading>
                        <p style={{ color: 'white' }}>
                            Este ID ya existe, por favor ingrese un ID diferente.
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button style={{ marginTop: '10px' }} onClick={() => setShowAlert(false)} variant="primary" className="app-content-headerButton">
                                Cerrar
                            </Button>
                        </div>
                        {!showAlert && <Button onClick={() => setShowAlert(true)}>Show Alert</Button>}
                    </Alert>
                )}
            </Form.Group>

            <hr />

            <Form.Group className='checkForm' controlId="features">
                <Form.Label>Seleccionar características destacadas existentes</Form.Label>
                <br />
                {Array.isArray(dbFeatures) && dbFeatures
                    .sort((a, b) => Number(a.id) - Number(b.id)) // Ordenar features por ID numérico ascendente
                    .map((feature) => (
                        <div key={`${feature.id} - ${feature.name}`} className="featureItem">
                            <Form.Check
                                type="checkbox"
                                label={`${feature.id} - ${feature.name}`}
                                name="features"
                                value={feature.id}
                                onChange={handleFeaturesChange}
                            />
                        </div>
                    ))}
            </Form.Group>

            {selectedFeatures.map((selectedFeature) => {
                const selectedFeatureObj = dbFeatures.find((feature) => feature.id === selectedFeature);

                return (
                    <div key={selectedFeature} className='featuresSelected'>
                        <button
                            type="button"
                            variant="danger"
                            className="app-content-headerButton"
                            onClick={() => handleRemoveFeature(selectedFeature)}
                        >
                            <CloseIcon fontSize="" />
                        </button>
                        <li>{selectedFeatureObj ? selectedFeatureObj.name : selectedFeature}</li>
                        <div className='nice-form-group'>
                            <Form.Label>Valor para {selectedFeatureObj ? selectedFeatureObj.name : selectedFeature}:</Form.Label>
                            <Form.Control
                                type="text"
                                name={`feature_${selectedFeature}`}
                                value={featureValueInputs[selectedFeature] || ''}
                                onChange={(e) => handleFeatureValueChange(e, selectedFeature)}
                            />
                        </div>
                    </div>
                );
            })}
        </Form.Group>
    );
};

export default FeaturesForm;
