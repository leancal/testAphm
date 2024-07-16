import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const IncludesForm = ({ product, selectedIncludes, setSelectedIncludes }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [includes, setIncludes] = useState([]);
    const [selectedIncludeId, setSelectedIncludeId] = useState('');
    const [newInclude, setNewInclude] = useState({ id: '', name: '', img: 'https://www.aiwaelectronics.com.ar/fileserver/includes/' });


    useEffect(() => {
        const fetchIncludes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/includes');
                setIncludes(response.data);
            } catch (error) {
                console.error('Error fetching includes:', error);
            }
        };

        fetchIncludes();
    }, []);

    const handleNewIncludeChange = (e) => {
        setNewInclude({
            ...newInclude,
            [e.target.name]: e.target.value
        });
    };

    const handleAddInclude = async () => {
        if (newInclude.id && newInclude.name && newInclude.img) {
            try {
                const response = await axios.post('http://localhost:8000/includes', newInclude);
                console.log('Include creado:', response.data);
                setIncludes([...includes, newInclude]); // Actualizar la lista de includes
                setNewInclude({ id: '', name: '', img: '' });
            } catch (error) {
                console.error('Error al crear el include:', error);
                if (error.response && error.response.status === 400) {
                    setShowAlert(true);
                }
            }
        } else {
            setShowAlert(true);
        }
    };

    const handleSelectInclude = (e) => {
        const selectedId = e.target.value;
        setSelectedIncludeId(selectedId);
        const selectedInclude = includes.find(include => include.id === selectedId);
        if (selectedInclude && !selectedIncludes.some(include => include.id === selectedId)) {
            setSelectedIncludes([...selectedIncludes, selectedInclude]);
        }
    };

    const handleRemoveInclude = (id) => {
        const updatedIncludes = selectedIncludes.filter(include => include.id !== id);
        setSelectedIncludes(updatedIncludes);
    };

    return (
        <Form.Group controlId="includes">
            {showAlert && (
                <Alert
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    Por favor, complete todos los campos y asegúrese de que el ID del include sea único.
                </Alert>
            )}
            <Form.Group className="nice-form-group" controlId="newIncludeId">
                <Form.Label>ID del nuevo -Incluye-</Form.Label>
                <Form.Control
                    type="text"
                    name="id"
                    value={newInclude.id}
                    onChange={handleNewIncludeChange}
                />

                <Form.Label>Nombre del nuevo -Incluye-</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={newInclude.name}
                    onChange={handleNewIncludeChange}
                />

                <Form.Group className="nice-form-group" controlId="newIncludeImg">
                    <Form.Label>URL de la imagen del nuevo -Incluye- (https://www.aiwaelectronics.com.ar/fileserver/includes/Nombre de la imagen. extension)</Form.Label>
                    <Form.Control
                        type="text"
                        name="img"
                        value={newInclude.img}
                        onChange={handleNewIncludeChange}
                    />
                </Form.Group>




                <Form.Label>
                    <Button
                        style={{ marginTop: '10px' }}
                        variant="primary"
                        className="app-content-headerButton"
                        onClick={handleAddInclude}
                    >
                        Agregar nuevo -Incluye-
                    </Button>
                </Form.Label>
            </Form.Group>

            <hr />

            <h4 style={{ textAlign: 'center', color: 'white', marginTop: '10px', fontSize: '25px' }}>Includes Disponibles</h4>
            <Form.Group controlId="selectInclude" className="nice-form-group">
                <Form.Label>Seleccionar Include</Form.Label>
                <Form.Select value={selectedIncludeId} onChange={handleSelectInclude}>
                    <option value="">Seleccione un include</option>
                    {includes.map((include) => (
                        <option key={include.id} value={include.id}>
                            {include.id} - {include.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <hr />


            <Form.Group controlId="selectInclude" className="nice-form-group">
                <Form.Label>Includes Seleccionados</Form.Label>


                {selectedIncludes.map((selectedInclude) => {
                    const selectedIncludeObj = includes.find((include) => include.id === selectedInclude.id);

                    return (
                        <div key={selectedInclude.id} className="featuresSelected">
                            <button
                                type="button"
                                variant="danger"
                                className="app-content-headerButton"
                                onClick={() => handleRemoveInclude(selectedInclude.id)}
                            >
                                Eliminar
                            </button>
                            <li>{selectedIncludeObj ? selectedIncludeObj.name : selectedInclude.id}</li>
                        </div>
                    );
                })}
            </Form.Group>
        </Form.Group>
    );
};

export default IncludesForm;
