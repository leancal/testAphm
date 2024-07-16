import { lvOneCat, lvTwoCat, lvThreeCat } from '../../../content/categories';
import lineas from '../../../content/lineas';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';


const CategoryForm = ({ product, setProduct }) => {
    const [secondCategories, setSecondCategories] = useState([]);
    const [thirdsCategories, setThirdsCategories] = useState([]);
    const [showLineas, setShowLineas] = useState(false);

    const handleFirstSelectChange = (e) => {
        const selectedCategory = e.target.value;

        // Actualiza el estado de la primera categoría
        handleChange(e);

        // Filtra las categorías para la segunda barra desplegable basándose en el parent de la primera categoría seleccionada
        const filteredCategories = lvTwoCat.filter((category) => category.parent === Number(selectedCategory));

        // Actualiza el estado de la segunda categoría
        setSecondCategories(filteredCategories);

        // Verifica si la primera categoría seleccionada es 'Audio'
        if (selectedCategory === 'Audio') {
            // Muestra las opciones de la tercera categoría (lineas)
            setShowLineas(true);

            // Establece la primera línea como valor predeterminado
            const defaultLinea = lineas[0].name;

            // Actualiza el estado del producto con la línea seleccionada
            setProduct((prevProduct) => ({
                ...prevProduct,
                linea: defaultLinea,
            }));
        } else {
            // Oculta las opciones de la tercera categoría si no es 'Audio'
            setShowLineas(false);

            // Actualiza el estado del producto sin la línea seleccionada
            setProduct((prevProduct) => ({
                ...prevProduct,
                line: '',
            }));
        }
    };

    const handleSecondSelectChange = (e) => {
        const selectedSecondCategory = e.target.value;

        // Actualiza el estado de la segunda categoría
        handleChange(e);

        // Filtra las categorías para la tercera barra desplegable basándose en la segunda categoría seleccionada
        const filteredCategories = lvThreeCat.filter((category) => category.parent === Number(selectedSecondCategory));

        // Actualiza el estado de la tercera categoría
        setThirdsCategories(filteredCategories);

        // Verifica si la segunda categoría seleccionada es 'Audio'
        setShowLineas(filteredCategories);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Si el campo es un checkbox, actualiza el estado según si está marcado o no
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: checked,
            }));

            // Actualiza el estado showFileUploadButton
            setShowFileUploadButton(!checked);
        } else if (name === 'categories') {
            // Si el campo es 'categories', actualiza directamente el valor como una cadena
            setProduct((prevProduct) => ({
                ...prevProduct,
                categories: value, // Almacena el valor de la categoría como una cadena
                // Asegúrate de restablecer la propiedad 'linea' cuando cambias la categoría
                line: '',
            }));
        } else if (name === 'linea') {
            // Si el campo es 'linea', actualiza directamente el valor como una cadena
            setProduct((prevProduct) => ({
                ...prevProduct,
                line: value,
            }));
        } else {
            // Para otros campos, maneja como antes
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };

    return (

        <Form>
            <Form.Group controlId="categories" className='nice-form-group'>
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    as="select"
                    name="categories"
                    value={product.categories}
                    onChange={handleFirstSelectChange}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {lvOneCat.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.id ? `id=${category.id}` : ''} {category.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            {secondCategories.length > 0 && (
                <Form.Group controlId="secondCategories" className='nice-form-group'>
                    <Form.Label>Segunda Categoría</Form.Label>
                    <Form.Control
                        as="select"
                        name="secondCategories"
                        value={product.secondCategory}
                        onChange={handleSecondSelectChange}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {secondCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.id ? `id=${category.id}` : ''} {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}
            {thirdsCategories.length > 0 && (
                <Form.Group controlId="thirdsCategories" className='nice-form-group'>
                    <Form.Label>Tercera Categoría</Form.Label>
                    <Form.Control
                        as="select"
                        name="thirdsCategories"
                        value={product.thirdCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {thirdsCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.id ? `id=${category.id}` : ''} {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}
            {showLineas && product.categories === '1' && (
                <Form.Group controlId="thirdsCategories" className='nice-form-group'>
                    <Form.Label>Linea</Form.Label>
                    <Form.Control
                        as="select"
                        name="linea"
                        value={product.linea}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una linea</option>
                        {lineas.map((linea) => (
                            <option key={linea.name} value={linea.name}>
                                {linea.displayName}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}



        </Form>



    );
};
export default CategoryForm