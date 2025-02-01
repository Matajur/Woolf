import { useEffect, useState } from "react";
import { fetchImages } from "./api/api-unsplash";
import {
  SearchBar,
  ErrorMessage,
  ImageGallery,
  Loader,
  LoadMoreBtn,
  ImageModal,
} from "components";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setData([]);
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const newData = await fetchImages(searchQuery, page);

        setData((prevData) => {
          return [...prevData, ...newData];
        });
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, page]);

  const handlePage = () => {
    setPage(page + 1);
  };

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
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {data.length > 0 && (
        <ImageGallery images={data} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {data.length > 0 && <LoadMoreBtn onClick={handlePage} />}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClickClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
