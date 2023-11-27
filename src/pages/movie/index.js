import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                const res = data.results;
                let filme = res.find((key) => key.id.toString() === id);
                setMovie(filme);
            });
    }, [id, KEY]);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>
                                <strong>Data de lançamento:</strong> {movie.release_date}
                            </Card.Text>
                            <Card.Text>
                                {movie.overview}
                            </Card.Text>
                            <Link to="/" className="d-grid gap-2">
                                <Button variant="primary" size="lg">Voltar</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Movie;
