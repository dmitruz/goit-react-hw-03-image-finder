import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./Components/Searchbar/Searchbar"
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import fetchImages from "./Helpers/images-api"
import Modal from "./Components/Modal/Modal";


class App extends Component {
  state = {
    searchQuery: "",
    images: [],
    page: 1,
    showModal: false,
    loadMore: false,
    largeImageURL: "",
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const { page } = this.state;
    if (prevQuery !== nextQuery) {
      this.setState({ images: [], page: 1, status: "pending" });

      this.getImgFromFetch(nextQuery, page);
    }
    if (prevState.page !== page && page !== 1) {
      this.getImgFromFetch(nextQuery, page);
    }
  }

  getImgFromFetch = (searchQuery, pageNumber) => {
    fetchImages(searchQuery, pageNumber)
      .then((images) => {
        if (!images.hits.length) {
          alert("Картинка не найдена");
          this.setState({
            error: "Ошибка, попробуйте еще раз",
            status: "rejected",
          });
        } else {
          const data = images.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => {
              return {
                id,
                webformatURL,
                tags,
                largeImageURL,
              };
            }
          );
          this.setState((prevState) => ({
            images: [...prevState.images, ...data],
            status: "resolved",
            loadMore: true,
          }));
        }
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) =>
        this.setState({
          error,
          status: "rejected",
        })
      );
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, page: 1 });
  };

  onClickButton = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (largeImageURL) => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, status, showModal, largeImageURL, loadMore } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === "pending" && (
          <>
            <ImageGallery images={images} onImageClick={this.onImageClick} />
            <Loader />
          </>
        )}

        {status === "resolved" && (
          <>
            <ImageGallery images={images} onImageClick={this.onImageClick} />
            {loadMore && <Button loadMore={this.onClickButton} />}
          </>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;