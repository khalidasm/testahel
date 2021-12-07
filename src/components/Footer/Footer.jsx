import React from 'react'
import { Container, Row , Col } from 'react-bootstrap'
import Logo from '../../assets/cchi-logo 2.svg'
import './Footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
        <hr />
        <Container>
        <Row>
        <Col>
        <div>
        <span className='me-3'>جميع الحقوق محفوظة © لمجلس الضمان الصحي التعاوني 2021</span>
        <img src={Logo} />
        </div>
        </Col>
        </Row>
        </Container>
        </div>
    )
}

export default Footer
