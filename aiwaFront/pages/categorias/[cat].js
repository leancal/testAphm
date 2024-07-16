import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryMainBanner from "../../components/CategoryMainBanner";
import NotFound from "../../components/NotFound";
import Head from "next/head";
import CategoryLineSwiper from "../../components/CategoryLineSwiper";
import CategorySwiper from "../../components/CategorySwiper";
import { lvTwoCat, lvOneCat } from "../../content/categories";
import { productGroups } from "../../content/groups";
import CookSearch from "../../components/CookSearch";
import lineas from '../../content/lineas';

export default function Category({ lvTwoCat, lvOneCat }) {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { cat } = router.query; // Obtener cat directamente de useRouter
  let lineArr = [];
  const category = lvTwoCat.find((e) => e.route === `/categorias/${cat}`);
  const [error, setError] = useState(null);
  const isLvOneCategory = lvOneCat.some((lvOneCategory) => cat === lvOneCategory.route.replace('/categorias/', ''));
  let lvOneCategory = null;

  if (isLvOneCategory) {
    lvOneCategory = lvOneCat.find((lvOneCategory) => cat === lvOneCategory.route.replace('/categorias/', ''));
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        let apiRoute;
        switch (cat) {
          case 'parlantes':
          case 'torres-de-sonido':
          case 'in-ear':
          case 'on-ear':
            apiRoute = '/api/audio';
            break;
          case 'cook':
            apiRoute = '/api/cooks';
            break;
          case 'notebooks':
            apiRoute = '/api/notebooks';
            break;
          case 'tablets':
            apiRoute = '/api/tablets';
            break;
          default:
            // Si no se encuentra la categoría, lanzar un error
            throw new Error('Categoría no válida');
        }

        const res = await fetch(apiRoute);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        console.log('Productos obtenidos:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      }
    }

    fetchProducts();
  }, [cat]);


  // Dentro del bloque que maneja las categorías de nivel 1
  if (isLvOneCategory) {


    return (
      <>
        <Head>
          <title>{`Cooks | Aiwa Electronics`}</title>
        </Head>
        <main id={`categorias ${cat}`}>
          <CategoryMainBanner
            banner={{
              img: lvOneCategory.img,
              alt: lvOneCategory.name,
              noText: lvOneCategory.noTextOnCategoryBanner,
              text: {
                title: lvOneCategory.name,
                subtitle: lvOneCategory.desc,
                align: lvOneCategory.categoryBannerTextPos?.[1] || 'left',
                valign: lvOneCategory.categoryBannerTextPos?.[0] || 'center',
              },
            }}
            isFirst={true}
          />
          <section className="product-list">
            <ul>
              <CookSearch products={products} />
            </ul>
          </section>
        </main>
      </>
    );
  }



  if (!category) {
    return <NotFound desc={`No se ha encontrado la categoría "${cat}"`} />;
  }
  if (error) {
    return <p>Error: {error.message}</p>; // Renderizar un mensaje de error con el mensaje específico del error
  }



  console.log('ID de la categoría:', category.id); // Verifica el ID de la categoría
  console.log('Productos antes del filtro:', products); // Verifica todos los productos antes del filtro

  // Filtrar productos según la segunda categoría
  const filteredProducts = products.filter(product => product.secondCategories.includes(category.id));
  console.log('Productos después del filtro:', filteredProducts); // Verifica los productos después del filtro

  const categoryObj = {
    // Formatea la data para el componente MainBanner
    img: category.img,
    alt: category.name,
    noText: category.noTextOnCategoryBanner,
    text: {
      title: category.name,
      subtitle: category.desc,
      align: category.categoryBannerTextPos ? category.categoryBannerTextPos[1] : "left",
      valign: category.categoryBannerTextPos ? category.categoryBannerTextPos[0] : "center",
    },
  };

  if (filteredProducts.every((e) => e.line)) {
    filteredProducts.forEach((e) => {
      const line = lineArr.find((f) => f == e.line);
      if (!line) {
        lineArr.push(e.line);
      }
    });
  }

  // if (prod.every((e) => e.line)) {
  //   prod.forEach((e) => {
  //     const line = lineArr.find((f) => f == e.line);
  //     if (!line) {
  //       lineArr.push(e.line);
  //     }
  //   });
  // }

  function selectGroup(cat, groups) {
    switch (cat) {
      case 'parlantes':
        return groups.parlantes;
      case 'torres-de-sonido':
        return groups.torres;
      case 'in-ear':
        return groups.in_ear;
      case 'on-ear':
        return groups.on_ear;
      case 'notebooks':
        return groups.notebooks;
      case 'tablets':
        return groups.tablets;
      case 'discontinuos':
        return groups.discontinuos;
      case 'cook':
        return groups.cook;
      default:
        return null;
    }
  }

  return (
    <>
      <Head>
        <title>{`${category.name} | Aiwa Electronics`}</title>
      </Head>
      <main id={`categorias ${cat}`}>
        <CategoryMainBanner banner={categoryObj} />
        <section className="swiper-categorias">
          {lineArr.length > 0
            ? lineArr.map((e, i) => {
              const prods = filteredProducts.filter(f => e == f.line)
              return <CategoryLineSwiper products={prods} key={i} />
            })
            : <CategorySwiper products={filteredProducts} />


          }
        </section>
      </main>
    </>
  )

}

export async function getStaticProps() {
  return {
    props: { lvTwoCat, lvOneCat },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { cat: 'parlantes' } },
      { params: { cat: 'torres-de-sonido' } },
      { params: { cat: 'in-ear' } },
      { params: { cat: 'on-ear' } },
      { params: { cat: 'tablets' } },
      { params: { cat: 'notebooks' } },
      { params: { cat: 'discontinuos' } },
      { params: { cat: 'yogurteras' } },
      { params: { cat: 'cook' } },
    ],
    fallback: false, // también puede ser true o 'blocking'
  };
}