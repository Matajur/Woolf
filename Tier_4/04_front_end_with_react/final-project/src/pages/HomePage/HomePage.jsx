import { useState } from "react";

import { ImageGallery, ImageModal } from "components";

import styles from "./HomePage.module.css";

const importImages = () => {
  const images = import.meta.glob("../../../readme-img/*.webp", {
    eager: true,
  });
  return Object.keys(images).map((path) => {
    const fileName = path.replace("../../../readme-img/", "").replace(".webp", "");
    return {
      src: images[path].default,
      alt: fileName.replace(/-/g, " "),
    };
  });
};

const images = importImages();

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    if (!isModalOpen) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <h1 className={styles.title}>
        Final assignment for the course Front-End Development with React
      </h1>
      <h2 className={styles.subtitle}>Description</h2>
      <p>
        Welcome! You are on the page of a multi-user web application that allows
        convenient storage and operation of personal contacts. The application
        supports all necessary operations with the contact collection, as well
        as registration, login and user update using JWT.
      </p>
      <h2 className={styles.subtitle}>FAQ</h2>
      <ul>
        <li>
          To be able to work with personal contacts, you must complete the
          registration procedure.
        </li>
        <li>
          To complete the registration, you can use any fake email, which must
          only match the specified template example@email.com.
        </li>
        <li>
          The application is very user-friendly and immediately provides all the
          necessary hints when performing incorrect actions.
        </li>
      </ul>
      <h2 className={styles.subtitle}>Technologies used</h2>
      <ImageGallery images={images} onImageClick={openModal} />
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClickClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};
