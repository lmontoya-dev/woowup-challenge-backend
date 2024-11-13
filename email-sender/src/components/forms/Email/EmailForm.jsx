// src/components/EmailForm.jsx
import { useState } from "react";
import { useFormik } from "formik";

import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  Snackbar,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { jsonToFormData } from "../../../utils/jsonToFormData";
import ApiRepository from "../../../services/apiRepository";
import { initialValues, validationSchema } from "./EmailFormConfig";

const EmailForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setUploadError(null);
    setIsSubmitting(true);
    const formData = jsonToFormData(values);
    try {
      await ApiRepository.sendEmail(formData);
      formik.resetForm();
      setMessage(`Email sent successfully`);
      setOpen(true);
    } catch (error) {
      setUploadError(`Failed to send email. Please try again. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "20px auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Email Sender
      </Typography>

      <TextField
        label="To"
        type="email"
        name="to"
        value={formik.values.to}
        onChange={formik.handleChange}
        required
        fullWidth
      />

      <TextField
        label="Subject"
        type="text"
        name="subject"
        value={formik.values.subject}
        onChange={formik.handleChange}
        required
        fullWidth
      />

      <TextField
        label="Body"
        type="text"
        name="body"
        value={formik.values.body}
        onChange={formik.handleChange}
        required
        multiline
        rows={4}
        fullWidth
      />

      <Box display="flex" alignItems="center" gap={1}>
        <InputLabel htmlFor="files" sx={{ fontWeight: "bold" }}>
          Attach Files:
        </InputLabel>
        <IconButton color="primary" component="label">
          <AttachFileIcon />
          <input
            type="file"
            name="files[]"
            onChange={(event) => {
              const filesArray = Array.from(event.currentTarget.files);
              formik.setFieldValue("files", filesArray);
            }}
            multiple
            hidden
          />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {formik.values.files
            ? `${formik.values.files.length} file(s) selected`
            : "No files selected"}
        </Typography>
      </Box>
      {uploadError && <FormHelperText error>{uploadError}</FormHelperText>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        startIcon={isSubmitting && <CircularProgress size={20} />}
      >
        {isSubmitting ? "Sending..." : "Send Email"}
      </Button>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={4000}
        message={message}
      />
    </Box>
  );
};

export default EmailForm;
