import React, {useState} from 'react';
import {FreeMode,Pagination,Scrollbar,Thumbs} from 'swiper';
import {Swiper as SwiperComp,SwiperSlide} from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import bookNoPoster from '../../../assets/img/book-no-poster.jpg';
import {API_URL} from '../../../books_api/books-api';
import {useScreenWidth} from '../../../context/screen-width-context';
import {IBookImage} from '../../../types/books';

import styles from './slider.module.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

interface SliderProps {
    images: IBookImage[]
}

export const Slider = ({ images }: SliderProps) => {
    const { screenWidth } = useScreenWidth();

    const [swiperActiveIndex, setSwiperActiveIndex] = useState<number>(0);
    const [thumbsSwiperTop, setThumbsSwiperTop] = useState<SwiperClass>();
    const [thumbsSwiperBottom, setThumbsSwiperBottom] = useState<SwiperClass>();

    const handleSlideTo = (index: number) => {
        if (thumbsSwiperTop) {
            thumbsSwiperTop.slideTo(index);
            thumbsSwiperTop.activeIndex = index;
        }
        if (thumbsSwiperBottom) {
            thumbsSwiperBottom.slideTo(index);
            thumbsSwiperBottom.activeIndex = index;
        }
        setSwiperActiveIndex(index);
    };

    return (
        <div className={styles.slider}>
            {images?.length === 1 && <img className={styles.onePoster} src={`${API_URL}${images[0].url}`} alt="poster"/>}
            {images?.length > 1
                && (
                <SwiperComp
                    data-test-id='slide-big'
                    pagination={{
                        enabled: true,
                        clickable: true
                    }}
                    spaceBetween={30}
                    onSwiper={setThumbsSwiperTop}
                    thumbs={{ swiper: thumbsSwiperBottom && !thumbsSwiperBottom.destroy ? thumbsSwiperBottom : null }}
                    onSlideChange={(swiper) => {
                        handleSlideTo(swiper.activeIndex);
                    }}
                    modules={[Thumbs, Pagination, FreeMode]}
                    grabCursor={true}
                    className="swiperTop"
                    breakpoints={{
                        871: {
                            pagination: {
                            enabled: false
                        }
                    }
                    }}
                >
                {images.map((elem) => (
                    <SwiperSlide key={elem.url}>
                        <img src={`${API_URL}${elem.url}`} alt='poster'/>
                    </SwiperSlide>
                ))}
                </SwiperComp>
                )}
            {!images?.length && <img className={styles.bookNoPoster} src={bookNoPoster} alt='book' />}
            {screenWidth > 870 && images?.length > 1
                &&
                <SwiperComp
                    scrollbar={{
                        hide: false,
                    }}
                    modules={[Thumbs, Scrollbar, FreeMode]}
                    thumbs={{ swiper: thumbsSwiperTop && !thumbsSwiperTop.destroy ? thumbsSwiperTop : null }}
                    onSwiper={setThumbsSwiperBottom}
                    threshold={5}
                    spaceBetween={30}
                    slidesPerView={5}
                    watchSlidesProgress={true}
                    className="swiperBottom"
                >
                    {images.map((elem, index) => (
                        <SwiperSlide onClick={() => handleSlideTo(index)} key={elem.url} data-test-id='slide-mini'>
                            <img className={index === swiperActiveIndex ? styles.active : ''} src={`${API_URL}${elem.url}`} alt='poster'/>
                        </SwiperSlide>
                    ))}
                </SwiperComp>
            }
        </div>
    );
};
