import React, { useEffect, useState } from "react";
import "./App.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import { DefaultRowData, CityAndCountryData, AccData } from "./utils";
import { IRowData, ICityAndCountryData, IAccData } from "./types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.grey[800],
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey["100"],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&.MuiTableRow-root:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function App() {
  const [rowData, setRowData] = useState<IRowData[]>(DefaultRowData);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedEditor, setSelectedEditor] = useState<string>("");
  const [cityOpenPopOver, setCityOpenPopOver] = useState<boolean>(false);
  const [accOpen, setAccOpen] = useState<boolean>(false);
  const [cityValue, setCityValue] = useState<string>("");
  const [accValue, setAccValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElAcc, setAnchorElAcc] = useState<HTMLElement | null>(null);
  const [cityRowData, setCityRowData] =
    useState<ICityAndCountryData[]>(CityAndCountryData);
  const [accRowData, setAccRowData] = useState<IAccData[]>(AccData);

  const handleSelectCity = (event: any, id: number, city: string) => {
    handleClosePopOver();
    console.log("id", id);
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    setSelectedEditor(id + "city");
    setCityOpenPopOver(true);
    setCityValue(city);
  };

  const handleSelectAcc = (event: any, id: number, acc: string) => {
    console.log("id", id);
    handleClosePopOver();
    setAnchorElAcc(event.currentTarget);
    setSelectedId(id);
    setSelectedEditor(id + "acc");
    setAccOpen(true);
    setAccValue(acc);
  };

  const handleCitySearch = (e: any) => {
    let value = e.target.value;
    setCityValue(value);
    let res = CityAndCountryData.filter((item) => {
      let str = item.city.toLowerCase().indexOf(value.toLowerCase());
      if (str !== -1) {
        return item;
      }
    });
    if (res !== undefined) {
      setCityRowData(res);
    }

    console.log("res", res, value);
  };

  const handleAccSearch = (e: any) => {
    let value = e.target.value;
    setAccValue(value);
    let res = AccData.filter((item) => {
      let str = item.accommodation.toLowerCase().indexOf(value.toLowerCase());
      if (str !== -1) {
        return item;
      }
    });
    if (res !== undefined) {
      setAccRowData(res);
    }

    console.log("res", res, value);
  };

  const handleClosePopOver = () => {
    setSelectedId(0);
    setSelectedEditor("");
    setCityOpenPopOver(false);
    setAccOpen(false);
  };

  const handleListClick = (value: any) => {
    console.log("value", value);
    let tempArray = JSON.parse(JSON.stringify(rowData));
    console.log(
      "tempArray[findIndex - 1].cityObject.city",
      tempArray[selectedId - 1].cityObject.city
    );
    tempArray[selectedId - 1].cityObject.city = value;
    console.log("tempArray", tempArray);
    setRowData(tempArray);
    handleClosePopOver();
  };

  const handleListAccClick = (value: any) => {
    console.log("value", value);
    let tempArray = JSON.parse(JSON.stringify(rowData));
    console.log(
      "tempArray[findIndex - 1].cityObject.city",
      tempArray[selectedId - 1].accommodation
    );
    tempArray[selectedId - 1].accommodation = value;
    console.log("tempArray", tempArray);
    setRowData(tempArray);
    handleClosePopOver();
  };

  return (
    <Container maxWidth="md">
      <Box mt={10} textAlign="center">
        <Typography variant="h3">Welcome to ag-Grid auto-complete!</Typography>
      </Box>
      <Box mt={2} textAlign="center">
        <Typography variant="h6">
          City column and Accommodation column are editable. Id column gets its
          value from the selection in editing City column.
        </Typography>
      </Box>
      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Accommodation</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row, index) => (
                <StyledTableRow key={index + "rowData"}>
                  <StyledTableCell
                    id={selectedId + "popover"}
                    component="th"
                    scope="row"
                    onClick={(e) =>
                      handleSelectCity(e, index + 1, row.cityObject.city)
                    }
                    sx={{
                      cursor: "pointer",
                      padding:
                        selectedEditor === index + 1 + "city" ? 0 : "16px",
                    }}
                  >
                    {selectedEditor === index + 1 + "city" ? (
                      <TextField
                        variant="outlined"
                        value={cityValue}
                        onChange={handleCitySearch}
                        sx={{
                          width: "100%",
                          bgcolor: "background.paper",
                          color: (theme) =>
                            theme.palette.getContrastText(
                              theme.palette.background.paper
                            ),
                        }}
                      />
                    ) : (
                      row.cityObject.city
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{row.cityObject.id}</StyledTableCell>
                  <StyledTableCell
                    id={selectedId + "accommodationPopover"}
                    sx={{
                      cursor: "pointer",
                      padding:
                        selectedEditor === index + 1 + "acc" ? 0 : "16px",
                    }}
                    onClick={(e) =>
                      handleSelectAcc(e, index + 1, row.accommodation)
                    }
                  >
                    {selectedEditor === index + 1 + "acc" ? (
                      <TextField
                        variant="outlined"
                        value={accValue}
                        onChange={handleAccSearch}
                        sx={{
                          width: "100%",
                          bgcolor: "background.paper",
                          color: (theme) =>
                            theme.palette.getContrastText(
                              theme.palette.background.paper
                            ),
                        }}
                      />
                    ) : (
                      row.accommodation
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Popper
        id={selectedId + "popover"}
        open={cityOpenPopOver}
        placement="bottom-start"
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Paper elevation={0} variant="outlined">
                <Box width={500}>
                  <List
                    component="nav"
                    aria-label="mailbox folders"
                    sx={{ padding: 0 }}
                  >
                    <ListItem
                      sx={{
                        width: "100%",
                        bgcolor: (theme) => theme.palette.grey["400"],
                      }}
                    >
                      <Grid container>
                        <Grid item xs>
                          <Typography variant="subtitle2">City</Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle2">Country</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </List>
                  <Box
                    height={150}
                    sx={{
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        padding: 0,
                      }}
                      component="nav"
                      aria-label="mailbox folders"
                    >
                      {cityRowData.map((row, index) => (
                        <React.Fragment key={index}>
                          <ListItem
                            key={index + "cityData"}
                            button
                            onClick={() => handleListClick(row.city)}
                          >
                            <Grid container>
                              <Grid item xs>
                                <Typography variant="subtitle2">
                                  {row.city}
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography variant="subtitle2">
                                  {row.country}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Fade>
        )}
      </Popper>
      <Popper
        id={selectedId + "accommodationPopover"}
        open={accOpen}
        placement="bottom-start"
        anchorEl={anchorElAcc}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Paper elevation={0} variant="outlined">
                <Box width={300}>
                  <List
                    component="nav"
                    aria-label="mailbox folders"
                    sx={{ padding: 0 }}
                  >
                    <ListItem
                      sx={{
                        width: "100%",
                        bgcolor: (theme) => theme.palette.grey["400"],
                      }}
                    >
                      <Typography variant="subtitle2">Accommodation</Typography>
                    </ListItem>
                    <Divider />
                  </List>
                  <Box
                    height={150}
                    sx={{
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        padding: 0,
                      }}
                      component="nav"
                      aria-label="mailbox folders"
                    >
                      {accRowData.map((row, index) => (
                        <React.Fragment key={index + "acc"}>
                          <ListItem
                            key={index + "acc"}
                            button
                            onClick={() =>
                              handleListAccClick(row.accommodation)
                            }
                          >
                            <Typography variant="subtitle2">
                              {row.accommodation}
                            </Typography>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Fade>
        )}
      </Popper>
    </Container>
  );
}

export default App;
