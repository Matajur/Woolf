import React from "react";
import css from "./Testimonials.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "components/UI";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import PageTitle from "../PageTitle/PageTitle";

const Testimonials = ({ testimonials = [] }) => {
  return (
    <div className={css.wrapper}>
      <PageTitle
        title="Testimonials"
        subtitle="What our customer say"
        className={css.title}
      />
      <Icon className={css.icon} name="icon-quotes" />
      <Swiper
        modules={[Autoplay, Pagination]}
        className={css.carousel}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
      >
        {testimonials.map(({ id, testimonial, userName }) => (
          <SwiperSlide key={id} className={css.carouselItem}>
            <p className={css.testimonial}>{testimonial}</p>
            <p className={css.author}>{userName}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
