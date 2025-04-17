import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import api from "../../config/api";
import CustomButton from "../../global/components/CustomButton";
import CustomTextField from "../../global/components/CustomTextField";
import CustomAutoComplete from "../../global/components/CustomAutoComplete";

// Transaction Dialog Component
const AddTransactionDialog = ({ row, parentClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supplyOptions, setSupplyOptions] = useState([]);
  const queryClient = useQueryClient();
  const isEditing = Boolean(row);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      employee: row?.employee || "",
      suppliesUsed:
        row?.suppliesUsed?.map((item) => ({
          supply: item.supply,
          quantityUsed: item.quantityUsed,
        })) || [],
      date: row?.date
        ? row.date.split("T")[0]
        : new Date().toISOString().split("T")[0], // Format date
      notes: row?.notes || "",
    },
  });

  const suppliesUsed = watch("suppliesUsed");

  // Fetch supply options from API
  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await api.get("/supplies");
        setSupplyOptions(response.data.supplies || []);
      } catch (error) {
        console.error("Failed to fetch supplies:", error);
        toast.error("Failed to load supplies");
      }
    };
    fetchSupplies();
  }, []);

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const url = isEditing ? `/transactions/${row._id}` : "/transactions";
        const method = isEditing ? "put" : "post";
        const res = await api[method](url, {
          ...data,
          employee: data.employee._id,
          suppliesUsed: data.suppliesUsed.map((item) => ({
            supply: item.supply._id,
            quantityUsed: item.quantityUsed,
          })),
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

  const handleSupplyChange = (newValue) => {
    // Initialize quantities for new supplies
    const updatedSupplies = newValue.map((supply) => {
      const existing = suppliesUsed.find(
        (item) => item.supply?._id === supply._id
      );
      return {
        supply,
        quantityUsed: existing ? existing.quantityUsed : 1,
      };
    });
    setValue("suppliesUsed", updatedSupplies, { shouldDirty: true });
  };

  const handleQuantityChange = (index, value) => {
    const updatedSupplies = [...suppliesUsed];
    updatedSupplies[index].quantityUsed = Number(value);
    setValue("suppliesUsed", updatedSupplies, { shouldDirty: true });
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
          <Controller
            name="suppliesUsed"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={supplyOptions}
                getOptionLabel={(option) => option.name || ""}
                onChange={(e, newValue) => handleSupplyChange(newValue)}
                value={field.value.map((item) => item.supply)}
                renderInput={(params) => (
                  <TextField {...params} label="Supplies Used" size="small" />
                )}
              />
            )}
          />

          {/* Quantities for Selected Supplies */}
          {suppliesUsed.length > 0 && (
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Quantities
              </Typography>
              {suppliesUsed.map((item, index) => (
                <div
                  key={item.supply?._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Typography variant="body2" sx={{ minWidth: "150px" }}>
                    {item.supply?.name}
                  </Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={item.quantityUsed}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    inputProps={{ min: 1 }}
                    size="small"
                    sx={{ width: "100px" }}
                  />
                </div>
              ))}
            </div>
          )}

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
