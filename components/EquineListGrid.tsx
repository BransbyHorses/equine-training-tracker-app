import Link from "next/link";
import { Equine } from "../utils/types";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EquineListGrid = ({ equines }: { equines: Equine[] }) => {
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState<boolean>();

	useEffect(() => {
		router.pathname.includes("admin") ? setIsAdmin(true) : setIsAdmin(false);
	}, []);

	return (
		<Paper>
			<Box pl={2} pr={1} sx={{ backgroundColor: "white" }}>
				{equines
					.sort((equineA, equineB) => {
						if (equineA.name < equineB.name) return -1;
						if (equineA.name > equineB.name) return 1;
						return 0;
					})
					.map((equine, i, arr) => {
						return (
							<Link
								href={
									isAdmin
										? `/admin/equines/${equine.id}`
										: `/equines/${equine.id}`
								}
								key={equine.id}
							>
								<Box
									py={2}
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										borderBottom:
											i === arr.length - 1 ? "0" : "0.5px solid lightGray",
										cursor: "pointer",
									}}
								>
									<Grid container>
										<Grid item xs={6} md={4} lg={3}>
											<Typography
												variant="h6"
												fontWeight={500}
												color="primary.light"
											>
												{equine.name}
											</Typography>
										</Grid>
										{equine.yard ? (
											<Grid item xs={5} md={4} lg={3}>
												<Typography color="gray">{equine.yard.name}</Typography>
											</Grid>
										) : (
											<></>
										)}
									</Grid>
									<IconButton>
										<KeyboardArrowRightIcon fontSize="large" />
									</IconButton>
								</Box>
							</Link>
						);
					})}
			</Box>
		</Paper>
	);
};
export default EquineListGrid;