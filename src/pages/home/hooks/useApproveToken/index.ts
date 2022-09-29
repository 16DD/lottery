import LotteryToken from "abi/LotteryToken.json";
import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

type Props = {
	addressToken: string;
	spender: string | undefined;
	amount: BigNumber;
};
const useApproveToken = (props: Props) => {
	const { config: configApprove } = usePrepareContractWrite({
		addressOrName: props.addressToken,
		contractInterface: LotteryToken.abi,
		functionName: "approve",
		args: [props.spender, props.amount],
	});
	const { data: resultApprove, write } = useContractWrite(configApprove);
	const writeApprove = () => write?.();
	const { isSuccess: isSuccessApprove, isLoading: isLoadingApprove } = useWaitForTransaction({
		hash: resultApprove?.hash,
	});
	return { resultApprove, isLoadingApprove, isSuccessApprove, writeApprove };
};

export default useApproveToken;
