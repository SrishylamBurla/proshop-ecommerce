import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>Copyright &copy; {year}</p>
                </Col>
            </Row>
        </Container>
    </footer>
    
  )
}

export default Footer