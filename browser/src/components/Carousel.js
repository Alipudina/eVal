import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
    <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false} >
        <div className="carousel" >
            <img className="carouselImg" src="http://footage.framepool.com/shotimg/qf/618827771-literature-school-book-bookshelf-homework.jpg" />

        </div>
        <div className="carousel" >
            <img className="carouselImg" src="https://ugc.futurelearn.com/uploads/images/b7/9f/b79f2a50-2b35-42cf-9fbb-b307139aebc8.jpg" />

        </div>
        <div className="carousel" >
            <img className="carouselImg" src="https://www.gannett-cdn.com/presto/2019/05/14/USAT/6717a231-f65a-48f9-ba0d-4486a3785a71-gradpic.jpg?crop=4991,2807,x0,y0&width=3200&height=1680&fit=bounds" />

        </div>
        <div className="carousel" >
            <img className="carouselImg" src="https://www.todaysparent.com/wp-content/uploads/2016/06/how-to-get-the-teacher-you-want-960x1280.jpg" />

        </div>
    </Carousel>
);
