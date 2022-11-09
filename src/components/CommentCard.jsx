import React from 'react'
import { Card, Image } from 'react-bootstrap'

const CommentCard = (props) => {
    return (
        <Card className='my-2'>
            <div className="user-info m-2 d-flex justify-content-start align-items-center">
                <Image src={props.userImage} className="rounded-4 m-1" height="50px" width="50px" />
                <Card.Text className='mx-3'>{props.userName}</Card.Text>
            </div>
            <Card.Body>{props.comment}</Card.Body>
        </Card>
    )
}

export default CommentCard