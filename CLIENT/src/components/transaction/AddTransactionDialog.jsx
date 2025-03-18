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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import api from "../../config/api";
import CustomAutoComplete from "../../global/components/CustomAutoComplete";
import CustomButton from "../../global/components/CustomButton";
import CustomTextField from "../../global/components/CustomTextField";
import CustomAutoCompleteChips from "../../global/components/CustomAutoCompleteChips";

// Transaction Dialog Component
const AddTransactionDialog = ({ row, parentClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const isEditing = Boolean(row);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      employee: row?.employee || "",
      suppliesUsed: row?.suppliesUsed || [],
      date: row?.date
        ? row.date.split("T")[0]
        : new Date().toISOString().split("T")[0], // Format date
      notes: row?.notes || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const url = isEditing ? `/transactions/${row._id}` : "/transactions";
        const method = isEditing ? "put" : "post";
        const res = await api[method](url, {
          ...data,
          employee: data.employee._id,
          suppliesUsed: data.suppliesUsed.map((item) => item._id),
        });
        return res.data.message;
      } catch (e) {
        toast.error(e.response?.data?.error || "Failed to save transaction");
        setError("employee", {
          type: "manual",
          message: e.response.data.error,
        });
        throw e;
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries(["transactions"]);
      toast.success(message);
      reset();
      handleClose();
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
          aria-label="Add new transaction"
          startIcon={<IoMdAdd />}
        >
          {isEditing ? "Edit Transaction" : "Add Transaction"}
        </Button>
      )}

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Edit Transaction" : "Add New Transaction"}
        </DialogTitle>
        <DialogContent dividers sx={{ width: "500px" }}>
          <Typography variant="body2" gutterBottom>
            {isEditing
              ? "Modify the details below and save changes."
              : "Fill out the details below to add a new transaction."}
          </Typography>

          {/* Select Employee */}
          <CustomAutoComplete
            control={control}
            fieldName="employee"
            apiList={{
              api: api,
              endpoint: "/employees",
              listName: "employees",
            }}
            getObject
            getOptionLabel="name"
            label="Employee"
            required
            sx={{ mb: 2 }}
          />

          {/* Select Supplies Used */}
          <CustomAutoCompleteChips
            control={control}
            fieldName="suppliesUsed"
            apiList={{
              api: api,
              endpoint: "/supplies",
              listName: "supplies",
            }}
            getOptionLabel="name"
            label="Supplies Used"
          />

          {/* Date */}
          <CustomTextField
            fieldName="date"
            control={control}
            label="Date"
            type="date"
            required
            sx={{ my: 2 }}
          />

          {/* Notes */}
          <CustomTextField
            fieldName="notes"
            control={control}
            label="Notes (Optional)"
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
            allow={isEditing && !isDirty}
          >
            {isEditing ? "Save Changes" : "Add"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTransactionDialog;
