import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Avatar, Divider, Rate } from 'antd';

const CommentCard = (props) => {
    return (
        <Row>
            <Col lg={1}>
                <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large">
                    {props.user.charAt(0) + '.' }
                </Avatar>
            </Col>
            <Col>
                <div className='d-flex justify-content-between mb-3'>
                    <div>
                        <span>{props.user}</span><br />
                        <small>{props.date}</small>
                    </div>
                    <div>
                        <Rate disabled value={props.rating} style={{ fontSize: '0.9em' }} />
                    </div>
                </div>
                <span className="mt-3">{props.comment}</span>
            </Col>
            <Divider />
        </Row>

    )
}

export default CommentCard