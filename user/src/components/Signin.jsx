import React, {useState} from 'react';
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Appbar from "./AppBar.jsx";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
import axios from "axios";


const Signin = () => {
	const navigate = useNavigate();
	const setUser = useSetRecoilState(userState);
	const [ username , setUsername] = useState("");
	const [ password , setPassword] = useState("");

	const handleSignInClick = async () => {
		const headers = {
			'Content-Type': 'application/json',
			'username' : username,
			'password' : password
		};
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {}, {
			headers : headers
		});
		setUser({ isLoading: false, userName: username });
		let data = response.data;
		localStorage.setItem("token", data.token);
		localStorage.setItem("username", username);
		navigate("/courses");
	}

	return (
		<>
			<Appbar />
			<Grid
				sx={{
					display : "flex",
					justifyContent : "center",
					marginTop : 15,
				}}
			>
				<Typography
					variant={"h5"}
					sx={{
						fontSize: {
							lg: 35,
							md: 30,
							sm: 25,
							xs: 15
						}
					}}
				>Sign In as User below!</Typography>
			</Grid>

			<Grid
				container
				sx={{
					display : "flex",
					justifyContent : "center"
				}}
			>

				<Card
					style={{
						width : 400,
						padding : 30,
						margin : "20px 40px",
						textAlign : "center"
					}}>

					<TextField
						id="outlined-basic"
						label="Username"
						variant="outlined"
						fullWidth
						sx={{
							paddingBottom : 2,
						}}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>

					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						fullWidth
						sx={{
							paddingBottom : 2
						}}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>

					<Button
						variant="contained"
						onClick={ handleSignInClick }
					>
						Sign In
					</Button>

					<Typography
						variant={"h5"}
						sx={{
							paddingTop : 2,
							fontSize: {
								lg: 20,
								md: 30,
								sm: 25,
								xs: 15
							}
						}}
					> Click below to Sign up </Typography>

					<Button
						variant="contained"
						color="error"
						// size={"small"}
						sx={{
							marginTop : 1,
						}}
					>
						Sign Up
					</Button>

				</Card>
			</Grid>

		</>
	);
};

export default Signin;
