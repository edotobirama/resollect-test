import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Container,TableContainer,TableSortLabel,TextField,Checkbox,Menu, MenuItem, Button, ListItemIcon, ListItemText} from "@mui/material";
import { ExpandMore, Margin } from "@mui/icons-material";
import styled from "styled-components";

interface Loan {
  id: string;
  loanType: string;
  borrower: string;
  borrowerAddress: string;
  coBorrower: string;
  coBorrowerAddress:string;
  currentDPD:number;
  amount: number;
  region: string;
  state: string;
}

interface Props {
  loans: Loan[];
}

type SortKey = keyof Loan;
type SortOrder = "asc" | "desc";

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 8px 12px;
  border: 2px solid ${({ selected }) => (selected ? "#007bff" : "#ccc")};
  background-color: ${({ selected }) => (selected ? "#007bff" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    border-color: #007bff;
  }
`;

const SearchContainer = styled.div`
  display:flex;
  justify-content: space-between;
`;

const ButtonsContainer =styled.div`
display:flex;
`;

const SubmitContainer = styled.div`
  border: 2px solid rgb(159, 159, 159); /* Border color and thickness */
  padding: 10px; /* Optional: Adds spacing inside */
  height: 50px;
  margin:10px;
  border-radius: 8px;
  display:flex;
  justify-content:space-between;
  align-items:center;
`

const NumberOfSelected =styled.div`
  color: 1976D2;
`

const filters =['All','Pre Sarfaesi','NPA','13(3)Responses','Symbolic Possession','DM Order','Physical Possessions','Auctions'];

const allColumns = [
  { key: "id", label: "Loan ID" },
  { key: "loanType", label: "Loan Type" },
  { key: "borrower", label: "Borrower" },
  { key: "borrowerAddress", label: "Borrower Address" },
  { key: "coBorrower", label: "Co-Borrower" },
  { key: "coBorrowerAddress", label: "Co-Borrower Address" },
  { key: "currentDPD", label: "Current DPD" },
  { key: "amount", label: "Amount ($)" },
  { key: "region", label: "Region" },
  { key: "state", label: "State" },
];

const loans : Loan[] = [
  {
    id: "L001",
    loanType: "Home Loan",
    borrower: "John Doe",
    borrowerAddress: "123 Main St, New York, NY",
    coBorrower: "Jane Doe",
    coBorrowerAddress: "123 Main St, New York, NY",
    currentDPD: 5,
    amount: 250000,
    region: "East",
    state: "New York",
  },
  {
    id: "L002",
    loanType: "Car Loan",
    borrower: "Alice Johnson",
    borrowerAddress: "456 Oak St, Los Angeles, CA",
    coBorrower: "Bob Johnson",
    coBorrowerAddress: "456 Oak St, Los Angeles, CA",
    currentDPD: 0,
    amount: 30000,
    region: "West",
    state: "California",
  },
  {
    id: "L003",
    loanType: "Personal Loan",
    borrower: "Michael Smith",
    borrowerAddress: "789 Pine St, Chicago, IL",
    coBorrower: "Sara Smith",
    coBorrowerAddress: "789 Pine St, Chicago, IL",
    currentDPD: 12,
    amount: 15000,
    region: "Midwest",
    state: "Illinois",
  },
  {
    id: "L004",
    loanType: "Business Loan",
    borrower: "Robert Brown",
    borrowerAddress: "321 Maple Ave, Houston, TX",
    coBorrower: "Laura Brown",
    coBorrowerAddress: "321 Maple Ave, Houston, TX",
    currentDPD: 30,
    amount: 100000,
    region: "South",
    state: "Texas",
  },
  {
    id: "L005",
    loanType: "Education Loan",
    borrower: "Emma Wilson",
    borrowerAddress: "654 Birch Rd, Boston, MA",
    coBorrower: "David Wilson",
    coBorrowerAddress: "654 Birch Rd, Boston, MA",
    currentDPD: 2,
    amount: 50000,
    region: "East",
    state: "Massachusetts",
  },
  {
    id: "L006",
    loanType: "Car Loan",
    borrower: "Olivia Martinez",
    borrowerAddress: "987 Cedar St, Phoenix, AZ",
    coBorrower: "Carlos Martinez",
    coBorrowerAddress: "987 Cedar St, Phoenix, AZ",
    currentDPD: 8,
    amount: 25000,
    region: "West",
    state: "Arizona",
  },
  {
    id: "L007",
    loanType: "Home Loan",
    borrower: "Daniel Clark",
    borrowerAddress: "741 Elm St, Denver, CO",
    coBorrower: "Sophia Clark",
    coBorrowerAddress: "741 Elm St, Denver, CO",
    currentDPD: 0,
    amount: 275000,
    region: "West",
    state: "Colorado",
  },
  {
    id: "L008",
    loanType: "Business Loan",
    borrower: "Liam Thompson",
    borrowerAddress: "852 Walnut St, Miami, FL",
    coBorrower: "Emily Thompson",
    coBorrowerAddress: "852 Walnut St, Miami, FL",
    currentDPD: 20,
    amount: 120000,
    region: "South",
    state: "Florida",
  },
  {
    id: "L009",
    loanType: "Personal Loan",
    borrower: "Charlotte Lewis",
    borrowerAddress: "963 Chestnut St, Seattle, WA",
    coBorrower: "Henry Lewis",
    coBorrowerAddress: "963 Chestnut St, Seattle, WA",
    currentDPD: 6,
    amount: 20000,
    region: "West",
    state: "Washington",
  },
  {
    id: "L010",
    loanType: "Education Loan",
    borrower: "James Walker",
    borrowerAddress: "159 Redwood St, Atlanta, GA",
    coBorrower: "Ella Walker",
    coBorrowerAddress: "159 Redwood St, Atlanta, GA",
    currentDPD: 3,
    amount: 45000,
    region: "South",
    state: "Georgia",
  },
  {
    id: "L011",
    loanType: "Home Loan",
    borrower: "Noah King",
    borrowerAddress: "357 Cypress St, Austin, TX",
    coBorrower: "Lily King",
    coBorrowerAddress: "357 Cypress St, Austin, TX",
    currentDPD: 1,
    amount: 300000,
    region: "South",
    state: "Texas",
  },
  {
    id: "L012",
    loanType: "Car Loan",
    borrower: "Benjamin Allen",
    borrowerAddress: "753 Spruce St, Portland, OR",
    coBorrower: "Zoe Allen",
    coBorrowerAddress: "753 Spruce St, Portland, OR",
    currentDPD: 0,
    amount: 28000,
    region: "West",
    state: "Oregon",
  },
  {
    id: "L013",
    loanType: "Personal Loan",
    borrower: "Ava Scott",
    borrowerAddress: "258 Willow St, Philadelphia, PA",
    coBorrower: "Ethan Scott",
    coBorrowerAddress: "258 Willow St, Philadelphia, PA",
    currentDPD: 10,
    amount: 18000,
    region: "East",
    state: "Pennsylvania",
  },
  {
    id: "L014",
    loanType: "Business Loan",
    borrower: "Mia Robinson",
    borrowerAddress: "654 Acacia St, San Diego, CA",
    coBorrower: "Jacob Robinson",
    coBorrowerAddress: "654 Acacia St, San Diego, CA",
    currentDPD: 15,
    amount: 90000,
    region: "West",
    state: "California",
  },
  {
    id: "L015",
    loanType: "Education Loan",
    borrower: "Elijah White",
    borrowerAddress: "852 Magnolia St, Nashville, TN",
    coBorrower: "Harper White",
    coBorrowerAddress: "852 Magnolia St, Nashville, TN",
    currentDPD: 7,
    amount: 40000,
    region: "South",
    state: "Tennessee",
  },
  {
    id: "L016",
    loanType: "Home Loan",
    borrower: "Logan Hall",
    borrowerAddress: "369 Pecan St, Charlotte, NC",
    coBorrower: "Aria Hall",
    coBorrowerAddress: "369 Pecan St, Charlotte, NC",
    currentDPD: 0,
    amount: 280000,
    region: "South",
    state: "North Carolina",
  },
  {
    id: "L017",
    loanType: "Car Loan",
    borrower: "Oliver Young",
    borrowerAddress: "147 Sycamore St, Columbus, OH",
    coBorrower: "Isabella Young",
    coBorrowerAddress: "147 Sycamore St, Columbus, OH",
    currentDPD: 5,
    amount: 32000,
    region: "Midwest",
    state: "Ohio",
  },
  {
    id: "L018",
    loanType: "Personal Loan",
    borrower: "William Harris",
    borrowerAddress: "951 Ash St, Indianapolis, IN",
    coBorrower: "Sophie Harris",
    coBorrowerAddress: "951 Ash St, Indianapolis, IN",
    currentDPD: 2,
    amount: 22000,
    region: "Midwest",
    state: "Indiana",
  },
];



const Portfolio: React.FC = () => {

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set(allColumns.map(col => col.key)));
  const isDisabled = selectedRows.size===0;
  const filteredLoans = loans.filter((loan) =>
    loan.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });

  // Dropdown state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Toggle column selection
  const toggleColumn = (key: string) => {
    setSelectedColumns((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(key)) newSelected.delete(key);
      else newSelected.add(key);
      return newSelected;
    });
  };


  const handleSort = (key: SortKey) => {
    setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // Handle row selection
  const handleRowSelect = (id: string) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedRows.size === filteredLoans.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredLoans.map((loan) => loan.id)));
    }
  };

  return (
    <Container>
      <Typography variant="h4">Portfolio</Typography>
      <FilterContainer>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            selected={selectedFilters.includes(filter)}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FilterContainer>
        
    <SearchContainer>
    <TextField
        fullWidth
        label="Search by Loan ID"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

      />
      <ButtonsContainer>
        <Button variant="contained"
                size='small'
                onClick={handleOpenMenu}
                endIcon={<ExpandMore />}
                sx={{ margin: "4px" }}
              >
                Select Columns
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            {allColumns.map(({ key, label }) => (
              <MenuItem key={key} onClick={() => toggleColumn(key)}>
                <ListItemIcon>
                  <Checkbox checked={selectedColumns.has(key)} />
                </ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
          <Button variant="contained"
                size='small'
                sx={{ margin: "4px" }}
              >
                More Filters
          </Button>
        </ButtonsContainer>
    </SearchContainer>
    <SubmitContainer>
        <ButtonsContainer>
          <Button
            variant="contained"
            disabled={isDisabled}
            sx={{
              backgroundColor: isDisabled ? "#B0C4DE" : "#1976d2", // Lightened blue when disabled
              color: isDisabled ? "#ffffff" : "#fff", // White text in both states
              marginRight:"10px",
              "&:hover": {
                backgroundColor: isDisabled ? "#B0C4DE" : "#1565C0", // Darker blue on hover when enabled
              },
            }}
          >
            Generate Sarfaesi Notice ({selectedRows.size})
          </Button>
          <Button
            variant="contained"
            disabled={isDisabled}
            sx={{
              backgroundColor: isDisabled ? "#B0C4DE" : "#1976d2", // Lightened blue when disabled
              color: isDisabled ? "#ffffff" : "#fff", // White text in both states
              "&:hover": {
                backgroundColor: isDisabled ? "#B0C4DE" : "#1565C0", // Darker blue on hover when enabled
              },
            }}
          >
            Declare NPA ({selectedRows.size})
          </Button>
        </ButtonsContainer>
        <NumberOfSelected>
          {selectedRows.size} loans selected
        </NumberOfSelected>
    </SubmitContainer>
     <TableContainer component={Paper} sx={{ maxWidth: "95%", margin: "20px auto", boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
          <TableRow>
            <TableCell>
                <Checkbox
                  checked={selectedRows.size === sortedLoans.length && sortedLoans.length > 0}
                  indeterminate={selectedRows.size > 0 && selectedRows.size < sortedLoans.length}
                  onChange={handleSelectAll}
                />
              </TableCell>{/* Dynamically Render Columns */}
              {allColumns.map(({ key, label }) =>
                selectedColumns.has(key) ? (
                  <TableCell key={key} sx={{ fontWeight: "bold" }}>
                    <TableSortLabel
                      active={sortKey === key}
                      direction={sortKey === key ? sortOrder : "asc"}
                      onClick={() => handleSort(key as SortKey)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableHead>
        <TableBody>
          {sortedLoans.map((loan) => (
            <TableRow key={loan.id} hover>
              <TableCell>
                  <Checkbox
                    checked={selectedRows.has(loan.id)}
                    onChange={() => handleRowSelect(loan.id)}
                  />
              </TableCell>
              {allColumns.map(({ key }) =>
                  selectedColumns.has(key) ? (
                    <TableCell key={key}>
                      {key === "amount"
                        ? `$${loan.amount.toLocaleString()}`
                        : loan[key as keyof Loan]}
                    </TableCell>
                  ) : null
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default Portfolio;