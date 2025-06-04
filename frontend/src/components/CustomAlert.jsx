import React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomAlert({ type, text, show, onClose }) {
  if (!show) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        width: "fit-content",
        zIndex: 999,
      }}>
      <Alert
        color={type}
        variant="solid"
        endDecorator={
          <IconButton
            variant="plain"
            color={type}
            size="sm"
            onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        sx={{ mb: 2 }}>
        {text}
      </Alert>
    </Box>
  );
}
