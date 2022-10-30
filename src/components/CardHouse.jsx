import React from 'react'
import bg from '../assets/img/bg.png';
import '../assets/css/CardHouse.css';

const CardHouse = () => {
    return (
        <div>
            <div className="box">
                <img src={bg} alt="" />
                <div className="content">
                    <h3>Test Title</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit</p>
                </div>
                <div className="info">
                    <a href="">Read More</a>
                    <div className="rate">
                        <span>star-icon </span>
                        <span>rating</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHouse