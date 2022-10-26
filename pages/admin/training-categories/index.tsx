import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrainingCategory } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import useTrainingCategories from "../../../utils/hooks/useTrainingCategories";
import AdminEdit from "../../../components/pages/admin/AdminEdit";

import {
	Paper,
	Box,
	Typography,
	Menu,
	MenuItem,
	IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LoadingSpinner from "../../../components/LoadingSpinner";

export const OptionsMenu = (props: any) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const ITEM_HEIGHT = 48;
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreHorizIcon fontSize="medium" sx={{ color: "black" }} />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				<MenuItem value="edit" onClick={props.edit}>
					Edit
				</MenuItem>
				<MenuItem value="delete" onClick={props.delete}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

const TrainingCategoriesAdminPage = () => {
	const { fetchingData, trainingCategories, error } = useTrainingCategories();
	const [editValue, setEditValue] = useState<TrainingCategory | undefined>(
		undefined
	);
	const [updatedTrainingCategories, setUpdatedTrainingCategories] = useState<
		TrainingCategory[] | []
	>([]);

	useEffect(() => {
		setUpdatedTrainingCategories(trainingCategories);
	}, [trainingCategories]);

	const showEditForm = (id: any) => {
		setEditValue(
			updatedTrainingCategories.find(
				(trainingCategory) => trainingCategory.id === id
			)
		);
	};

	const saveEditedTrainingCategory = (newName: string) => {
		if (newName === editValue!.name) {
			setEditValue(undefined);
		} else {
			const editedTrainingCategory: TrainingCategory = {
				id: editValue!.id,
				name: newName,
			};
			axios
				.put(
					`${process.env.NEXT_PUBLIC_URL}data/training-categories/${editedTrainingCategory.id}`,
					editedTrainingCategory
				)
				.then(({ data }) => {
					setEditValue(undefined);
					const trainingCategories = updatedTrainingCategories.map((tc) => {
						if (tc.id === data.id) return data;
					});
					setUpdatedTrainingCategories(trainingCategories);
				})
				.catch((err) => {});
		}
	};

	const deleteTrainingCategory = (id: any) => {
		axios
			.delete(`${process.env.NEXT_PUBLIC_URL}data/training-categories/${id}`)
			.then(({ data }) => {
				setUpdatedTrainingCategories(
					updatedTrainingCategories.filter((tc) => tc.id != id)
				);
			})
			.catch((err) => {});
	};

	if (fetchingData) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<AdminPageTitle
				title="Manage Training Categories"
				buttonLink="/admin/training-categories/add"
				contentLength={updatedTrainingCategories.length}
			/>
			{updatedTrainingCategories.map((trainingCategory: TrainingCategory) => {
				return (
					<Paper key={trainingCategory.id}>
						<Box
							p={2}
							mb={2}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								border: "1px solid black",
								borderRadius: "4px",
							}}
						>
							{editValue && editValue.id === trainingCategory.id ? (
								<AdminEdit
									editValue={editValue}
									saveFunction={saveEditedTrainingCategory}
								/>
							) : (
								<>
									<Typography fontWeight={300}>
										{trainingCategory.name}
									</Typography>
									<OptionsMenu
										edit={() => showEditForm(trainingCategory.id)}
										delete={() => deleteTrainingCategory(trainingCategory.id)}
									/>
								</>
							)}
						</Box>
					</Paper>
				);
			})}
		</>
	);
};

export default TrainingCategoriesAdminPage;
