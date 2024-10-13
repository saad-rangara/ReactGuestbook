const images = [
    { src:  '../images/1.jpg', alt: 'Outside close look of palace' },
    { src:  '../images/2.jpg', alt: 'Rainbow effect on palace' },
    { src:  '../images/3.jpg', alt: 'A room in the palace' },
    { src:  '../images/4.jpg', alt: 'Great looking pillars and ceiling of palace' },
    { src:  '../images/5.jpg', alt: 'Parallel look of walking area of palace' },
    { src:  '../images/6.jpg', alt: 'Side close look of pillars in palace' },
    { src:  '../images/7.jpg', alt: 'Stairs to go top of palace to access rooms' },
    { src:  '../images/8.jpg', alt: 'Outside far away look of palace' },
];

export default function ImageGallery(){
    return (
    <>
    <div className="images">
        {images.map((image, index) => (
            <div key={index} className="image">
                <img src={image.src} alt={image.alt} />
            </div>
        ))}
    </div>
    </>
)}