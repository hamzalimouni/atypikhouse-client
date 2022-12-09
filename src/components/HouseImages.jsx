import React, { useState } from 'react'
import bg from '../assets/img/bg.png';
import '../assets/css/CardHouse.css';
import { Col, Row, Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Image } from 'antd'

const HouseImage = (props) => {

    let images = props.images;
    let length = images.length;
    return (
        <Row>
            {length == 1 ?
                <Col className='p-1' style={{ maxHeight: 500 }}>
                    <Image src={images[0]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                </Col > :
                <>
                    {length < 3 ?
                        <Image.PreviewGroup>
                            <Col className='p-1' style={{ maxHeight: 500 }}>
                                <Image src={images[0]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                            </Col >
                            <Col className='p-1' style={{ maxHeight: 500 }}>
                                <Image src={images[1]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                            </Col >
                        </Image.PreviewGroup>
                        : length < 4 ?
                            <Image.PreviewGroup>
                                <Col className='p-1' style={{ maxHeight: 500 }}>
                                    <Image src={images[0]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                </Col >
                                <Col className='p-1' style={{ maxHeight: 500 }}>
                                    <Image src={images[1]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                </Col >
                                <Col className='p-1' style={{ maxHeight: 500 }}>
                                    <Image src={images[2]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                </Col >
                            </Image.PreviewGroup>
                            :
                            length < 5 ?
                                <Image.PreviewGroup>
                                    <Col className='p-1' style={{ maxHeight: 500 }}>
                                        <Image src={images[0]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                    </Col >
                                    <Col className='p-1' style={{ maxHeight: 500 }}>
                                        <Image src={images[1]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                    </Col >
                                    <Col className='p-1 position-relative' style={{ maxHeight: 500 }}>
                                        <Image src={images[2]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                        {length > 3 ? <div style={{
                                            "position": "absolute",
                                            "top": "50%",
                                            "left": "50%",
                                            "fontSize": "2em",
                                            "color": "white",
                                            "background": "#00000082",
                                            "transform": "translate(-50%, -50%)",
                                            "width": "97%",
                                            "height": "97%",
                                            "borderRadius": "10px",
                                            "textAlign": "center",
                                            "display": "flex",
                                            "justifyContent": "center",
                                            "flexDirection": "column"
                                        }}
                                        >+1</div> : null}
                                    </Col >
                                    <Image src={images[3]?.image} style={{ display: 'none' }} />

                                </Image.PreviewGroup>
                                :
                                <Image.PreviewGroup>
                                    <Col className='p-1' style={{ maxHeight: 500 }}>
                                        <Image src={images[0]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', height: '100%', borderRadius: 10 }} />
                                    </Col >
                                    <Col>
                                        <Row>
                                            <Col className='p-1' style={{ maxHeight: 250 }}>
                                                <Image src={images[1]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 10 }} />
                                            </Col>
                                            <Col className='p-1' style={{ maxHeight: 250 }}>
                                                <Image src={images[2]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 10 }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='p-1' style={{ maxHeight: 250 }}>
                                                <Image src={images[3]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 10 }} />
                                            </Col>
                                            <Col className='p-1 position-relative' style={{ maxHeight: 250 }}>
                                                <Image src={images[4]?.image} className='img-fluid' width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 10 }} />
                                                {length > 5 ? <div style={{
                                                    "position": "absolute",
                                                    "top": "50%",
                                                    "left": "50%",
                                                    "fontSize": "2em",
                                                    "color": "white",
                                                    "background": "#00000082",
                                                    "transform": "translate(-50%, -50%)",
                                                    "width": "97%",
                                                    "height": "97%",
                                                    "borderRadius": "10px",
                                                    "textAlign": "center",
                                                    "display": "flex",
                                                    "justifyContent": "center",
                                                    "flexDirection": "column"
                                                }}
                                                >+{length - 5}</div> : null}

                                                {[...Array(length - 5)].map((x, i) =>
                                                    <Image key={i} src={images[length - i - 1]?.image} style={{ display: 'none' }} />
                                                )}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Image.PreviewGroup>
                    }
                </>
            }

        </Row >

    )
}

export default HouseImage