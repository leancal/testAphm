import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductDataForm = ({ product, handleChange, setProduct }) => {
    const [colorInput, setColorInput] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [published, setPublished] = useState(false);

    // Función para manejar cambios en el estado de publicación
    const handlePublishedChange = (e) => {
        const isChecked = e.target.checked;
        setPublished(isChecked);
        handleChange({
            target: {
                name: 'published',
                value: isChecked ? true : false // Convertir a booleano
            }
        });
    };

    const handleImageUrlInputChange = (e) => {
        setImageUrlInput(e.target.value);
    };

    const handleAddImageUrl = () => {
        if (imageUrlInput.trim() !== '') {
            handleChange({
                target: {
                    name: 'img_url',
                    value: [...product.img_url, imageUrlInput]
                }
            });
            setImageUrlInput('');
        }
    };

    const handleRemoveImageUrl = (index) => {
        const updatedUrls = [...product.img_url];
        updatedUrls.splice(index, 1);
        handleChange({
            target: {
                name: 'img_url',
                value: updatedUrls
            }
        });
    };

    const handleColorInputChange = (e) => {
        setColorInput(e.target.value);
    };

    const handleAddColor = () => {
        if (colorInput.trim() !== '') {
            handleChange({
                target: {
                    name: 'colors',
                    value: [...product.colors, colorInput]
                }
            });
            setColorInput('');
        }
    };

    const handleRemoveColor = (index) => {
        const updatedColors = [...product.colors];
        updatedColors.splice(index, 1);
        handleChange({
            target: {
                name: 'colors',
                value: updatedColors
            }
        });
    };


    return (
        <Form>
            <Form.Group controlId="published" className='nice-form-group'><Form.Check
                type="checkbox"
                label=""
                checked={published}
                onChange={handlePublishedChange}
            />
                <Form.Label >Publicado</Form.Label>
            </Form.Group>
            <Form.Group controlId="id" className='nice-form-group'>
                <Form.Label className='form-title'>ID del producto (Debe ser igual al SKU)</Form.Label>
                <Form.Control
                    type="text"
                    name="id"
                    value={product.id}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="sku" className='nice-form-group'>
                <Form.Label className='form-title'>Sku del producto</Form.Label>
                <Form.Control
                    type="text"
                    name="sku"
                    value={product.sku}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="name" className='nice-form-group'>
                <Form.Label className='form-title'>Nombre del producto</Form.Label>

                <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="shortDesc" className='nice-form-group'>
                <Form.Label className='form-title'>Descripción corta</Form.Label>
                <Form.Control
                    type="text"
                    name="shortDesc"
                    value={product.shortDesc}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="longDesc" className='nice-form-group'>
                <Form.Label className='form-title'>Descripción larga</Form.Label>
                <Form.Control
                    type="text"
                    name="longDesc"
                    value={product.longDesc}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="buyLink" className='nice-form-group'>
                <Form.Label className='form-title'>Enlace de compra</Form.Label>
                <Form.Control
                    type="text"
                    name="buyLink"
                    value={product.buyLink}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="driveLink" className='nice-form-group'>
                <Form.Label className='form-title'>Enlace de Google Drive</Form.Label>
                <Form.Control
                    type="text"
                    name="driveLink"
                    value={product.driveLink}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="colors" className='nice-form-group'>
                <Form.Label className='form-title'>Colors</Form.Label>
                <Form.Control
                    className='add-color'
                    type="text"
                    name="colorInput"
                    placeholder="Enter color"
                    value={colorInput}
                    onChange={handleColorInputChange}
                />
                <Button
                    variant="danger"
                    className="app-content-headerButton"
                    onClick={handleAddColor}
                >
                    Add Color
                </Button>
            </Form.Group>
            {product.colors && product.colors.map((color, index) => (
                <div key={index} className="colorItem">
                    <span className='form-title'>{color}</span>
                    <Button
                        variant="danger"
                        className="app-content-headerButton"
                        onClick={() => handleRemoveColor(index)}
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <Form.Group controlId="imgUrl" className='nice-form-group'>
                <Form.Label className='form-title'>URLs de la imagen (completar &quot;https://www.aiwaelectronics.com.ar/fileserver/products/SKU + nombre de la imagen&quot;) </Form.Label>

                {product.img_url.map((url, index) => (
                    <div key={index}>
                        <Form.Control
                            type="text"
                            name={`img_url_${index}`}
                            value={url}
                            onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `img_url_${index}` } })}
                            required
                        />
                        <Button
                            variant="danger"
                            className="app-content-headerButton"
                            onClick={() => handleRemoveImageUrl(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Form.Control
                    type="text"
                    name="new_img_url"
                    value={imageUrlInput}
                    onChange={handleImageUrlInputChange}
                    required
                />
                <Button
                    variant="primary"
                    className="app-content-headerButton"
                    onClick={handleAddImageUrl}
                >
                    Add Image URL
                </Button>
            </Form.Group>
        </Form>
    );
}

export default ProductDataForm;
