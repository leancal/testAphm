// pages/productos/[prod].js
import { useRouter } from 'next/router';
import Loading from "../../components/Loading";
import ProductContent from "../../components/ProductContent";
import Head from "next/head";
import texts from "../../content/texts";

export default function Producto({ prod, features, includes, featuredFeatures }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <>
      {prod && (
        <Head>
          <title>{prod.sku + texts.spacer + texts.aiwaElec}</title>
        </Head>
      )}
      <section className="product-page">
        {!prod ? <Loading /> : <ProductContent prod={prod} features={features} includes={includes} />}
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const apiUrl = process.env.API_URL;

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`${apiUrl}${endpoint}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const audio = await fetchData('/api/audio');
  const headsets = await fetchData('/api/headsets');
  const discontinuos = await fetchData('/api/discontinuos');
  const cooks = await fetchData('/api/cooks');
  const tablets = await fetchData('/api/tablets');
  const notebooks = await fetchData('/api/notebooks');
  const features = await fetchData('/api/features');
  const includes = await fetchData('/api/includes');
  const featuredFeatures = await fetchData('/api/featuredFeatures');

  const prod = audio.find((p) => p.sku === context.params.prod) ||
    headsets.find((p) => p.sku === context.params.prod) ||
    discontinuos.find((p) => p.sku === context.params.prod) ||
    cooks.find((p) => p.sku === context.params.prod) ||
    tablets.find((p) => p.sku === context.params.prod) ||
    notebooks.find((p) => p.sku === context.params.prod);

  if (!prod) {
    console.error(`Product not found: ${context.params.prod}`);
  }

  return {
    props: { prod, features, includes, featuredFeatures },
    revalidate: 60, // Regenerate the page every 60 seconds
  };
}

export async function getStaticPaths() {
  const apiUrl = process.env.API_URL;

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`${apiUrl}${endpoint}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const audio = await fetchData('/api/audio');
  const headsets = await fetchData('/api/headsets');
  const discontinuos = await fetchData('/api/discontinuos');
  const cooks = await fetchData('/api/cooks');
  const tablets = await fetchData('/api/tablets');
  const notebooks = await fetchData('/api/notebooks');

  const paths = [...audio, ...headsets, ...discontinuos, ...cooks, ...tablets, ...notebooks].map((p) => ({ params: { prod: p.sku } }));

  return {
    paths,
    fallback: false,
  };
}