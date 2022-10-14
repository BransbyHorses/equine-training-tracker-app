import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../../components/LinkButton';
import EntityCard from '../../../components/EntityCard';
import AutoCompleteBox from '../../../components/AutoCompleteBox';
import PageTitle from '../../../components/PageTitle';
import ListGrid from '../../../components/ListGrid';

export default function Skills() {
    interface MySkills {
        id: number;
        name: string;
    }
    const [skills, setSkills] = useState<MySkills[]>([]);

    function getSkills() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills`)
            .then(response => response.json())
            .then(data => setSkills(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getSkills();
    }, []);

    return (
			<Container>
				<PageTitle title={"Skills"} />
				<AutoCompleteBox
					options={skills.map((skill) => ({
						optionName: skill.name,
						optionId: skill.id,
					}))}
					label="Search for a skill"
					linkName={"skills"}
				/>

				{skills.length > 0 ? (
					<ListGrid listItems={skills} listUrl={"skills"} />
				) : (
					<Typography
						variant="h5"
						color="#616161"
						gutterBottom
						sx={{ my: "1rem", mx: "1rem" }}
					>
						No skills here...☹️...yet!
					</Typography>
				)}

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
					}}
				>
					<LinkButton
						color="lightBlue[50]"
						variant="contained"
						buttonHref="/admin/skills/add-skill"
						buttonTitle="Create new skill"
					></LinkButton>

					<LinkButton
						color="lightBlue[50]"
						variant="contained"
						buttonHref="/admin"
						buttonTitle="Back to Dashboard"
					></LinkButton>
				</Box>
			</Container>
		);
}
