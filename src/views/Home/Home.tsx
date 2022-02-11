import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './Home.scss';


const Home = () => {
    return (
        <Container>
            <div className='home'>
                <h1>Welcome to our forum</h1>
                <Link to="/posts">Check out some posts</Link>
            </div>
        </Container>
    );
}

export default Home;