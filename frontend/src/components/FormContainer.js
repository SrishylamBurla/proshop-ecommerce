import { Col, Container, Row } from "react-bootstrap";


const FormContainer = ({children}) => {
  return (
    <Container >
        <Row className="justify-content-md-center">
            <Col sm={12} md={6} lg={4}>
                {children}
            </Col>
        </Row>

    </Container>
  )
}

export default FormContainer