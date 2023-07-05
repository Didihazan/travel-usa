import '../../App.css';
import Layout from '../Layout';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../Gallery.css';

const images = [
    {
        id: 1,
        src: "/images/login.jpg",
        caption: 'Image 1',
    },
    {
        id: 2,
        src: "/images/login.jpg",
        caption: 'Image 2',
    },
    {
        id: 3,
        src: "/images/login.jpg",
        caption: 'Image 3',
    },
    {
        id: 4,
        src: "/images/login.jpg",
        caption: 'Image 4',
    },
    {
        id: 5,
        src: "/images/singup.jpg",
        caption: 'Image 5',
    },
    {
        id: 6,
        src: "/images/singup.jpg",
        caption: 'Image 6',
    },
    {
        id: 7,
        src: "/images/singup.jpg",
        caption: 'Image 7',
    },
    {
        id: 8,
        src: "/images/img-2.jpg",
        caption: 'Image 8',
    },
    {
        id: 9,
        src: "/images/img-1.jpg",
        caption: 'Image 9',
    },
    {
        id: 10,
        src: "/images/img-2.jpg",
        caption: 'Image 10',
    },
    {
        id: 11,
        src: "/images/img-1.jpg",
        caption: 'Image 11',
    },
    {
        id: 12,
        src: "/images/img-2.jpg",
        caption: 'Image 12',
    },

];

const Gallery = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [openImageIndex, setOpenImageIndex] = useState(null);

    const handleClick = (index) => {
        setStartIndex(index);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleImageClick = (index) => {
        setOpenImageIndex(openImageIndex === index ? null : index);
    };

    const getVisibleImages = () => {
        const endIndex = (startIndex + 4) % images.length;
        if (startIndex < endIndex) {
            return images.slice(startIndex, endIndex);
        } else {
            return [...images.slice(startIndex), ...images.slice(0, endIndex)];
        }
    };

    return (
        <Layout>
        <div className="gallery-container">
            {openImageIndex !== null && (
                <div className="fullscreen-image-overlay" onClick={() => handleImageClick(openImageIndex)}>
                    <img src={images[openImageIndex].src} alt={images[openImageIndex].caption} />
                </div>
            )}
            <h4>Choose your Vacation</h4>
            <div className="gallery">
                {getVisibleImages().map((image, index) => (
                    <div className="gallery-item" key={image.id} onClick={() => handleImageClick(index)}>
                        <img src={image.src} alt={image.caption} />
                        <div className="caption">{image.caption}</div>
                    </div>
                ))}
            </div>
            <div className="navigation-arrows">
        <span className="arrow-left" onClick={handlePrev} disabled={startIndex === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
                <span className="arrow-right" onClick={handleNext} disabled={startIndex + 4 >= images.length}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
            </div>
        </div>
        </Layout>
    );
};

export default Gallery;