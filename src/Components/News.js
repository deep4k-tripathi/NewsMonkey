import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"



const News=(props)=> {

  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)
  
  const capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  
  const updateNews=async()=> {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false) 
    props.setProgress(100)
  }

 useEffect(()=>{
  document.title=`NewsMonkey-${capitalizeFirstLetter(props.category)}`
  updateNews()
 },[])
  
  
  // const handleNextClick = async () => {\
  //   setPage(page+1)
  //   updateNews()
  // }

  // const handlePrevClick = async () => {
    //   setPage(page-1)
    //   updateNews()
  // }

  const fetchMoreData = async() => {
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey} &page=${page+1}&pageSize=${props.pageSize}`  
    setLoading(true)
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }
  
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{marginTop:"73px"}}>NewsMonkey - Top Headlines</h1>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element,index) => {
              return <div className="col-md-4" key={index}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
}

export default News

News.defaultProps={
  country:'in',
  pageSize:9,
  category:'general',
}
News.propTypes={
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}