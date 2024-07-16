// components/BannerForm.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const BannerForm = ({ product, setProduct }) => {
    const [showBannerAddedAlert, setShowBannerAddedAlert] = useState(false);
    const [bannerFields, setBannerFields] = useState({
        title: '',
        img: '',
        desc: '',
    });

    const handleAddBanner = () => {
        if (bannerFields.title.trim() !== '') {
            // Agregar el banner al estado de banners en el producto
            setProduct((prevState) => ({
                ...prevState,
                banners: [
                    ...prevState.banners,
                    { ...bannerFields },
                ],
            }));

            // Restablecer los campos de banner después de agregarlo
            setBannerFields({
                title: '',
                img: '',
                desc: '',
            });

            // Mostrar la alerta de banner agregado
            setShowBannerAddedAlert(true);

            // Ocultar la alerta después de unos segundos (opcional)
            setTimeout(() => {
                setShowBannerAddedAlert(false);
            }, 3000); // Cambia la duración deseada en milisegundos
        }
    };

    return (
        <Form>
            <Form.Group controlId="bannerTitle" className='nice-form-group'>
                <Form.Label>Título del Banner</Form.Label>
                <Form.Control
                    type="text"
                    name="bannerTitle"
                    value={bannerFields.title}
                    onChange={(e) => setBannerFields({ ...bannerFields, title: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="bannerImage" className='nice-form-group'>
                <Form.Label>URLs de la imagen (completar &quot;https://www.aiwaelectronics.com.ar/fileserver/banners/nombre del banner&quot;)</Form.Label>
                <Form.Control
                    type='text'
                    name="bannerImage"
                    value={bannerFields.img}
                    onChange={(e) => setBannerFields({ ...bannerFields, img: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="bannerDesc" className='nice-form-group'>
                <Form.Label>Descripción del Banner</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bannerDesc"
                    value={bannerFields.desc}
                    onChange={(e) => setBannerFields({ ...bannerFields, desc: e.target.value })}
                />
            </Form.Group>

            <Button variant="danger" className="app-content-headerButton" onClick={handleAddBanner}>
                Agregar Banner
            </Button>

            {showBannerAddedAlert && (
                <div className="alert alert-success form-title">
                    Banner agregado con éxito.
                </div>
            )}
        </Form>
    );
};

export default BannerForm;
