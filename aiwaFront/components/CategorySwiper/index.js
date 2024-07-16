import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image"
import Link from 'next/link'
//import { products } from '../../content/products';

export default function CategorySwiper({ products }) {
  console.log('Productos recibidos en CategorySwiper:', products);



  return (
    <>
      <Swiper
        tag='section'
        className={`cat-product-swiper`}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 6000 }}
        navigation
        pagination={{ clickable: true }}
      >
        {products.map((prod, i) => {

          if (typeof prod.img_url === 'string') {
            try {
              prod.img_url = JSON.parse(prod.img_url)
            } catch (error) {
              console.error('Error parsing imgUrls:', error);
              return null;
            }
          }
          if (!Array.isArray(prod.img_url)) {
            console.error('imgUrls is not an array:', prod.img_url);
            return null;
          }
          // Obtener la primera URL de la matriz img_url
          const coverImage = Array.isArray(prod.img_url) && prod.img_url.length > 0 ? prod.img_url[0] : '/path/to/default-image.jpg';

          return (
            <SwiperSlide className={`main-banner-slide`} key={i}>
              <div className="product">
                <div className="left">
                  <div className="wrapper">
                    <p className="title">{prod.shortDesc}</p>
                    <p className="sku">{prod.sku}</p>
                    <p className="desc">{prod.longDesc}</p>
                    <Link href={`/productos/${prod.sku}`}>
                      VER MÁS
                    </Link>
                  </div>
                  <Image src={`/components/CategorySwiper/patron-${prod.altBackground ? 'b' : 'n'}.webp`} alt='background' fill />
                </div>
                <div className={`right${prod.altBackground ? ' dark' : ''}`}>
                  <Image src={coverImage} alt={prod.sku} fill />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  )
}

