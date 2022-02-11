import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './Home.scss';

interface IProps {
    greeting: string;
}

const Home = (props: IProps) => {
    const {greeting} = props;

    useEffect(() => {
        console.log(`${greeting} ${Home.displayName}`);
    }, [greeting]);

    return (
        <Container>
            <div className='home'>
                <h1>Welcome to our forum</h1>
                <Link to="/posts">Check out some posts</Link>
            </div>
        </Container>
    );
}
Home.displayName = 'Home';
export default Home;