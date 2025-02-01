import { HiUser } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";

import { ConfirmationModal, EditContactModal } from "components";

import styles from "./Contact.module.css";

export const Contact = ({ id, name, number, deleteContact, editContact }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditConfirm = (updatedContact) => {
    editContact(id, updatedContact);
    closeEditModal();
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteContact(id);
    closeDeleteModal();
  };

  return (
    <div className={styles.contactWrapper}>
      <div>
        <p className={styles.contactName}>
          <HiUser className={styles.userIcon} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={styles.phoneIcon} />
          {number}
        </p>
      </div>
      <button type="button" onClick={openDeleteModal}>
        Delete
      </button>
      <button type="button" onClick={openEditModal}>
        Edit
      </button>

      {isEditModalOpen && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contact={{ name, number }}
          onConfirm={handleEditConfirm}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          message="Are you sure you want to delete this contact?"
        />
      )}
    </div>
  );
};
