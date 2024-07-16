import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/router';
import ProductDataForm from './ProductDataForm/ProductDataForm';
import IncludesForm from './IncludesForm/IncludesForm';
import FeaturesForm from './FeaturesForm/FeaturesForm';
import FeaturedFeaturesForm from './FeaturedFeaturesForm/FeaturedFeaturesForm';
import CategoryForm from './CategoryForm/CategoryForm';
import BannerForm from './BannerForm/BannerForm';


const CreateProducts = () => {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [showProductDataForm, setShowProductDataForm] = useState(false);
    const [showIncludesForm, setShowIncludesForm] = useState(false);
    const [showFeaturesForm, setShowFeaturesForm] = useState(false);
    const [showFeaturedFeatureForm, setShowFeaturedFeatureForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(true);
    const [showBannerForm, setShowBannerForm] = useState(false);
    const [selectedFeaturedFeatures, setSelectedFeaturedFeatures] = useState([]);
    const [dbFeaturedFeatures, setDbFeaturedFeatures] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [featureValueInputs, setFeatureValueInputs] = useState({});
    const [dbFeatures, setDbFeatures] = useState([]);
    const [product, setProduct] = useState({
        id: '',
        sku: '',
        name: '',
        longDesc: '',
        shortDesc: '',
        img_url: [], // Inicializar como un array vacío
        colors: [],
        buyLink: '',
        driveLink: '',
        includes: [],
        features: [],
        featuredFeatures: [],
        categories: '',
        secondCategories: '',
        thirdCategories: '',
        line: '',
        published: '',
        banners: [],
    });



    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleIncludesChange = (selectedIncludes) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            includes: selectedIncludes
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Establecer el ID del producto igual al SKU
            setProduct((prevProduct) => ({
                ...prevProduct,
                id: prevProduct.sku,
            }));

            const featuresData = selectedFeatures.map((selectedFeature) => ({
                id: selectedFeature,
                name: dbFeatures.find(f => f.id === selectedFeature)?.name || '',
                value: featureValueInputs[selectedFeature] || '',
            }));

            const featuredFeaturesData = selectedFeaturedFeatures.map((selectedFeaturedFeature) => ({
                id: selectedFeaturedFeature,
                name: dbFeaturedFeatures.find(f => f.id === selectedFeaturedFeature)?.name || '',
                desc: dbFeaturedFeatures.find(f => f.id === selectedFeaturedFeature)?.desc || '',
                imgUrl: dbFeaturedFeatures.find(f => f.id === selectedFeaturedFeature)?.imgUrl || '',
            }));

            // Verificar si el campo "published" está vacío y establecerlo en false
            const updatedProduct = {
                ...product,
                published: product.published === '' ? false : product.published,
                features: featuresData,
                featuredFeatures: featuredFeaturesData,
                banners: product.banners,
            };

            let tableName;
            switch (product.categories) {
                case '2': // Informática
                    switch (product.secondCategories) {
                        case '106':
                            tableName = 'tablets';
                            break;
                        case '107':
                            tableName = 'notebooks';
                            break;
                        default:
                            throw new Error('Subcategoría no válida para Informática');
                    }
                    break;
                case '1': // Audio
                    tableName = 'audio';
                    break;
                case '5': // Headsets
                    tableName = 'headsets';
                    break;
                case '6': // Cooks
                    tableName = 'cooks';
                    break;
                case '4': //Discontinuos
                    tableName = 'discontinuos';
                    break;
                default:
                    throw new Error('Categoría no válida');
            }

            const productResponse = await axios.post(`http://localhost:8000/${tableName}`, updatedProduct);
            console.log('Producto creado:', productResponse.data);

            setProduct({
                id: '',
                sku: '',
                name: '',
                longDesc: '',
                shortDesc: '',
                img_url: [],
                colors: [],
                buyLink: '',
                driveLink: '',
                includes: [],
                features: [],
                featuredFeatures: [],
                categories: '',
                secondCategories: '',
                thirdCategories: '',
                line: '',
                banners: [],
            });
            setSelectedFeatures([]);
            setSelectedFeaturedFeatures([]);
            setFeatureValueInputs({});
            //window.location.reload(); // <-- aquí es importante verificar si necesitas recargar la página después de enviar el formulario
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };


    const handleBack = () => {
        router.push('/adminPanel');
    };

    const handleProductDataFormClick = () => {
        setShowProductDataForm(true);
        setShowIncludesForm(false);
        setShowFeaturesForm(false);
        setShowFeaturedFeatureForm(false);
        setShowCategoryForm(false);
        setShowBannerForm(false);
    };

    const handleIncludesFormClick = () => {
        setShowIncludesForm(true);
        setShowProductDataForm(false);
        setShowFeaturesForm(false);
        setShowFeaturedFeatureForm(false);
        setShowCategoryForm(false);
        setShowBannerForm(false);
    };

    const handleFeaturesFormClick = () => {
        setShowFeaturesForm(true);
        setShowIncludesForm(false);
        setShowProductDataForm(false);
        setShowFeaturedFeatureForm(false);
        setShowCategoryForm(false);
        setShowBannerForm(false);
    }

    const handleFeaturedFeaturesFormClick = () => {
        setShowFeaturedFeatureForm(true);
        setShowProductDataForm(false);
        setShowIncludesForm(false);
        setShowFeaturesForm(false);
        setShowCategoryForm(false);
        setShowBannerForm(false);
    }

    const handleCategoryFormClick = () => {
        setShowCategoryForm(true);
        setShowFeaturedFeatureForm(false);
        setShowFeaturesForm(false);
        setShowIncludesForm(false);
        setShowProductDataForm(false);
        setShowBannerForm(false);
    }

    const handleBannerFormClick = () => {
        setShowBannerForm(true);
        setShowCategoryForm(false);
        setShowFeaturesForm(false);
        setShowFeaturedFeatureForm(false);
        setShowIncludesForm(false);
        setShowProductDataForm(false);
    };

    return (
        <div className="mt-4 p-5 bg-primary text-white rounded center">
            {showAlert && (
                <Alert
                    message="El producto ya existe. Por favor, elija un nombre de producto único."
                    onClose={() => setShowAlert(false)}
                />
            )}

            <div className="app-container">
                <div className="sidebar">
                    <div className="sidebar-header"></div>
                    <ul className="sidebar-list">
                        <li className="sidebar-list-item">
                            <a href="#" onClick={handleCategoryFormClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                <span>Categoria</span>
                            </a>
                        </li>
                        <li className="sidebar-list-item">
                            <a href="#" onClick={handleProductDataFormClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                <span>Datos de producto</span>
                            </a>
                        </li>
                        <li className="sidebar-list-item">
                            <a href="#" onClick={handleBannerFormClick}> {/* Agrega un controlador de clic para mostrar el formulario */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                <span>Banner</span>
                            </a>
                        </li>
                        <li className="sidebar-list-item">
                            <a href="#" onClick={handleIncludesFormClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                <span>Incluye</span>
                            </a>
                        </li>
                        <li className="sidebar-list-item">
                            <a href="#" onClick={handleFeaturesFormClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                <span>Caracteristicas</span>
                            </a>
                        </li>
                        <li className="sidebar-list-item">
                            <a href="#" onClick={handleFeaturedFeaturesFormClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                <span>Caracteristicas destacadas</span>
                            </a>
                        </li>
                    </ul>
                    <div className="account-info">
                        <button className="account-info-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                        </button>
                    </div>
                </div>
                <div className="app-content">
                    <div className="app-content-header">
                        <h1 className="app-content-headerText">Agregar producto</h1>
                        <button onClick={handleBack} variant="danger" className="app-content-headerButton">Volver</button>
                    </div>
                    <div className="app-content-actions">


                        {showBannerForm && (
                            <BannerForm
                                product={product}
                                setProduct={setProduct}
                            />
                        )}

                        {showCategoryForm && (
                            <CategoryForm
                                product={product}
                                setProduct={setProduct}
                            />
                        )}
                        {showProductDataForm && (
                            <ProductDataForm
                                product={product}
                                handleChange={handleChange}
                                setProduct={setProduct}
                            />
                        )}
                        {showIncludesForm && (
                            <IncludesForm
                                product={product}
                                selectedIncludes={product.includes}
                                setSelectedIncludes={handleIncludesChange}
                            />
                        )}
                        {showFeaturesForm && (
                            <FeaturesForm
                                showAlert={showAlert}
                                setShowAlert={setShowAlert}
                                product={product}
                                selectedFeatures={selectedFeatures}
                                setSelectedFeatures={setSelectedFeatures}
                                featureValueInputs={featureValueInputs}
                                setFeatureValueInputs={setFeatureValueInputs}
                                dbFeatures={dbFeatures}
                                setDbFeatures={setDbFeatures}
                            />
                        )}
                        {showFeaturedFeatureForm && (
                            <FeaturedFeaturesForm
                                product={product}
                                selectedFeaturedFeatures={selectedFeaturedFeatures}
                                setSelectedFeaturedFeatures={setSelectedFeaturedFeatures}
                                dbFeaturedFeatures={dbFeaturedFeatures}
                                setDbFeaturedFeatures={setDbFeaturedFeatures}
                            />
                        )}
                    </div>
                    <Button variant="primary" className="app-content-headerButton" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateProducts;
