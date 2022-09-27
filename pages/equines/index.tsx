import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import LinkButton from '../../components/LinkButton';
import AutoCompleteBox from '../../components/AutoCompleteBox';
import PageTitle from '../../components/PageTitle';
import ListCard from '../../components/ListCard';
import ListGrid from '../../components/ListGrid';

export default function Equines() {
    interface MyEquines {
        id: number;
        name: string;
        category: string;
        onHold: boolean;
        programme: string;
        skills: string;
        trainerId: number;
        training: string;
        yard: string;
    }
    const [equines, setEquines] = useState<MyEquines[]>([]);

    function getEquines() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`)
            .then(response => response.json())
            .then(data => setEquines(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getEquines();
    }, []);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <PageTitle title={'Equines'} />
            <AutoCompleteBox
                options={equines.map(equine => ({
                    optionName: equine.name,
                    optionId: equine.id
                }))}
                label="Search for an equine"
                linkName={'equines'}
            />
            {equines.length > 0 ? (
                <ListGrid listItems={equines} listUrl={'equines'}/>
            ) : (
                <Typography
                    variant="h5"
                    color="#616161"
                    gutterBottom
                    sx={{ my: '1rem', mx: '1rem' }}
                >
                    No equines here...☹️...yet!
                </Typography>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}
            >
                <LinkButton
                    color="lightBlue[50]"
                    variant="contained"
                    buttonHref="/equines/add-equine"
                    buttonTitle="Create new equine"
                ></LinkButton>

                <LinkButton
                    color="lightBlue[50]"
                    variant="contained"
                    buttonHref="/dashboard/admin"
                    buttonTitle="Back to Dashboard"
                ></LinkButton>
            </Box>
        </Container>
    );
}
