import { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Tooltip,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  Typography,
} from "@mui/material";

export default function AddModal({ onClose, product = {} }) {
  // eslint-disable-next-line no-unused-vars
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [alert, setAlert] = useState({ type: "", text: "", open: false });
  const [currentProduct, setCurrentProduct] = useState({
    name: product.name || "",
    detail: product.detail || "",
    subDetail: product.subDetail || "",
    description: product.description || "",
    category: product.category || "Detergents",
    isEcoFriendly: product.isEcoFriendly || false,
    safetyInformation: product.safetyInformation || "",
    sizes: product.sizes || [
      { size: "Small", quantity: "", stockQuantity: 0, price: 0 },
      { size: "Medium", quantity: "", stockQuantity: 0, price: 0 },
      { size: "Large", quantity: "", stockQuantity: 0, price: 0 },
      { size: "XL", quantity: "", stockQuantity: 0, price: 0 },
    ],
    frontImage: product.frontImage || "",
    backImage: product.backImage || "",
    descriptionImage: product.descriptionImage || "",
  });

  // Handler functions
  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (
        !currentProduct.name ||
        !currentProduct.detail ||
        !currentProduct.category
      ) {
        setAlert({
          type: "error",
          text: "Please fill all required fields",
          open: true,
        });
        return;
      }

      const payload = {
        ...currentProduct,
        sizes: currentProduct.sizes.filter((size) => size.quantity !== ""),
      };

      if (!product._id) {
        const response = await axios.post("/products", payload);
        if (response.status === 200) {
          setAlert({
            type: "success",
            text: "Product added successfully",
            open: true,
          });
          setTimeout(onClose, 1500);
        }
      } else {
        const response = await axios.put(`/products/${product._id}`, payload);
        if (response.status === 200) {
          setAlert({
            type: "success",
            text: "Product updated successfully",
            open: true,
          });
          setTimeout(onClose, 1500);
        }
      }
    } catch (error) {
      console.error("Error adding/updating Product:", error);
      setAlert({
        type: "error",
        text: error.response?.data?.error || "Failed to add/update product",
        open: true,
      });
    }
  };

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setCurrentProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleSizeChange = (index, key, value) => {
    const updatedSizes = [...currentProduct.sizes];
    updatedSizes[index][key] = value;
    setCurrentProduct((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleFileChange = async (e, key) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "json",
      });

      setUploadedUrl(response.data.url);
      setCurrentProduct((prev) => ({ ...prev, [key]: response.data.url }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the image.");
    }
  };

  return (
    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      {alert.open && (
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alert.type}>
            {alert.text}
          </Alert>
        </Snackbar>
      )}
      <form
        encType='multipart/form-data'
        className='bg-white h-[95%] overflow-auto  p-6 rounded-lg w-full max-w-2xl'
        onSubmit={handleSubmit}>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-[#216D9E] text-xl font-semibold'>
            {product._id ? "Update Product" : "Add Product"} Information
          </span>
          <Button onClick={onClose}>&times;</Button>
        </div>
        <div className='space-y-4'>
          <TextField
            fullWidth
            label='Name'
            variant='standard'
            value={currentProduct.name}
            onChange={(e) => handleInputChange(e, "name")}
            required
          />
          <TextField
            fullWidth
            label='Detail'
            variant='standard'
            value={currentProduct.detail}
            onChange={(e) => handleInputChange(e, "detail")}
            required
          />
          <TextField
            fullWidth
            label='Sub Detail'
            variant='standard'
            value={currentProduct.subDetail}
            onChange={(e) => handleInputChange(e, "subDetail")}
          />
          <TextField
            fullWidth
            label='Description'
            variant='standard'
            value={currentProduct.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
          <TextField
            fullWidth
            label='Safety Information'
            variant='standard'
            value={currentProduct.safetyInformation}
            onChange={(e) => handleInputChange(e, "safetyInformation")}
          />
          <FormControl variant='standard' required fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={currentProduct.category}
              onChange={(e) => handleInputChange(e, "category")}
              label='Category'>
              <MenuItem value='Detergents'>Detergents</MenuItem>
              <MenuItem value='Cleaners'>Cleaners</MenuItem>
              <MenuItem value='Disinfectants'>Disinfectants</MenuItem>
              <MenuItem value='Bleaches'>Bleaches</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={currentProduct.isEcoFriendly}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    isEcoFriendly: e.target.checked,
                  }))
                }
              />
            }
            label='Eco-Friendly'
          />

          <h4 className='text-lg font-semibold'>Product Sizes</h4>
          {currentProduct.sizes.map((size, index) => (
            <div key={index} className='space-y-2'>
              <Tooltip title='Click to Add Values' placement='top' arrow>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={size.quantity !== ""}
                      onChange={(e) => {
                        const updatedSizes = [...currentProduct.sizes];
                        updatedSizes[index].quantity = e.target.checked
                          ? "10 g"
                          : "";
                        updatedSizes[index].stockQuantity = e.target.checked
                          ? 1
                          : 0;
                        updatedSizes[index].price = e.target.checked ? 1 : 0;
                        setCurrentProduct((prev) => ({
                          ...prev,
                          sizes: updatedSizes,
                        }));
                      }}
                    />
                  }
                  label={size.size}
                />
              </Tooltip>
              {size.quantity !== "" && (
                <div className='flex space-x-4'>
                  <TextField
                    label='Quantity'
                    variant='standard'
                    value={size.quantity}
                    onChange={(e) =>
                      handleSizeChange(index, "quantity", e.target.value)
                    }
                    sx={{ width: "30%" }}
                  />
                  <TextField
                    label='Stock Quantity'
                    variant='standard'
                    type='number'
                    value={size.stockQuantity}
                    onChange={(e) =>
                      handleSizeChange(index, "stockQuantity", e.target.value)
                    }
                    sx={{ width: "30%" }}
                  />
                  <TextField
                    label='Price'
                    variant='standard'
                    type='number'
                    value={size.price}
                    onChange={(e) =>
                      handleSizeChange(index, "price", e.target.value)
                    }
                    sx={{ width: "30%" }}
                  />
                  {size.stockQuantity === 0 && (
                    <span className='text-red-500 font-semibold self-center'>
                      Out of Stock
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className='space-y-4'>
            <Typography variant='body1'>Front Image:</Typography>
            <Button variant='contained' component='label'>
              Upload Front Image
              <input
                type='file'
                hidden
                onChange={(e) => handleFileChange(e, "frontImage")}
              />
            </Button>
            {currentProduct.frontImage && (
              <img
                src={currentProduct.frontImage}
                alt='Front'
                className='w-1/3'
              />
            )}
          </div>

          <div className='space-y-4'>
            <Typography variant='body1'>Back Image:</Typography>
            <Button variant='contained' component='label'>
              Upload Back Image
              <input
                type='file'
                hidden
                onChange={(e) => handleFileChange(e, "backImage")}
              />
            </Button>
            {currentProduct.backImage && (
              <img
                src={currentProduct.backImage}
                alt='Back'
                className='w-1/3'
              />
            )}
          </div>

          <div className='space-y-4'>
            <Typography variant='body1'>Description Image:</Typography>
            <Button variant='contained' component='label'>
              Upload Description Image
              <input
                type='file'
                hidden
                onChange={(e) => handleFileChange(e, "descriptionImage")}
              />
            </Button>
            {currentProduct.descriptionImage && (
              <img
                src={currentProduct.descriptionImage}
                alt='Description'
                className='w-1/3'
              />
            )}
          </div>
        </div>

        <Button
          sx={{ marginTop: 3 }}
          variant='contained'
          type='submit'
          fullWidth>
          {product._id ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </div>
  );
}
