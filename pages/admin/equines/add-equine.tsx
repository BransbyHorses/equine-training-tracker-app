import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import {
    Button,
    Select,
    Typography,
    Container,
    TextField,
    MenuItem,
    FormControl,
    Grid,
    InputLabel
} from '@mui/material';

interface WithRouterProps {
    router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

const NewEquine: React.FC<MyComponentProps> = props => {
    const [newEquine, setNewEquine] = useState({
          id: 0,
          name: "",
          category: 0,
          programme: 0,
          skills: [],
          yard: 0
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [yards, setYards] = useState<any[]>([]);
    const [programmes, setProgrammes] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);

    const getEquineOptions = async () => {
        try {
            const res = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_URL}/data/categories`),
                fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`),
                fetch(`${process.env.NEXT_PUBLIC_URL}/data/programmes`),
                fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills`)
            ]);
            const data = await Promise.all(res.map(r => r.json()));
            setCategories(data[0]);
            setYards(data[1]);
            setProgrammes(data[2]);
            setSkills(data[3]);
        } catch {
            throw Error('Promise failed');
        }
    };

    useEffect(() => {
        getEquineOptions();
    }, []);

    const submitEquine = async (e: any) => {
        e.preventDefault();
        
        const equineToPost = {
            category: {
              id: newEquine.category,
            },
            name: newEquine.name,
            programme: {
              id: newEquine.programme
            },
            skills: [
                {id: newEquine.skills}
            ],
            yard: {
              id: newEquine.yard
            }
          }
          
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(equineToPost),
				})
					.then((response) => response.json())
					.then((data) => props.router.push(`/admin/equines/${data.id}`))
					.catch((rejected: any) => {
						console.log(rejected);
					});
    };

    const handleChange = (e: any) => {
        if (e.target.name === 'name') {
            setNewEquine({ ...newEquine, [e.target.name]: e.target.value });
        }
        else {
            setNewEquine({ ...newEquine, [e.target.name]: e.target.value.id });
        }
    };

    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add an Equine
            </Typography>
            <div>
                <form onSubmit={submitEquine}>
                    <Grid container direction="column">
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            color="secondary"
                            name="name"
                            onChange={handleChange}
                            required
                            sx={{ my: '1rem' }}
                        />

                        <FormControl>
                            <InputLabel id="categories_label" required>
                                Categories
                            </InputLabel>
                            <Select
                                labelId="categories_label"
                                label="categories"
                                name="category"
                                defaultValue=""
                                sx={{ my: '1rem' }}
                                onChange={handleChange}
                            >
                                {categories.map(category => {
                                    return (
                                        <MenuItem
                                            value={category}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="yard_label" required>
                                Yards
                            </InputLabel>
                            <Select
                                labelId="yard_label"
                                label="yards"
                                name="yard"
                                defaultValue=""
                                sx={{ my: '1rem' }}
                                onChange={handleChange}
                            >
                                {yards.map(yard => {
                                    return (
                                        <MenuItem value={yard} key={yard.id}>
                                            {yard.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="programmes_label" required>
                                Programmes
                            </InputLabel>
                            <Select
                                labelId="programmes_label"
                                label="programmes"
                                name="programme"
                                defaultValue=""
                                sx={{ my: '1rem' }}
                                onChange={handleChange}
                            >
                                {programmes.map(programme => {
                                    return (
                                        <MenuItem value={programme} key={programme.id}>
                                            {programme.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="skills_label" required>
                                Skills
                            </InputLabel>
                            <Select
                                labelId="skills_label"
                                label="skills"
                                name="skills"
                                defaultValue=""
                                sx={{ my: '1rem' }}
                                onChange={handleChange}
                            >
                                {skills.map(skill => {
                                    return (
                                        <MenuItem value={skill} key={skill.id}>
                                            {skill.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </div>
            <div>
                <Button variant="outlined" sx={{ my: '1rem' }}>
                    <Link href="/admin">
                        <Typography>Go back to Dashboard</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export default withRouter(NewEquine);
