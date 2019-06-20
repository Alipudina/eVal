import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Carousel from "./Carousel";

// import { Container } from 'react-bootstrap';

export default class LandingPage extends Component {
    render() {
        return (
            <>
                <NavLink to="/login" className="  btn btn-primary float-right">LogIn/SignUp</NavLink>
                <div className="landingPage">
                    <h1> Welcome to eVal</h1>
                    <div className="">
                        <p className="pPitch">
                            eVAL is an easy, convenient and intuitive tool to create your own evaluation test.
                            With eVAL you can create your own questions and choose the type of answer that best fits
                            your needs: Yes/No, Multiple Choice or Scrambled Text.             Store different set of tests to apply whenever you need.
                           Send the link of a test to anyone, by e-mail, and receive the results once they’ve finished.            eVAL, as simple as that!
                        </p>
                    </div>
                    <div className="carouselContainer">
                        <Carousel />
                    </div>
                    <h1>What Our Clients Say</h1>
                    <div className="secondPitch">
                        <div className="card">
                            <img className="clientImg" src="https://cdn-images-1.medium.com/max/2400/0*KR0lpn7XYPGo1KBo.jpg" />
                            <h1 className="clientQuate">For me it's obvious E=eVal</h1>
                            <p className="clientName">— Albert Einstein</p>
                        </div>
                        <div className="card">
                            <img className="clientImg" src="data:image/jpeg;base64,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" />
                            <h1 className="clientQuate">Building a successful team only with eVal</h1>
                            <p className="clientName">— Linus Torvalds</p>
                        </div>
                        <div className="card">
                            <img className="clientImg" src="https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2015/03/05/bill-gates.jpg" />
                            <h1 className="clientQuate">Couldn't ask for more</h1>
                            <p className="clientName">— Bill Gates</p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}



// export default class LandingPage extends Component {
//     render() {
//         return (
//             <>
//                 <NavLink to="/login" className="  btn btn-primary float-right">LogIn/SignUp</NavLink>
//                 <div className="landingPage Container mt-5">
//                     <h1> LandingPage</h1>
//                     <div className="">
//                         <p className="Card w-50 mx-auto my-5">
//                             eVAL is an easy, convenient and intuitive tool to create your own evaluation test.
//                             With eVAL you can create your own questions and choose the type of answer that best fits
//                             your needs: Yes/No, Multiple Choice or Scrambled Text.             Store different set of tests to apply whenever you need.
//                            Send the link of a test to anyone, by e-mail, and receive the results once they’ve finished.            eVAL, as simple as that!
//                         </p>
//                     </div>
//                 </div>


//             </>
//         )
//     }
// }
