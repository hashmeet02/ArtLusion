import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Link from "next/link";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useRouter} from 'next/router';
import {useState} from 'react';

export default function MainNav(){
    const [searchTitle, setSearchTitle] = useState("")
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/artwork?title=true&q=${searchTitle}`)
    }

    return(
        <>        
        <Navbar bg="light" expand="lg" className="fixed-top navbar-dark bg-dark">
            <Container>
                <Navbar.Brand>Hashmeet Singh Saini</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/" legacyBehavior passHref><Nav.Link>Home</Nav.Link></Link>
                        <Link href="/search" legacyBehavior passHref><Nav.Link>Advanced Search</Nav.Link></Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {setSearchTitle(e.target.value)}}
                        />
                        <Button type="submit" variant="success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br/>
        <br/>
        </>
    );
}
