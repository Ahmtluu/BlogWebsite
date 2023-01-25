import React,{useState} from 'react'
import { ImagePreview } from "../style";
import FolderIcon from "../assets/folder_icon_transparent.png";
import CloseIcon from "../assets/CloseIcon.svg";
import { Container,Modal,Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

export default function ProfileImageUploader({imageShow,currentImage,onHandleChange}) {
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);

    const { register, handleSubmit, setValue } = useForm();

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            setImage(e.target.result);
            setIsUploaded(true);
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      }



      const onImageSubmitHandle = async (formD) => {
        console.log("Update profile image")
       };

  return (
    <>

<Modal show={imageShow} size={"md"} onHide={onHandleChange} >
      <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container className="text-center">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={`http://localhost:3001/imagesProfile/${currentImage}`}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 250, height: 250 }}
                  />
                  <p style={{ color: "#444" ,marginTop:"8px" }}>Click to upload image</p>
                </label>

                <input
                hidden="true"
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />

                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                
              </ImagePreview>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onImageSubmitHandle)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>






        </>
  )
}
