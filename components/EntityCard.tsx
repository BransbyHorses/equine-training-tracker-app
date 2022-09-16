import Link from 'next/link';
import { Typography, Button, Card, Grid } from '@mui/material';

export default function EntityCard(props: any) {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}
        >
            <Link href={`${props.link}`}>
                <Button>
                    <Typography variant="h6" color="primary">
                        {props.title}
                    </Typography>
                </Button>
            </Link>
        </Card>
    );
}
