import EditProducts from '../../components/EditProducts/EditProducts';
import Head from 'next/head';
import { useRouter } from 'next/router';

const EditProductPage = () => {
    const router = useRouter();
    const { id, category } = router.query; // Obtén id y category desde la URL

    return (
        <>
            <Head>
                <title>Editar producto</title>
            </Head>
            {id && category && <EditProducts productId={id} category={category} />} {/* Pasa id y category como props */}
        </>
    );
};

export default EditProductPage;
