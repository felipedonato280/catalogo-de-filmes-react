import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './midias/logo.png';
import { MovieCard } from './style.js';

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
            });
    }, [KEY]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar bg="body-tertiary" expand="lg" className="bg-body-tertiary">
                <Container fluid className="d-flex justify-content-between w-100 mx-5">
                    <Navbar.Brand href="#">
                        <img src={logo} width="50" height="50" alt="StarFilm Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" active>Home</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {/* Botão 'Search' removido */}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Container className="mt-5">
                <Row className="g-4">
                    {filteredMovies.map(movie => (
                        <Col md={6} lg={4} xl={3} key={movie.id}>
                            <MovieCard>
                                <img
                                    src={`${imagePath}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="img-fluid rounded mb-2"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <span className="fw-bold fs-6 text-center mb-2 text-white">{movie.title}</span>
                                <Link to={`/${movie.id}`} className="stretched-link"></Link>
                            </MovieCard>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Home;