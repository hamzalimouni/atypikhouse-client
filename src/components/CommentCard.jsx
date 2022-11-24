import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { Avatar, Divider, Rate, message, Popconfirm } from 'antd';
import { API_URL } from '../Variables';
import Cookies from 'js-cookie'

const CommentCard = (props) => {
    return (
        <Row>
            <Col xs={1}>
                <Avatar style={{ backgroundColor: '#F97316', verticalAlign: 'middle' }} size="large">
                    {(props.user.charAt(0) + '.').toUpperCase()}
                </Avatar>
            </Col>
            <Col>
                <div className='d-flex justify-content-between mb-3'>
                    <div>
                        <span>{props.user} </span>
                        {props.id ?
                            <Popconfirm title="Voulez-vous vraiment supprimer ce commentaire?" onConfirm={() =>
                                fetch(API_URL + '/reviews/' + props.id, {
                                    method: 'DELETE',
                                    headers: {
                                        'Authorization': 'bearer ' + Cookies.get("token"),
                                        'Content-Type': 'application/merge-patch+json'
                                    }
                                })
                                    .then(
                                        (result) => {
                                            if (result.status == 204) {
                                                message.success('Commmentaire supprimée avec succès');
                                                props.reload()
                                            } else {
                                                message.error('Impossible de supprimer le commentaire, veuillez ressayer plus tard');
                                            }
                                        }
                                    )
                            } onOpenChange={() => console.log('open change')}>
                                <small className='text-danger'>Supprimer le commentaire</small>
                            </Popconfirm> : null}
                        <br />
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