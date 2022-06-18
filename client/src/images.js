import React from "react";
import apiService from "./apiService";
import { Link } from "react-router-dom";


class UserImages extends React.Component {
  constructor() {
    super()
    this.state = {
     images: null
    }
  }

  componentDidMount(){
    let imgs = apiService.import.retrieveImage()
    this.setState({images:imgs})
    console.log(imgs)
    }

  render() {
    return(
    <div>
     <div>Your Images</div>
     <Link to="/">Home</Link>|{" "}
     <Link to="/upload">Upload New Files </Link> |{" "}
    </div>
  )}}


export default UserImages
