// resources/js/Components/CustomSliderSettings.jsx
import React from 'react'

export const PrevArrow = ({ className, onClick }) => (
    <button
        type="button"
        aria-label="Previous"
        className={className ? `slick-prev ${className}` : 'slick-prev'}
        onClick={onClick}
    />
)

export const NextArrow = ({ className, onClick }) => (
    <button
        type="button"
        aria-label="Next"
        className={className ? `slick-next ${className}` : 'slick-next'}
        onClick={onClick}
    />
)

const customSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [

        { breakpoint: 1920, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 1600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 1440, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 4 } },
        { breakpoint: 1024, settings: { slidesToShow: 3.5, slidesToScroll: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 820, settings: { slidesToShow: 2.5, slidesToScroll: 2, arrows: false, dots: false } },
        { breakpoint: 768, settings: { slidesToShow: 2.3, slidesToScroll: 2, arrows: false, dots: false } },
        { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2, arrows: false, dots: false } },
        { breakpoint: 480, settings: { slidesToShow: 1.7, slidesToScroll: 1, arrows: false, dots: false } },
        { breakpoint: 414, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: false } },
        { breakpoint: 420, settings: { slidesToShow: 1.4, slidesToScroll: 1, arrows: false, dots: false } },
        { breakpoint: 390, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: false } },
        { breakpoint: 380, settings: { slidesToShow: 1.2, slidesToScroll: 1, arrows: false, dots: false } },
        { breakpoint: 340, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: false } },
    ]

}

export default customSettings
