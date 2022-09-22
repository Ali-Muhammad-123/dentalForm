import React, { useState } from "react";
import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from "react-filerobot-image-editor";
import { triggerBase64Download } from "react-base64-downloader";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import logo from "./logo.png";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
	borderRadius: 5,
};

export default function App() {
	const [isImgEditorShown, setIsImgEditorShown] = useState(false);
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [open, setOpen] = useState(false);
	const [editedImageObjectState, setEditedImageObject] = useState(null);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const openImgEditor = () => {
		setIsImgEditorShown(true);
	};

	const closeImgEditor = () => {
		setIsImgEditorShown(false);
	};

	function onSubmit(e) {
		e.preventDefault();
		triggerBase64Download(editedImageObjectState.imageBase64, `${age}_${name}`);
	}

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<div
				style={{
					backgroundColor: "#fff",
					height: "50px",
					padding: "10px 20px",
				}}
			>
				<img style={{ height: "100%" }} src={logo} />
			</div>
			<div style={{ height: "calc(100% - 70px)" }}>
				<FilerobotImageEditor
					source="./form.jpg"
					onSave={(editedImageObject, designState) => {
						setEditedImageObject(editedImageObject);
						handleOpen();
					}}
					moreSaveOptions={[
						{
							label: "Save as new version",

							icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>', // HTML Element as string
						},
					]}
					// onClose={closeImgEditor}
					annotationsCommon={{
						fill: "#ff0000",
					}}
					Text={{ text: "Type text here" }}
					tabsIds={[TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
					defaultTabId={TABS.ANNOTATE} // or 'Annotate'
					defaultToolId={TOOLS.TEXT} // or 'Text'
				/>
			</div>

			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box
					sx={{ ...style, width: 500 }}
					component="form"
					onSubmit={(e) => onSubmit(e)}
				>
					<TextField
						fullWidth
						required
						id="outlined-required"
						label="Enter Name"
						onChange={(e) => setName(e.target.value)}
						sx={{ marginTop: "15px" }}
					/>
					<TextField
						fullWidth
						type={"number"}
						required
						id="outlined-required"
						label="Enter Age"
						sx={{ marginTop: "15px" }}
						onChange={(e) => setAge(e.target.value)}
					/>

					<Box sx={{ display: "flex", flexWrap: "nowrap", marginTop: "15px" }}>
						<Button
							fullWidth
							variant="contained"
							type={"submit"}
							sx={{ marginRight: "10px" }}
						>
							Submit
						</Button>
						<Button
							fullWidth
							variant="outlined"
							type="button"
							sx={{ marginRight: "10px" }}
							onClick={() => handleClose()}
						>
							Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
