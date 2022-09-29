import { Box, Stepper, Step, StepLabel, Typography, StepContent, TextField, styled, CircularProgress } from "@mui/material";
import ButtonCustom from "common/components/ButtonCustom";
import { BigNumber } from "ethers";
import useApproveToken from "pages/home/hooks/useApproveToken";
import useContractLottery from "pages/home/hooks/useContractLottery";
import { useEffect, useState } from "react";
import Lottery from "abi/Lottery.json";
import { useFirstRender } from "pages/home/hooks/useFirtRender";

const Container = styled(Box)(({ theme }) => ({
	maxWidth: 400,
	".container__textfield": {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const steps = [
	{
		label: "Approve token",
		description: `Allow the contract to use your token`,
	},
	{
		label: "Join now",
		description: `Confirm participation`,
	},
	{
		label: "Done",
		description: `Successful participation`,
	},
];

export default function StepperJoin() {
	const isFirst = useFirstRender();
	const [activeStep, setActiveStep] = useState(0);
	const [valueBetNumber, setValueBetNumber] = useState("0");
	const { useGetDetail, useJoinGameWithToken } = useContractLottery();
	const { gameDetail } = useGetDetail();

	//Approve token
	const { resultApprove, isLoadingApprove, isSuccessApprove, writeApprove } = useApproveToken({
		addressToken: gameDetail.tokenAddress,
		spender: Lottery.address,
		amount: gameDetail.feeJoin,
	});
	//Join game
	const { resultJoin, isLoadingJoin, isSuccessJoin, writeJoinGame } = useJoinGameWithToken(BigNumber.from(valueBetNumber === "" ? "0" : valueBetNumber), isSuccessApprove);

	useEffect(() => {
		if (!isFirst) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	}, [isSuccessApprove, isSuccessJoin]);

	const handleAction = (index: Number) => {
		if (index === 0) return writeApprove();
		if (index === 1) return writeJoinGame();
	};

	return (
		<Container sx={{ maxWidth: 400 }}>
			<Typography variant="h5" sx={{ textAlign: "center" }}>
				Confirm
			</Typography>
			<Box className="container__textfield">
				<TextField
					id="outlined-basic"
					required
					label="Pick number"
					type={"number"}
					variant="outlined"
					size="small"
					defaultValue={"0"}
					error={valueBetNumber === ""}
					sx={{ width: "180px", margin: "16px 0px" }}
					onChange={(event) => setValueBetNumber(event.target.value)}
				/>
			</Box>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((step, index) => (
					<Step key={step.label}>
						<StepLabel>{step.label}</StepLabel>
						<StepContent>
							<Typography>{step.description}</Typography>
							<Box sx={{ mb: 2 }}>
								<div>
									<ButtonCustom variant="contained" onClick={index === steps.length - 1 ? () => window.location.reload() : () => handleAction(index)} sx={{ mt: 1, mr: 1 }}>
										{(isLoadingApprove || isLoadingJoin) && <CircularProgress color="inherit" size={24} sx={{ marginRight: "10px" }} />}
										{index === 0 ? "Approve" : index === 1 ? "Join game" : "Finish"}
									</ButtonCustom>
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</Container>
	);
}
