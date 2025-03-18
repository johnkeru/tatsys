import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";
import { FaBoxOpen, FaUserTie, FaClipboardList, FaTruck } from "react-icons/fa";
import api from "../config/api";

const Dashboard = () => {
  // Fetch data from APIs
  const { data: supplies, isLoading: loadingSupplies } = useQuery({
    queryKey: ["supplies"],
    queryFn: async () => {
      const res = await api.get("/supplies");
      return res.data.supplies;
    },
  });

  const { data: transactions, isLoading: loadingTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await api.get("/transactions");
      return res.data.transactions;
    },
  });

  const { data: employees, isLoading: loadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/employees");
      return res.data.employees;
    },
  });

  const { data: inventory, isLoading: loadingInventory } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const res = await api.get("/inventory");
      return res.data.inventory;
    },
  });

  if (
    loadingSupplies ||
    loadingTransactions ||
    loadingEmployees ||
    loadingInventory
  ) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  // Custom Card Component for Stats
  const StatCard = ({ title, value, icon }) => (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ fontSize: 45, mr: 2, color: "#1976d2" }}>{icon}</Box>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  // Custom Styled Table Component
  const StyledTable = ({ title, data, columns }) => (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        {title}
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", color: "#444" }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(0, 5).map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{ "&:nth-of-type(odd)": { bgcolor: "#fafafa" } }}
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Dashboard
      </Typography>

      {/* Overview Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Supplies"
            value={supplies?.length || 0}
            icon={<FaBoxOpen />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Transactions"
            value={transactions?.length || 0}
            icon={<FaClipboardList />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Employees"
            value={employees?.length || 0}
            icon={<FaUserTie />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Inventory Items"
            value={inventory?.length || 0}
            icon={<FaTruck />}
          />
        </Grid>
      </Grid>

      {/* Data Tables */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <StyledTable
            title="Recent Transactions"
            data={transactions}
            columns={[
              { label: "Employee", render: (row) => row.employee?.name },
              {
                label: "Supplies Used",
                render: (row) =>
                  row.suppliesUsed?.map((s) => s.name).join(", "),
              },
              {
                label: "Date",
                render: (row) => new Date(row.date).toLocaleDateString(),
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTable
            title="Inventory Overview"
            data={inventory}
            columns={[
              { label: "Item", render: (row) => row.item.name },
              { label: "Quantity", render: (row) => row.quantityUsed },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTable
            title="Employees"
            data={employees}
            columns={[
              { label: "Name", render: (row) => row.name },
              { label: "Role", render: (row) => row.role },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTable
            title="Supplies"
            data={supplies}
            columns={[
              { label: "Name", render: (row) => row.name },
              { label: "Category", render: (row) => row.category },
              { label: "Supplier", render: (row) => row.supplier },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
