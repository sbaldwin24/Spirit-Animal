import React, { PropTypes } from "react";
import FileInput from "react-file-input";
import { storage, database } from "./firebase";
import "./ProfileCard.css";

class ProfileCard extends React.Component {
  storageRef = storage.ref("/user-images").child(this.props.uid);
  userRef = database.ref("/users").child(this.props.uid);

  handleSubmit = e => {
    const file = e.target.files[0];
    const uploadTask = this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type });

    uploadTask.then(snapshot => {
      this.userRef.child("photoURL").set(snapshot.downloadURL);
    });
  };

  render() {
    const { displayName, photoURL } = this.props.user;
    return (
      <article className="ProfileCard">
        <img className="ProfileCard--photo" src={photoURL} />
        <h3>{displayName}</h3>
        <FileInput
          accept=".png,.gif,.jpg"
          onChange={this.handleSubmit}
          placeholder="Select an image"
        />
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
