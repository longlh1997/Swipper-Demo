import React, { FC, useCallback, useMemo, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

export type SlidePropsType = {
  id: string
  content: React.ReactNode
  onClick?: (id: string) => void
}

type Props = {
  slides: SlidePropsType[]
}

const Swiper: FC<Props> = ({ slides }) => {
  const { width, height } = useWindowSize()
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prevState) => Math.max(prevState - 1, 0))
  }, [])
  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prevState) => Math.min(prevState + 1, slides.length - 1))
  }, [slides.length])

  const tx = useMemo(() => {
    return Math.max(Math.min(currentSlide * width, width * slides.length), 0)
  }, [currentSlide, slides.length, width])

  return (
    <div className={'swiper-paper-root'}>
      <div
        className={`swiper-prev-btn ${currentSlide === 0 && 'arrow-disable'}`}
      >
        <div className={'arrow left'} onClick={handlePrevSlide} />
      </div>
      <div
        className={'swiper-wrapper'}
        style={{ transform: `translate3d(-${tx}px, 0px, 0px)` }}
      >
        {slides.map(({ id, content, onClick }) => (
          <div
            key={id}
            id={id}
            onClick={() => {
              if (onClick) onClick(id)
            }}
            className={'swiper-slide'}
            style={{
              width: width,
              height: height,
              cursor: !!onClick ? 'pointer' : 'initial',
            }}
          >
            {content}
          </div>
        ))}
      </div>
      <div
        className={`swiper-next-btn ${
          currentSlide === slides.length - 1 && 'arrow-disable'
        }`}
      >
        <div className={'arrow right'} onClick={handleNextSlide} />
      </div>
    </div>
  )
}

export default Swiper
