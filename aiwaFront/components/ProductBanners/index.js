import Image from "next/legacy/image";

export default function ProductBanners({ banners, line }) {
  // Verificar si banners es una cadena de texto JSON y convertirla en un objeto JSON
  if (typeof banners === 'string') {
    try {
      banners = JSON.parse(banners);
    } catch (error) {
      console.error('Error parsing banners:', error);
      return null;
    }
  }

  // Verificar si banners es un array
  if (!Array.isArray(banners)) {
    console.error('banners is not an array:', banners);
    return null;
  }

  return (
    <section className='product-banners' line={line}>
      {banners.map((e, i) => (
        <div className={`product-banner ${i % 2 === 0 && 'inv'}`} key={e.title}>
          <div className='img-wrapper'>
            <Image src={e.img} alt={e.title} width='800' height='350' sizes='100vw' priority={e.priority ? 'true' : 'false'} />
          </div>
          <div className='text'>
            <h3>{e.title}</h3>
            <p>{e.desc}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
