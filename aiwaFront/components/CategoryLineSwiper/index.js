import { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import lineas from '../../content/lineas';
import Link from 'next/link';

export default function CategoryLineSwiper({ products }) {
  console.log('Products recibidos en CategoryLineSwiper:', products);
  return (
    <>
      {/* Buscamos la línea 'waterproof' y la colocamos al principio del array */}
      {[
        ...lineas.filter((line) => line.name === 'waterproof'),
        ...lineas.filter((line) => line.name !== 'waterproof'),
      ].map((line) => {
        const uniqueProductsForLine = products.filter((product) => product.line === line.name);

        if (uniqueProductsForLine.length === 0) {
          return null; // No renderizar el carrusel si no hay productos únicos para esta línea
        }

        return (
          <div key={line.name}>
            <Swiper
              tag='section'
              className='line-swiper'
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 6000 }}
              loop
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                if (window.innerWidth < 850) {
                  swiper.params.slidesPerView = 1;
                  swiper.params.centeredSlides = true;
                }
              }}
            >
              {uniqueProductsForLine.map((product, index) => {

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
                // Obtener la primera URL de la matriz img_url
                const coverImage = Array.isArray(product.img_url) && product.img_url.length > 0 ? product.img_url[0] : '/path/to/default-image.jpg';

                return (
                  <SwiperSlide className='main-banner-slide' key={index}>
                    <div className="product">
                      <div className="left">
                        <div className="line-logo-wrapper">
                          <Image src={line.logo} alt={line.name} fill />
                        </div>
                        <p className="sku">{product.sku}</p>
                        <p className="title">{product.shortDesc}</p>
                        <p className="desc">{product.longDesc}</p>
                        <Link href={`/productos/${product.sku}`}>
                          Ver más
                        </Link>
                      </div>
                      <div className="right">
                        <Image hor={product.sku === 'AW-T2022' ? 'true' : 'false'} src={coverImage} alt={product.sku} fill />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* Agregar la imagen de fondo específica de la línea */}
              <Image className='line-background' src={line.background} alt='line background' fill />
            </Swiper>
          </div>
        );
      })}
    </>
  );
}
