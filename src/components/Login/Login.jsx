import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Logo from '../../assets/cchi-logo.svg'
import './Login.scss'

const Login = () => {
    return (
        <Container className='login d-flex justify-content-center align-items-center'>
            <Row>
                <Col className='card'>
                    <img alt='' src={Logo} />
                    <Row className='mt-5'>
                        <Col>
                            <h4>يتم الآن تسجيل الدخول</h4>
                            <Spinner className='mt-4' animation="border" color='#000' size='lg' />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
