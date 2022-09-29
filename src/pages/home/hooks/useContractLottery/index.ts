//abi
import Lottery from "abi/Lottery.json";
//wagmi
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BigNumber } from "ethers";

type GameDetail = {
	tokenAddress: string;
	feeJoin: BigNumber;
	players: string[];
	isEnded: boolean | undefined;
};
const useContractLottery = () => {
	const useGetDetail = () => {
		let gameDetail: GameDetail = {
			tokenAddress: "",
			feeJoin: BigNumber.from("0"),
			players: [],
			isEnded: undefined,
		};
		const {
			data: dataDetail,
			isError: isErrorDetail,
			isLoading: isLoadingDetail,
		} = useContractRead({
			addressOrName: Lottery.address,
			contractInterface: Lottery.abi,
			functionName: "gameDetail",
		});

		if (!isErrorDetail && !isLoadingDetail && dataDetail) {
			gameDetail.tokenAddress = dataDetail._token;
			gameDetail.feeJoin = BigNumber.from(dataDetail._playFee.toString());
			gameDetail.players = dataDetail._players;
			gameDetail.isEnded = dataDetail._isEnded;
		}

		return { gameDetail };
	};

	const useGetBetNumberOfPlayer = (userAddress: string | undefined) => {
		let betNumberOfPlayer;
		const { data, isError, isLoading } = useContractRead({
			addressOrName: Lottery.address,
			contractInterface: Lottery.abi,
			functionName: "betNumberOfPlayer",
			args: userAddress,
		});
		let result = data?.toString();
		if (!isError && !isLoading && result) {
			betNumberOfPlayer = result;
		}
		
		return { betNumberOfPlayer };
	};

	const useGetResult = () => {
		let luckyNumber,
			winners = [];
		const { data, isError, isLoading } = useContractRead({
			addressOrName: Lottery.address,
			contractInterface: Lottery.abi,
			functionName: "gameResult",
		});

		if (!isError && !isLoading && data) {
			luckyNumber = data._luckyNumber;
			winners = data._winners;
		}

		return { luckyNumber, winners };
	};

	const useJoinGameWithToken = (betNumber: BigNumber, enable: boolean) => {
		const { config: configJoinGame } = usePrepareContractWrite({
			addressOrName: Lottery.address,
			contractInterface: Lottery.abi,
			functionName: "joinGame",
			args: betNumber,
			enabled: enable,
		});
		const { data: resultJoin, write } = useContractWrite(configJoinGame);
		const writeJoinGame = () => write?.();
		const { isSuccess: isSuccessJoin, isLoading: isLoadingJoin } = useWaitForTransaction({
			hash: resultJoin?.hash,
		});
		return { resultJoin, isLoadingJoin, isSuccessJoin, writeJoinGame };
	};

	return { useGetDetail, useGetBetNumberOfPlayer, useGetResult, useJoinGameWithToken };
};

export default useContractLottery;
