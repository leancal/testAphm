import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { lvOneCat, lvTwoCat, lvThreeCat } from '../../content/categories';

const EditProducts = ({ productId, category }) => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [showNotPublishedMessage, setShowNotPublishedMessage] = useState();
  const [product, setProduct] = useState({
    id: '', // Inicializar el ID como una cadena vacía
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
    published: true,
    banners: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId && category) {
        try {
          const response = await axios.get(`http://localhost:8000/${category}/${productId}`);
          const productData = response.data;

          console.log('Datos del producto:', productData); // Verificar los datos del producto

          // Convertir la cadena JSON en un objeto JavaScript
          const banners = JSON.parse(productData.banners);
          const imgUrls = JSON.parse(productData.img_url);

          // Actualizar el estado del producto con los banners e img_urls convertidos
          setProduct({
            ...productData,
            banners: banners, // Actualizar el campo banners con el array de objetos
            img_url: imgUrls, // Actualizar el campo img_url con el array de URLs
            published: productData.published === true ? true : false,
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchProduct();
  }, [productId, category]);


  useEffect(() => {
    // Actualizar el estado de mostrar el mensaje cuando cambie el estado de publicación
    setShowNotPublishedMessage(!product.published);
  }, [product.published])


  const handleChange = (e, index) => {
    const { name, value, checked, type } = e.target;
    const newUrls = [...product.img_url];
    // Si el tipo de elemento es un checkbox, establecer el valor según si está marcado o no
    const newValue = type === 'checkbox' ? checked : value;
    newUrls[index] = newValue;

    setProduct({
      ...product,
      [name]: newValue,
      img_url: newUrls
    });
  };

  const handleAddImageUrl = () => {
    // Crear una copia del arreglo img_url actual
    const newUrls = [...product.img_url];
    // Agregar un nuevo campo vacío al arreglo
    newUrls.push('');
    // Actualizar el estado con el nuevo arreglo
    setProduct({
      ...product,
      img_url: newUrls
    });
  };



  const handleChangeBanner = (e, index, field) => {
    const newBanners = [...product.banners];
    newBanners[index] = { ...newBanners[index], [field]: e.target.value };
    setProduct({ ...product, banners: newBanners });
  };

  const handleAddBanner = () => {
    setProduct({ ...product, banners: [...product.banners, { title: '', img: '', desc: '' }] });
  };

  const handleRemoveBanner = (index) => {
    const newBanners = [...product.banners];
    newBanners.splice(index, 1);
    setProduct({ ...product, banners: newBanners });
  };

  // Función para obtener el nombre de la categoría basada en el ID
  const getCategoryName = (categoryId) => {
    const category = lvOneCat.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  // Función para obtener el nombre de la segunda categoría basada en el ID
  const getSecondCategoryName = (categoryId) => {
    const category = lvTwoCat.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  // Función para obtener el nombre de la tercera categoría basada en el ID
  const getThirdCategoryName = (categoryId) => {
    const category = lvThreeCat.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const handleBack = () => {
    router.push('/adminPanel');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        published: product.published ? 1 : 0 // Convertir a 1 si es verdadero, 0 si es falso
      };

      await axios.put(`http://localhost:8000/${category}/${productId}`, updatedProduct);
      console.log('Product updated successfully');
      setShowAlert(true);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  return (
    <div className="mt-4 p-5 bg-primary text-white rounded center">
      <div className="app-container">
        <div className="app-contentEdit">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Editar producto</h1>
            <button onClick={handleBack} variant="danger" className="app-content-headerButton">Volver</button>
          </div>
          <div className="app-content-actions">
            {
              showNotPublishedMessage && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  El producto no está publicado. Seleccione &apos;Publicado&apos; para que sea publicado.
                </div>
              )
            }
            F
            <Form.Group controlId="published" className="nice-form-group">
              <Form.Check
                type="checkbox"
                name="published"
                checked={product.published}
                onChange={handleChange}
              />
              <Form.Label>Publicado</Form.Label>

            </Form.Group>

            <Form>
              <Form.Group controlId="name" className="nice-form-group">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="longDesc" className="nice-form-group">
                <Form.Label>Descripción Larga:</Form.Label>
                <textarea
                  value={product.longDesc}
                  name="longDesc"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="shortDesc" className="nice-form-group">
                <Form.Label>Descripción Corta:</Form.Label>
                <textarea
                  value={product.shortDesc}
                  name="shortDesc"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="sku" className="nice-form-group">
                <Form.Label>SKU:</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="buyLink" className="nice-form-group">
                <Form.Label>Link de Compra:</Form.Label>
                <Form.Control
                  type="text"
                  name="buyLink"
                  value={product.buyLink}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="driveLink" className="nice-form-group">
                <Form.Label>Link de Descarga:</Form.Label>
                <Form.Control
                  type="text"
                  name="driveLink"
                  value={product.driveLink}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="imgUrls" className="nice-form-group">
                <Form.Label>URLs de Imágenes:</Form.Label>
                {product.img_url.map((url, index) => (
                  <div key={index} style={{ marginBottom: '10px' }} className="banner-entry">
                    <Form.Control
                      type="text"
                      value={url}
                      onChange={(e) => handleChange(e, index)}
                      style={{ width: '100%', height: '35px' }}
                    />
                  </div>
                ))}

                <Button
                  variant="danger"
                  className="app-content-headerButton"
                  onClick={handleAddImageUrl}
                >
                  Agregar URL de imagen
                </Button>

              </Form.Group>

              <Form.Group controlId="banners" className="nice-form-group">
                <Form.Label>Banners:</Form.Label>
                {Array.isArray(product.banners) &&
                  product.banners.map((banner, index) => (
                    <div key={index} className='bannerForm'>
                      <div>
                        <Form.Control
                          as="textarea"
                          style={{ width: '15%', height: 'auto', minHeight: '35px' }}
                          name={`banner_title_${index}`}
                          placeholder="Título"
                          value={banner.title}
                          onChange={(e) => handleChangeBanner(e, index, 'title')}
                        />
                        <Form.Control
                          as="textarea"
                          style={{ width: '40%', height: 'auto', minHeight: '35px' }}
                          name={`banner_img_${index}`}
                          placeholder="URL de la imagen"
                          value={banner.img}
                          onChange={(e) => handleChangeBanner(e, index, 'img')}
                        />
                        <Form.Control
                          as="textarea"
                          style={{ width: '45%', height: 'auto', minHeight: '35px' }}
                          name={`banner_desc_${index}`}
                          placeholder="Descripción"
                          value={banner.desc}
                          onChange={(e) => handleChangeBanner(e, index, 'desc')}
                        />
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          className="app-content-headerButton"
                          onClick={() => handleRemoveBanner(index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                <Button
                  variant="danger"
                  className="app-content-headerButton"
                  onClick={handleAddBanner}
                >
                  Agregar Banner
                </Button>
              </Form.Group>


              <Form.Group controlId="categories" className="nice-form-group">
                <Form.Label>Categoria:</Form.Label>
                <Form.Control
                  as="select"
                  name="categories"
                  value={getCategoryName(product.categories)}
                  onChange={handleChange}
                >
                  {lvOneCat.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="secondCategories" className="nice-form-group">
                <Form.Label>Segunda Categoria:</Form.Label>
                <Form.Control
                  as="select"
                  name="secondCategories"
                  value={getSecondCategoryName(product.secondCategories)}
                  onChange={handleChange}
                >
                  {lvTwoCat.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="thirdCategories" className="nice-form-group">
                <Form.Label>Tercera Categoria:</Form.Label>
                <Form.Control
                  as="select"
                  name="thirdCategories"
                  value={getThirdCategoryName(product.thirdCategories)}
                  onChange={handleChange}
                >
                  {lvThreeCat.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="colors" className="nice-form-group">
                <Form.Label>Colores:</Form.Label>
                <Form.Control
                  type="text"
                  name="colors"
                  value={product.colors}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="line" className="nice-form-group">
                <Form.Label>Linea:</Form.Label>
                <Form.Control
                  type="text"
                  name="line"
                  value={product.line}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="includes" className="nice-form-group">
                <Form.Label>Incluye:</Form.Label>
                <Form.Control type="text" name="includes" value={product.includes} onChange={handleChange} />

              </Form.Group>
              <Form.Group controlId="features" className="nice-form-group">
                <Form.Label>Características:</Form.Label>
                <Form.Control
                  type="text"
                  name="features"
                  value={product.features}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="featuredFeatures" className="nice-form-group">
                <Form.Label>Características destacadas:</Form.Label>
                <Form.Control
                  type="text"
                  name="featuredFeatures"
                  value={product.featuredFeatures}
                  onChange={handleChange}
                />
              </Form.Group>

              <button
                onClick={handleSubmit}
                variant="danger"
                className="app-content-headerButton"
                style={{ marginTop: '20px' }}
              >
                Guardar Cambios
              </button>
            </Form>
            {showAlert && (
              <div className="alert alert-success" role="alert" style={{ marginTop: '20px', color: 'white' }}
              >
                Los cambios fueron guardados con éxito.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
