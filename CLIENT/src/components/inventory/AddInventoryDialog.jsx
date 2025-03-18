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

// Validation Schema
const AddInventoryDialog = ({ row, parentClose }) => {
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
      item: row?.item || "",
      quantityUsed: row?.quantityUsed || "",
      dateUsed: row?.dateUsed
        ? row?.dateUsed.split("T")[0]
        : new Date().toISOString().split("T")[0],
      remarks: row?.remarks || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const url = isEditing ? `/inventory/${row._id}` : "/inventory";
        const method = isEditing ? "put" : "post";
        const res = await api[method](url, { ...data, item: data.item._id });
        return res.data.message;
      } catch (e) {
        toast.error(e.response?.data?.error || "Failed to save record");
        setError("item", { type: "manual", message: e.response.data.error });
        throw e;
      }
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries(["inventory"]);
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
          aria-label="Add new inventory record"
          startIcon={<IoMdAdd />}
        >
          {isEditing ? "Edit Inventory" : "Add Inventory"}
        </Button>
      )}

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Edit Inventory Record" : "Add New Inventory Record"}
        </DialogTitle>
        <DialogContent dividers sx={{ width: "500px" }}>
          <Typography variant="body2" gutterBottom>
            {isEditing
              ? "Modify the details below and save changes."
              : "Fill out the details below to add a new inventory record."}
          </Typography>

          {/* Select Item */}
          <CustomAutoComplete
            control={control}
            fieldName="item"
            apiList={{
              api: api,
              endpoint: "/supplies",
              listName: "supplies",
            }}
            // onChange={(value) => {
            //   console.log(value);
            // }}
            getObject
            getOptionLabel="name"
            label="Item"
            required
          />

          {/* Quantity Used */}
          <CustomTextField
            fieldName="quantityUsed"
            control={control}
            label="Quantity Used"
            type="number"
            required
            sx={{ mt: 2 }}
          />

          {/* Date Used */}
          <CustomTextField
            fieldName="dateUsed"
            control={control}
            label="Date Used"
            type="date"
            required
            sx={{ my: 2 }}
          />

          {/* Remarks */}
          <CustomTextField
            fieldName="remarks"
            control={control}
            label="Remarks (Optional)"
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
            allow={!isDirty}
          >
            {isEditing ? "Save Changes" : "Add"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddInventoryDialog;
