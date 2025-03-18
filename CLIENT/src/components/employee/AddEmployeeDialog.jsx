import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import api from "../../config/api";
import CustomAutoComplete from "../../global/components/CustomAutoComplete";
import CustomButton from "../../global/components/CustomButton";
import CustomTextField from "../../global/components/CustomTextField";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Employee name is required"),
  role: yup
    .string()
    .oneOf(["Manager", "Artist", "Staff"], "Invalid role")
    .required("Role is required"),
  contact: yup
    .string()
    .matches(/^[0-9]+$/, "Contact must be a valid number")
    .required("Contact is required"),
  dateHired: yup.date().default(() => new Date()),
});

const AddEmployeeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await api.post("/employees", data);
        return res.data.message;
      } catch (e) {
        toast.error(e.response?.data?.error || "Failed to add employee");
        setError("name", { type: "manual", message: e.response.data.error });
        throw e;
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries(["employees"]);
      toast.success(message);
      reset();
      setIsOpen(false);
    },
  });

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        onClick={() => setIsOpen(true)}
        aria-label="Add new employee"
        startIcon={<IoMdAdd />}
      >
        Add Employee
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent dividers sx={{ width: "500px" }}>
          <Typography variant="body2" gutterBottom>
            Fill out the details below to add a new employee.
          </Typography>

          {/* Employee Name */}
          <CustomTextField
            fieldName="name"
            control={control}
            label="Name"
            required
            sx={{ mt: 2 }}
          />

          {/* Employee Role */}
          <CustomAutoComplete
            defaultOptions={["Manager", "Artist", "Staff"]}
            control={control}
            fieldName="role"
            label="Role"
            required
            sx={{ mb: 2 }}
          />

          {/* Contact Number */}
          <CustomTextField
            fieldName="contact"
            control={control}
            label="Contact"
            required
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton plain color="error" onClick={() => setIsOpen(false)}>
            Close
          </CustomButton>
          <CustomButton
            loading={mutation.isLoading}
            onClick={handleSubmit(mutation.mutate)}
          >
            Add
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEmployeeDialog;
