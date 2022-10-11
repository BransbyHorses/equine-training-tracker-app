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
import QuestionTitle from '../../../../components/QuestionTitle';

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
    interface TrainingMethods {
        description: string;
        id: number;
        name: string;
    }

    interface EquineTraining extends Array<Training> {}

    interface EquineSkills extends Array<Skills> {}

    interface EquineTrainingMethods extends Array<TrainingMethods> {}

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
    const [trainingMethods, setTrainingMethods] = useState<
        EquineTrainingMethods
    >([
        {
            description: '',
            id: 0,
            name: ''
        }
    ]);

    const router = useRouter();

    const getEquineFromId = async () => {
        await router.isReady;
        const equineId = router.query.equineId;
        const urls = [
            `${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}`,
            `${process.env.NEXT_PUBLIC_URL}/data/training-categories`,
            `${process.env.NEXT_PUBLIC_URL}/data/skills`,
            `${process.env.NEXT_PUBLIC_URL}/data/training-methods`
        ];
        try {
            Promise.all(urls.map(u => fetch(u))).then(responses =>
                Promise.all(responses.map(res => res.json())).then(data => {
                    setEquine(data[0]);
                    setTrainingCategories(data[1]);
                    setSkills(data[2]);
                    setTrainingMethods(data[3]);
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!router.isReady) return;
        getEquineFromId();
    }, [router.isReady]);

    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}
        >
            <Box>
                <QuestionTitle
                    title={`Which skill did you train ${equine.name} on?`}
                    sx={{ justifySelf: 'start' }}
                />
                {skills ? (
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="skills_label" required>
                            Skills
                        </InputLabel>
                        <Select
                            labelId="skills_label"
                            label="skills"
                            name="skills"
                            defaultValue=""
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
                ) : null}
            </Box>
            <Box sx={{ width: "100%", justifyContent: "start"}}>
                <QuestionTitle
                    title={`Which method did you use?`}
                    sx={{ justifySelf: 'start' }}
                />

                {trainingMethods ? (
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="training_methods_label" required>
                            Training Methods
                        </InputLabel>
                        <Select
                            labelId="training_methods_label"
                            label="training methods"
                            name="training methods"
                            defaultValue=""
                            // onChange={handleChange}
                        >
                            {trainingMethods.map(trainingMethod => {
                                return (
                                    <MenuItem
                                        value={trainingMethod.name}
                                        key={trainingMethod.id}
                                    >
                                        {trainingMethod.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                ) : null}
            </Box>

            <LinkButton
                buttonHref="/admin/equines"
                variant="contained"
                size="Large"
                color="white"
                action="Continue"
            />
        </Container>
    );
};

export default withRouter(AddTraining);
