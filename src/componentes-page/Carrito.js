import React from 'react';
import { Button, Form, Container, Col, Row, Table } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useCart } from 'react-use-cart';
import { useThemeHook } from '../componentes/ThemePage';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const Carrito = () => {
  //Bootstrap offcanvas
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [theme] = useThemeHook();
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [mail, setMail] = useState("")
  const [mail2, setMail2] = useState("")
  const [orderMessage, setOrderMessage] = useState('')

  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();


  function sendOrder(event) {
    event.preventDefault()
    const date = new Date();
    const order = {
      buyer: {
        "nombre": name,
        "telefono": phone,
        "mail": mail,
      },
      "items": items,
      "Valor Total": cartTotal,
      "Fecha": date
    }
    console.log(order)
    const db = getFirestore();


    const ordersCollection = collection(db, "orders");
    if (mail !== mail2) {
      setOrderMessage('Los mails no concuerdan')
    } else if (mail === "" || name === "" || phone === "") {
        setOrderMessage('Llene todos los campos')
    } else if (items.length === 0) {
      setOrderMessage("El carrito esta vacio")
    } else {
    addDoc(ordersCollection, order).then(({ id }) =>
      setOrderMessage(`Orden enviada, su numero es: ${id}`),
      emptyCart(),
    )

    }




  }
  return (
    <Container className="py-4 mt-5">
      <h1 className={`${theme ? 'text-light' : 'text-light-primary'} my-5 text-center`}>
        {isEmpty ? 'Su carro esta vacio' : 'Carrito'}
      </h1>
      <Row className="justify-content-center">
        <Table responsive="sm" striped bordered hover variant={theme ? 'dark' : 'light'} className="mb-5">
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div style={{
                      background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <div style={{ padding: '.5rem' }}>
                        <img src={item.image} style={{ width: '4rem' }} alt={item.title} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis' }}>
                      {item.title}
                    </h6>
                  </td>
                  <td>$ {item.price}</td>
                  <td>Cantidad ({item.quantity})</td>
                  <td>
                    <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="ms-2">-</Button>
                    <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="ms-2">+</Button>
                    <Button variant="danger" onClick={() => removeItem(item.id)} className="ms-2">Limpiar</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {!isEmpty &&
          <Row
            style={{ position: 'fixed', bottom: 0 }}
            className={`${theme ? 'bg-light-black text-light' : 'bg-light text-balck'} justify-content-center w-100`}
          >
            <Col className="py-2">
              <h4>Precio final: $ {cartTotal}</h4>
            </Col>
            <Col className="p-0" md={4}>
              <Button variant="danger"
                className="m-2"
                onClick={() => emptyCart()}
              >
                <BsCartX size="1.7rem" />
                Vaciar carrito
              </Button>
              <Button variant="success"
                className="m-2"
              >
                <BsCartCheck onClick={handleShow} size="1.7rem" />

                Comprar!
              </Button>
            </Col>
          </Row>}
      </Row>
      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tu Mail</Form.Label>
              <Form.Control onChange={e => setMail(e.target.value)} type="email" placeholder="Ingresa tu mail" />
              <Form.Text className="text-muted">
                No compartiremos este mail con nadie mas.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mail de confirmacion</Form.Label>
              <Form.Control onChange={e => setMail2(e.target.value)} type="email" placeholder="Ingresa nuevamente tu mail" />
              <Form.Text className="text-muted">
                Ingresa nuevamente tu mail para verificar que este correcto.
              </Form.Text>
            </Form.Group>

   <Form.Group className="mb-3" >
              <Form.Label>Telefono</Form.Label>
              <Form.Control  onChange={e => setPhone(e.target.value)} type="email" placeholder="Ingresa tu telefono" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Nombre" />
            </Form.Group>
          
            <Button variant="primary" onClick={sendOrder}>
              Enviar orden
            </Button>
          </Form>
            <h2 className='m-4'>{orderMessage}</h2>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Carrito;
