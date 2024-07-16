import AccordionItem from '../AccordionItem';
import LaunchIcon from '@mui/icons-material/Launch';
import IncludesItem from '../IncludesItem';
import ProductCard from '../ProductCard';
import React from 'react';

export default function ProductSpecsTable({ prod, features, includes }) {
  let prodFeatures = [];

  // Parsear prod.features si es una cadena JSON
  if (typeof prod.features === 'string') {
    try {
      prodFeatures = JSON.parse(prod.features);
    } catch (error) {
      console.error('Error parsing prod.features:', error);
    }
  } else {
    prodFeatures = prod.features || [];
  }

  const mappedFeatures = features.map(e => ({ id: e.id, name: e.name }));
  const filteredFeatures = prodFeatures.filter(f => mappedFeatures.some(e => e.id === f.id));

  const finalFeatures = filteredFeatures.map(f => {
    const matchingFeature = mappedFeatures.find(e => e.id === f.id);
    return { ...f, name: matchingFeature.name };
  });

  let prodIncludes = [];

  // Parsear prod.includes si es una cadena JSON
  if (typeof prod.includes === 'string') {
    try {
      prodIncludes = JSON.parse(prod.includes);
    } catch (error) {
      console.error('Error parsing prod.includes:', error);
    }
  } else {
    prodIncludes = prod.includes || [];
  }

  return (
    <section id='prod-specs'>
      <AccordionItem classes='prod-specs-table' name='Especificaciones'>
        <div className='table-cell-container'>
          <div className='table-cell sku'>
            <div className='title'>{prod.sku}</div>
          </div>
          {prod.featuresSections && prod.featuresSections.map((e, i) => (
            <React.Fragment key={i}>
              <div className='table-cell sku'>
                <div className='title'>{e.title}</div>
              </div>
              {e.items.map((f, i) => (
                <div className='table-cell' key={i}>
                  <div className='title'>{f.name}</div>
                  <p className='desc'>{f.value}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
          {!prod.featuresSections && finalFeatures.map((e, i) => (
            <div className='table-cell' key={i}>
              <div className='title'>{e.name}</div>
              <p className='desc'>{e.value}</p>
            </div>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem classes='prod-specs-table' name='Incluye'>
        <div className='includes-container'>
          {prodIncludes.map((e, i) => {
            const includeItem = includes.find(f => e == f.id);
            return includeItem ? <IncludesItem item={includeItem} key={i} /> : null;
          })}
        </div>
        {prod.certNo && <p><small>*Número de certificado de Seguridad Eléctrica: {prod.certNo}</small></p>}
      </AccordionItem>
      <AccordionItem classes='prod-specs-table' name='Descargas'>
        <div className='download-items'>
          <a href={prod.driveLink} target='_blank' rel="noreferrer">
            <LaunchIcon />
            {prod.noManual ? 'Accedé a las imágenes y ficha del producto' : 'Accedé al manual, imágenes y ficha del producto'}
          </a>
        </div>
      </AccordionItem>
      {prod.variants && prod.variants.length > 0 && (
        <AccordionItem classes='prod-specs-table variants' name='Generaciones' open>
          <div className="wrapper">
            {prod.variants.map((e, i) => (
              <ProductCard key={i} sku={e} showName showSku showGen showTags showViewing={e == prod.sku} />
            ))}
          </div>
        </AccordionItem>
      )}
    </section>
  );
}
