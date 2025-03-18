import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import api from "../../config/api";
import CustomAutoComplete from "../../global/components/CustomAutoComplete";
import CustomButton from "../../global/components/CustomButton";
import CustomTextField from "../../global/components/CustomTextField";
import { FaEdit } from "react-icons/fa";

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

const AddEmployeeDialog = ({ row, parentClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const isEditing = Boolean(row); // Check if editing mode

  const { control, handleSubmit, reset, setError, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      role: "",
      contact: "",
      dateHired: new Date().toISOString().split("T")[0],
    },
  });

  // Set form values when editing an existing employee
  useEffect(() => {
    if (row) {
      setValue("name", row.name || "");
      setValue("role", row.role || "");
      setValue("contact", row.contact || "");
      setValue("dateHired", row.dateHired ? row.dateHired.split("T")[0] : "");
    }
  }, [row, setValue]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const url = isEditing ? `/employees/${row._id}` : "/employees";
        const method = isEditing ? "put" : "post";
        const res = await api[method](url, data);
        return res.data.message;
      } catch (e) {
        toast.error(e.response?.data?.error || "Failed to save employee");
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

  const handleClose = () => {
    setIsOpen(false);
    parentClose && parentClose();
  };

  return (
    <div>
      {isEditing ? (
        <MenuItem
          onClick={() => setIsOpen(true)}
          disableRipple
          sx={{ display: "flex", gap: 1 }}
        >
          <FaEdit />
          Edit
        </MenuItem>
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsOpen(true)}
          aria-label={isEditing ? "Edit employee" : "Add new employee"}
          startIcon={<IoMdAdd />}
        >
          {isEditing ? "Edit Employee" : "Add Employee"}
        </Button>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </DialogTitle>
        <DialogContent dividers sx={{ width: "500px" }}>
          <Typography variant="body2" gutterBottom>
            {isEditing
              ? "Modify the details below and save changes."
              : "Fill out the details below to add a new employee."}
          </Typography>

          {/* Employee Name */}
          <CustomTextField
            fieldName="name"
            control={control}
            label="Name"
            required
            sx={{ mt: 2 }}
          />

          {/* Date Hired */}
          <CustomTextField
            fieldName="dateHired"
            control={control}
            label="Date Hired"
            required
            type="date"
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
          <CustomButton plain color="error" onClick={handleClose}>
            Close
          </CustomButton>
          <CustomButton
            loading={mutation.isLoading}
            onClick={handleSubmit(mutation.mutate)}
          >
            {isEditing ? "Save Changes" : "Add"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEmployeeDialog;
