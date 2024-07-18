import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps={
    pageSize:12,
    country:"in",
    category:"general"
  }
  static propTypes={
    pageSize:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string
  }
  constructor(props){
    super(props);
    this.state={
      articles: [],
      page:1,
      loading:true,
      totalResults:0
    }
    document.title = `AKS News - ${this.capitalizeFunc(this.props.category)} category`
  }
  async updateNews(){
    this.props.setProgress(10);
    this.setState({loading:true});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    // console.log(this.state.articles.length)
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
  }
  handlePrev=async()=>{
    this.setState({page: this.state.page -1});
    this.updateNews();
  }
  handleNext=async()=>{
    if(this.state.page +1 <= Math.ceil(this.state.totalResults/this.props.pageSize)){
      this.setState({page:this.state.page +1});
      this.updateNews();
    }
  }
  capitalizeFunc =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  fetchMoreData= async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(this.state.articles.length)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      page:this.state.page +1
    })
  }
  render() {
    return (
      <>
        <h1 style={{textUnderlinePosition:"under", marginTop:"75px"}} className="text-center"><u>{`AKS News - ToP ${this.capitalizeFunc(this.props.category)} Headlines`}</u></h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="container my-4">
        <div className="row my-3">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt}/>
          </div>
        })}
          </div>
      </div>
        </InfiniteScroll>
      </>
    )
  }
}
