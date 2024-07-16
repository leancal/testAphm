import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';

const CompShowProducts = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('audio');
  const [URI, setURI] = useState('http://localhost:8000/audio');

  const handleAddProductClick = () => {
    router.push('/newProduct');
  };

  useEffect(() => {
    setURI(`http://localhost:8000/${selectedCategory}`);
  }, [selectedCategory]);

  useEffect(() => {
    getProducts();
  }, [URI, getProducts]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(URI);
      setProducts(res.data);
    } catch (error) {
      console.error(`Error fetching ${selectedCategory}:`, error);
    }
  }, [URI, selectedCategory]);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (confirmDelete) {
      try {
        await axios.delete(`${URI}/${id}`);
        getProducts();
      } catch (error) {
        console.error(`Error deleting ${selectedCategory}:`, error);
      }
    }
  };

  const goToEditPage = (id) => {
    router.push(`/editProduct/${id}?category=${selectedCategory}`);
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
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <a href="#">
                <span>Productos</span>
              </a>
            </li>
            <li>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    className='form-title'
                    style={{ color: 'black' }}
                    type="text"
                    placeholder="Buscar por Nombre o SKU"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </li>
            <li>
              <Form>
                <Form.Group className='nice-form-group'>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control as="select" onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="audio">Audio</option>
                    <option value="headsets">Headsets</option>
                    <option value="tablets">Tablets</option>
                    <option value="cooks">Cooks</option>
                    <option value="notebooks">Notebooks</option>
                    <option value="discontinuos">Discontinuos</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </li>
          </ul>
          <div className="account-info">
            <button className="account-info-more">
            </button>
          </div>
        </div>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Productos - {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>
            <button className="app-content-headerButton" onClick={handleAddProductClick}>Añadir Producto</button>
          </div>
          <div className="app-content-actions">
          </div>
          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell status-cell">Sku</div>
              <div className="product-cell image">Productos</div>

            </div>
            {filteredProducts.map((product) => (
              <div className="products-row" key={product.id}>
                <div className="product-cell status-cell">
                  <span className="cell-label">Sku:</span>
                  <span className={`status ${product.status ? product.status.toLowerCase() : ''}`}>
                    {product.sku}
                  </span>
                </div>
                <div className="product-cell name">
                  {product.imgs && product.imgs.length > 0 ? (
                    <img src={product.imgs[0]} alt="Product" />
                  ) : null}
                  {product.name}
                </div>

                <div className="card-footer">
                  <Button style={{ marginRight: '10px' }} className="app-content-headerButton" onClick={() => goToEditPage(product.id)}>Editar</Button>
                  <Button className="app-content-headerButton" onClick={() => deleteProduct(product.id)}>Eliminar</Button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowProducts;