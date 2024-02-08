import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import PokemonCard from '../components/PokemonCard';
import { Container, Grid, Skeleton } from '@mui/material';
import axios from 'axios';
import { Skeletons } from '../components/Skeletons';


export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        getPokemons();
    }, [])

    const getPokemons = () => {
        var endpoints = [];

        // setTimeout(() => {
        for (var i = 1; i < 50; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
        // }, 2000)

    }

    const pokemonSearch = (name) => {
        var filteredPokemons = []
        if (name === "") {
            getPokemons();
        }

        // setTimeout(() => {
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i]);
            }
        }
        // }, 2000)
        setPokemons(filteredPokemons);
    }

    console.log(pokemons.length)

    return (
        <div>
            <NavBar pokemonSearch={pokemonSearch} />
            <Container>
                <Grid container spacing={3}>
                    {pokemons.length === 0 ?
                        // Array.from({ length: 20 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} >
                            <Skeletons />
                        </Grid>
                        // ))
                        :
                        pokemons.map((pokemon, key) => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                                <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
};
