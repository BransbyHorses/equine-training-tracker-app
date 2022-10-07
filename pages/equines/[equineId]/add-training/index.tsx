import {
    Container,
    Box,
    Link,
    Typography,
    Card,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkButton from '../../../../components/LinkButton';
import PageTitle from '../../../../components/PageTitle';
import AutoCompleteBox from '../../../../components/AutoCompleteBox';

interface WithRouterProps {
    router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

const AddTraining: React.FC<MyComponentProps> = props => {
    interface MyEquine {
        category: {
            id: number;
            name: string;
        };
        id: number;
        name: string;
        programme: {
            id: number;
            name: string;
        };
        skills: Array<any>;
        yard: {
            id: number;
            name: string;
        };
    }
    interface Training {
        id: number;
        name: string;
    }
    interface Skills {
        id: number;
        name: string;
    }

    interface EquineTraining extends Array<Training> {}

    interface EquineSkills extends Array<Skills> {}

    const [equine, setEquine] = useState<MyEquine>({
        category: {
            id: 0,
            name: ''
        },
        id: 0,
        name: '',
        programme: {
            id: 0,
            name: ''
        },
        skills: [],
        yard: {
            id: 0,
            name: ''
        }
    });

    const [trainingCategories, setTrainingCategories] = useState<
        EquineTraining
    >([
        {
            id: 0,
            name: ''
        }
    ]);
    const [skills, setSkills] = useState<EquineSkills>([
        {
            id: 0,
            name: ''
        }
    ]);

    const router = useRouter();

    const getEquineFromId = async () => {
      await router.isReady
        const equineId = router.query.equineId;
        const urls = [
            `${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}`,
            `${process.env.NEXT_PUBLIC_URL}/data/training-categories`,
            `${process.env.NEXT_PUBLIC_URL}/data/skills`
        ];
        try {
            Promise.all(urls.map(u => fetch(u))).then(responses =>
                Promise.all(responses.map(res => res.json())).then(data => {
                    setEquine(data[0]);
                    setTrainingCategories(data[1]);
                    setSkills(data[2]);
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      if(!router.isReady) return;
      getEquineFromId();
    }, [router.isReady]);

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <PageTitle
                    title={`Which skill did you train ${equine.name} on?`}
                    sx={{ justifySelf: 'start' }}
                />
                {skills ? (
                    <AutoCompleteBox
                        options={skills.map(skill => ({
                            optionName: skill.name,
                            optionId: skill.id
                        }))}
                        label="Search for a skill"
                        linkName={'skills'}
                    />
                ) : null}

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
                        // onChange={handleChange}
                    >
                        {skills.map(skill => {
                            return (
                                <MenuItem value={skill.name} key={skill.id}>
                                    {skill.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <LinkButton
                    buttonHref="/admin/equines"
                    variant="contained"
                    size="Large"
                    color="white"
                    action="Go back to equines"
                />
            </Box>
        </Container>
    );
};

export default withRouter(AddTraining);
