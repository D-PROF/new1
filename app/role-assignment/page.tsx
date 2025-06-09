"use client"

import type React from "react"

import { useState } from "react"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { Button, Snackbar, Alert } from "@mui/material"

interface RoleAssignment {
  id: number
  user: string
  role: string
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "user", headerName: "User", width: 200 },
  { field: "role", headerName: "Role", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>
        Edit
      </Button>
    ),
  },
]

const rows: RoleAssignment[] = [
  { id: 1, user: "john.doe@example.com", role: "Admin" },
  { id: 2, user: "jane.smith@example.com", role: "Editor" },
  { id: 3, user: "peter.jones@example.com", role: "Viewer" },
]

const handleEdit = (row: RoleAssignment) => {
  alert(`Editing role assignment for user: ${row.user}`)
}

export default function RoleAssignmentPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("info")

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarOpen(false)
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Role Assignment</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
