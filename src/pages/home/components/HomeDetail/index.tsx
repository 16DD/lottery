import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
//abi
import LotteryToken from "abi/LotteryToken.json";
import Lottery from "abi/Lottery.json";
//wagmi
import {
  useAccount,
  useBalance,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from "wagmi";
//cpn
import ButtonCustom from "common/components/ButtonCustom";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
//hook
import useContractLottery from "pages/home/hooks/useContractLottery";
import useApproveToken from "pages/home/hooks/useApproveToken";
import { weiToEther } from "pages/home/utils";
import ModalConfirm from "../ModalComfirm";
import { provider } from "setup/wagmi/wagmiConfig";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",

  "#homedetail__head": {
    width: "50%",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#57669f",
    borderRadius: theme.shape.borderRadiusSm,

    ".homedetail__head__title": {
      fontWeight: "600",
      textAlign: "center",
    },
  },

  "#homedetail__body": {
    marginTop: "10px",
    width: "50%",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#57669f",
    borderRadius: theme.shape.borderRadiusSm,

    ".homedetail__body__content": {
      padding: "5px 10px",
      fontWeight: "600",
    },

    ".link": {
      textDecoration: "none",
      color: theme.palette.text.primary,

      "&:hover": {
        color: theme.palette.action.hover,
      },
    },
  },

  ".homedetail__table": {
    width: "50%",
    marginTop: "10px",
    marginBotton: "20px",
    borderRadius: theme.shape.borderRadiusSm,
    ".background__table": {
      backgroundColor: theme.palette.mode === "light" ? "#fff" : "#57669f",
    },
  },
}));
const HomeDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const { chain } = useNetwork();
  const { address } = useAccount();

  //Lottery detail
  const { useGetDetail, useGetBetNumberOfPlayer, useGetResult } =
    useContractLottery();
  const { gameDetail } = useGetDetail();
  const { betNumberOfPlayer } = useGetBetNumberOfPlayer(address);
  const { luckyNumber, winners } = useGetResult();

  const { data: balanceLT } = useBalance({
    addressOrName: address,
    token: LotteryToken.address,
  });

  //Modal action
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      {/* Lucky number */}
      <Box id="homedetail__head">
        <Typography className="homedetail__head__title" variant="h4">
          Lucky Number
        </Typography>
        <Typography
          className="homedetail__head__title"
          variant="h2"
          sx={{ fontWeight: "900", color: " #f2ee13" }}
        >
          {luckyNumber ? luckyNumber : "?"}
        </Typography>
      </Box>
      {/* Game informatin */}
      <Box id="homedetail__body">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              className="homedetail__body__content"
              sx={{ textAlign: "center" }}
              variant="h4"
            >
              Game Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className="homedetail__body__content" variant="h6">
              Token address
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              className="homedetail__body__content link"
              component={"a"}
              href={
                chain?.blockExplorers?.default.url +
                "/address/" +
                LotteryToken.address
              }
              variant="h6"
              sx={{ fontStyle: "italic" }}
            >
              {LotteryToken.address.slice(0, 10) +
                "..." +
                LotteryToken.address.slice(-10)}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className="homedetail__body__content" variant="h6">
              Fee
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="homedetail__body__content" variant="h6">
              {gameDetail.feeJoin ? weiToEther(gameDetail.feeJoin) : "..."} LT
              (Lottery Token)
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className="homedetail__body__content" variant="h6">
              Bet number your
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="homedetail__body__content" variant="h6">
              {betNumberOfPlayer ? betNumberOfPlayer : "..."}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className="homedetail__body__content" variant="h6">
              Status
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="homedetail__body__content" variant="h6">
              {gameDetail.isEnded === undefined
                ? "..."
                : gameDetail.isEnded
                ? "Ended"
                : "Ongoing"}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className="homedetail__body__content" variant="h6">
              Total reward
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="homedetail__body__content" variant="h6">
              {gameDetail.players.length *
                Number(weiToEther(gameDetail.feeJoin))}{" "}
              LT
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ButtonCustom
              sx={{ width: "150px", marginBottom: "10px" }}
              onClick={handleOpenModal}
              disabled={
                betNumberOfPlayer != undefined ||
                address === undefined ||
                gameDetail.isEnded === true ||
                Number(Number(balanceLT?.formatted).toFixed(2)) === 0
              }
            >
              {betNumberOfPlayer != undefined ? "Joined" : "Join Now"}
            </ButtonCustom>
          </Grid>
        </Grid>
        <ModalConfirm
          open={openModal}
          onClose={handleCloseModal}
        ></ModalConfirm>
      </Box>
      {/* Table winner */}
      <Box className="homedetail__table">
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label="simple table">
            <TableHead
              className="background__table"
              sx={{ backgroundColor: "#fff" }}
            >
              <TableRow>
                <TableCell align="center">
                  <Typography
                    sx={{ textAlign: "center", fontWeight: "600" }}
                    variant="h4"
                  >
                    Winners
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="background__table">
              {winners.length != 0 ? (
                winners.map((addr: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell align="center">{addr}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center">----</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ height: "40px" }}></Box>
    </Container>
  );
};

export default HomeDetail;
