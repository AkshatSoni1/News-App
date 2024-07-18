import React, { Component } from 'react'
import noImg from '.././noimg.jpg'
export default class Newsitem extends Component {
  render() {
    let {title,description, imgUrl,url, author,publishedAt} = this.props;
    return (
    // <div className="card" style={{ margin:"1.5rem", border:"1px solid #828282",boxShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}>
    <div className="card" style={{ margin:"1.5rem", border:"1px solid #828282",boxShadow:" rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}}>
        <img src={imgUrl?imgUrl:noImg} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-body-secondary">By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
          <div className='text-center'>
          <a href={url} rel="noreferrer" target='_blank' className="btn btn-sm btn-outline-dark py-1 px-5">Read more</a>
          </div>
        </div>
    </div>
    )
  }
}
