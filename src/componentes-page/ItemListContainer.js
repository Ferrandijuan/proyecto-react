import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useThemeHook } from '../componentes/ThemePage';

    const Home = () => {
        const [theme] = useThemeHook();


        return (
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                        <h1 className={theme? 'text-light my-5': 'text-black my-5'}>Encuentra tu producto!</h1>
                    </Col>
                </Row>
            </Container>
        );
};

export default Home;