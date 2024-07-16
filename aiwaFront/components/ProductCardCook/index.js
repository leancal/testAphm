import { Visibility, Check, Close, OpenInNew, QuestionMark, Download, LocalGroceryStore, ArrowDropDown } from '@mui/icons-material';
//import { products } from '../../content/products'
import { useRouter } from 'next/router';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ products, sku, showName, showSku, showDesc, showButton, showGen, showTags, showDownload, showMenu, showViewing }) {
    const product = products.find(e => e.sku == sku)
    const [menuAnchorElement, setMenuAnchorElement] = useState(null)
    const open = Boolean(menuAnchorElement)
    function toggleMenu(e) { open ? setMenuAnchorElement(null) : setMenuAnchorElement(e.currentTarget) }

    if (typeof product.img_url === 'string') {
        try {
            product.img_url = JSON.parse(product.img_url)
        } catch (error) {
            console.error('Error parsing imgUrls:', error);
            return null;
        }
    }
    if (!Array.isArray(product.img_url)) {
        console.error('imgUrls is not an array:', product.img_url);
        return null;
    }
    const coverImage = product.img_url && product.img_url.length > 0 ? product.img_url[0] : '/path/to/default-image.jpg';

    return (
        <div className='product-card-cook'>
            {showViewing && <Visibility />}
            <Link href={`/productos/${product.sku}`}>
                <div className='image'>
                    <Image
                        width={350}
                        height={350}
                        src={coverImage}
                        alt={product.name}
                        placeholder='blur'
                        blurDataURL='/ph.png'
                        priority
                        layout="responsive" // Agregamos layout responsive
                        className="product-image" // Añadimos una clase para identificar la imagen
                    />
                </div>
            </Link>
            <div className='texts'>
                {showSku && <p className='p-sku'>{product.sku}</p>}
                {showName && <Link href={`/productos/${product.sku}`}><p className='p-name'>{product.name}</p></Link>}
                {showDesc && <p className='p-desc'><small>{product.shortDesc}</small></p>}
                {showGen && <p className='p-desc'><small>{product.gen}</small></p>}
                {/* {showTags && (
                    <div className='p-tags'>
                        {!product.categories.some(e => e == 110)
                            ? <span style={{ background: '#54ac45' }}><Check />Disponible</span>
                            : <span style={{ background: 'grey' }}><Close />No disponible</span>}
                    </div>
                )} */}
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
                                <Link className='search-menu-link' href={`/productos/${product.sku}`}>
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
            {showButton && <button className='see-more'><Link href="#">Ver más</Link></button>}
        </div>
    );
}