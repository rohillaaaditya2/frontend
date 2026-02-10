import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerMgt.css";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Avatar, Box, Typography, MenuItem, Select,
  InputLabel, FormControl, CircularProgress,
} from "@mui/material";

function CustomerMgt() {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    cid: null,
    currentStatus: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://server-app-xite.onrender.com/customer/getcustomercount")
      .then((res) => setCustomerList(res.data))
      .catch((err) => console.error(err));

    axios
      .get("https://server-app-xite.onrender.com/state/show")
      .then((res) => setStates(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleViewProfile = (cid) => {
    axios
      .get(
        `https://server-app-xite.onrender.com/customer/getcustomerdetails/${cid}`
      )
      .then((res) => {
        setSelectedCustomer(res.data);
        setFormData(res.data);

        // NEW: Cloudinary image
        setPreviewImage(res.data.CPicUrl || null);

        if (res.data.StId) fetchCitiesByState(res.data.StId);
        setOpenProfile(true);
      })
      .catch((err) => console.error(err));
  };

  const fetchCitiesByState = (stid) => {
    axios
      .get(
        `https://server-app-xite.onrender.com/city/showcitybystate/${stid}`
      )
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "StId") {
      setFormData((prev) => ({ ...prev, CtId: "" }));
      fetchCitiesByState(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    const data = new FormData();
    data.append("CustomerName", formData.CustomerName);
    data.append("CAddress", formData.CAddress);
    data.append("CContact", formData.CContact);
    data.append("CEmail", formData.CEmail);
    data.append("CUserId", formData.CUserId);
    data.append("StId", formData.StId);
    data.append("CtId", formData.CtId);

    if (formData.file) {
      data.append("file", formData.file); // NEW
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `https://server-app-xite.onrender.com/customer/update/${selectedCustomer.Cid}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Profile updated Successfully!");

      setCustomerList((prev) =>
        prev.map((c) =>
          c.Cid === selectedCustomer.Cid ? res.data.customer : c
        )
      );

      setOpenProfile(false);
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatusClick = (cid, currentStatus) => {
    setConfirmDialog({ open: true, cid, currentStatus });
  };

  const handleConfirmToggle = () => {
    const { cid, currentStatus } = confirmDialog;
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    setCustomerList((prev) =>
      prev.map((c) =>
        c.Cid === cid ? { ...c, Status: newStatus } : c
      )
    );

    axios
      .put(
        `https://server-app-xite.onrender.com/customer/customermanage/${cid}/${newStatus}`
      )
      .catch((err) => console.error(err));

    setConfirmDialog({ open: false, cid: null, currentStatus: "" });
  };

  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.6)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((cust) => (
              <TableRow key={cust.Cid}>
                <TableCell>{cust.Cid}</TableCell>
                <TableCell>{cust.CustomerName}</TableCell>
                <TableCell>
                  <Button
                    variant={
                      cust.Status === "Active"
                        ? "contained"
                        : "outlined"
                    }
                    color={
                      cust.Status === "Active"
                        ? "success"
                        : "error"
                    }
                    onClick={() =>
                      handleToggleStatusClick(
                        cust.Cid,
                        cust.Status
                      )
                    }
                  >
                    {cust.Status}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleViewProfile(cust.Cid)
                    }
                  >
                    View/Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PROFILE DIALOG */}
      <Dialog
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      >
        <DialogTitle>Customer Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="CustomerName"
            value={formData.CustomerName || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="CEmail"
            value={formData.CEmail || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Address"
            name="CAddress"
            value={formData.CAddress || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Contact"
            name="CContact"
            value={formData.CContact || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            {previewImage && (
              <Avatar
                src={previewImage}
                sx={{ width: 80, height: 80 }}
              />
            )}
            <input type="file" onChange={handleFileChange} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenProfile(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerMgt;
