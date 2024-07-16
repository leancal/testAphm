import { Visibility, Check, Close, OpenInNew, QuestionMark, Download, LocalGroceryStore, ArrowDropDown } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ sku, products, showName, showSku, showDesc, showButton, showGen, showTags, showDownload, showMenu, showViewing }) {
  const [menuAnchorElement, setMenuAnchorElement] = useState(null); // Mueve el hook aquí
  const open = Boolean(menuAnchorElement);

  if (!products) {
    console.error('Products array is undefined');
    return null; // o podrías mostrar un mensaje de error en la UI
  }

  const product = products.find(e => e.sku == sku);

  if (!product) {
    console.error('Product not found for SKU:', sku);
    return null;
  }

  function toggleMenu(e) {
    open ? setMenuAnchorElement(null) : setMenuAnchorElement(e.currentTarget);
  }

  if (typeof product.img_url === 'string') {
    try {
      product.img_url = JSON.parse(product.img_url);
    } catch (error) {
      console.error('Error parsing imgUrls:', error);
      return null;
    }
  }

  if (!Array.isArray(product.img_url)) {
    console.error('imgUrls is not an array:', product.img_url);
    return null;
  }

  // Obtener la primera URL de la matriz img_url
  const coverImage = product.img_url.length > 0 ? product.img_url[0] : '/path/to/default-image.jpg';

  return (
    <div className='product-card'>
      {showViewing && <Visibility />}
      <Link href="#">
        <div className='image'>
          <Image width='150' height='150' src={coverImage} alt={product.name} placeholder='blur' blurDataURL='/ph.png' priority />
        </div>
      </Link>
      <div className='texts'>
        {showSku && <p className='p-sku'>{product.sku}</p>}
        {showName && <Link href="#"><p className='p-name'>{product.name}</p></Link>}
        {showDesc && <p className='p-desc'><small>{product.shortDesc}</small></p>}
        {showGen && <p className='p-desc'><small>{product.gen}</small></p>}
        {showDownload && <a className='p-download-button' href={product.downloads} target='_blank' rel="noreferrer"><OpenInNew />Descargas</a>}
        {showMenu && (
          <>
            <button className='options-menu' onClick={toggleMenu}>Opciones<ArrowDropDown /></button>
            <Menu
              anchorEl={menuAnchorElement}
              open={open}
              onClose={toggleMenu}
              sx={{ maxWidth: '300px' }}>
              <MenuItem onClick={toggleMenu} sx={{ fontSize: '14px' }}>
                <Link className='search-menu-link' href={product.link}>
                  <Visibility fontSize="small" />Ver producto
                </Link>
              </MenuItem>
              {product.buyLink && (
                <MenuItem onClick={toggleMenu} sx={{ fontSize: '14px' }}>
                  <Link className='search-menu-link' target='_blank' href={product.buyLink}>
                    <LocalGroceryStore fontSize="small" />Comprar
                  </Link>
                </MenuItem>
              )}
              {product.features && (
                <MenuItem onClick={toggleMenu} sx={{ fontSize: '14px' }}>
                  <Link className='search-menu-link' href={`${product.link}#product-features-anchor`}>
                    <QuestionMark fontSize="small" />Características
                  </Link>
                </MenuItem>
              )}
              {product.downloads && (
                <MenuItem onClick={toggleMenu} sx={{ fontSize: '14px' }}>
                  <Link className='search-menu-link' href={product.downloads} target='_blank'>
                    <Download fontSize="small" />Descargas
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </div>
      {showButton && <button className='see-more'><Link href={product.link}>Ver más</Link></button>}
    </div>
  );
}
