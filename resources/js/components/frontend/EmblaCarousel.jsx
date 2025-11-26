// EmblaCarousel.jsx
import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
  const { 
    slides, 
    options, 
    plugins = [],
    renderSlide,
    PrevButton: CustomPrevButton,
    NextButton: CustomNextButton
  } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

 

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  // Default slide renderer if none provided
  const defaultRenderSlide = (slide, index) => (
    <div className="embla__slide" key={index}>
      <div className="embla__slide__number">{index + 1}</div>
    </div>
  )

  const slideRenderer = renderSlide || defaultRenderSlide

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => slideRenderer(slide, index))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          {CustomPrevButton ? (
            <CustomPrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          ) : (
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          )}
          {CustomNextButton ? (
            <CustomNextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          ) : (
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          )}
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel;