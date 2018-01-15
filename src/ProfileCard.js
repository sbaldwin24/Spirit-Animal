import React, { PropTypes } from "react";
import FileInput from "react-file-input";
import { storage, database } from "./firebase";
import "./ProfileCard.css";

class ProfileCard extends React.Component {
  state = {
    uploadProgress: null
  };

  userRef = database.ref("users").child(this.props.uid);
  storageRef = storage.ref("user-images").child(this.props.uid);

  handleFileUpload = e => {
    const file = e.target.files[0];
    const uploadTask = this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type });

    uploadTask.on("state_changed", snapshot => {
      const uploadProgress =
        snapshot.bytesTransferred / snapshot.totalBytes * 100;
      this.setState({ uploadProgress });
    });

    uploadTask.then(snapshot => {
      this.userRef.set({
        imageURL: snapshot.downloadURL,
        imageName: file.name
      });
      this.setState({ uploadProgress: null });
    });
  };

  handleFileRemoval = () => {
    const { imageName } = this.props.user;

    this.storageRef
      .child(imageName)
      .delete()
      .then(() => {
        this.userRef.update({
          imageURL: null,
          imageName: null
        });
      });
  };

  render() {
    const {
      photoURL,
      displayName,
      email,
      imageURL,
      imageName
    } = this.props.user;
    const { uploadProgress } = this.state;

    return (
      <article className="UserProfile">
        {uploadProgress && (
          <div>
            <strong>Uploading</strong>: {Math.round(uploadProgress)}%
          </div>
        )}
        <img
          className="UserProfile--photo"
          src={imageURL || photoURL}
          alt={displayName}
        />
        <div className="UserProfile--identification">
          <h3 className="UserProfile--displayName">{displayName}</h3>
          <p className="UserProfile--email">{email}</p>
          <FileInput
            name="UserProfile--fileinput"
            accept=".png,.gif,.jpg"
            placeholder={imageName || "Spirit Animal Image"}
            className="UserProfile--upload"
            onChange={this.handleFileUpload}
          />
          {imageName && (
            <button onClick={this.handleFileRemoval}>Delete Image</button>
          )}
        </div>
      </article>
    );
  }
}

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

export default ProfileCard;
