import { Box, Button, Modal, styled } from "@mui/material";
import { useState } from "react";
import StepperJoin from "../StepperJoin";

interface PropsModal {
	open: boolean;
	onClose: any;
}
const Container = styled(Box)(({ theme }) => ({
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	backgroundColor: theme.palette.mode === "light" ? "#fff" : "#57669f",
	padding: "10px",
	borderRadius: theme.shape.borderRadiusSm,
}));

export default function ModalConfirm(props: PropsModal) {
	return (
		<div>
			<Modal open={props.open} onClose={props.onClose}>
				<Container>
					<StepperJoin></StepperJoin>
				</Container>
			</Modal>
		</div>
	);
}
