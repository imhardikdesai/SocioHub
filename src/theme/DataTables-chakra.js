import { useColorMode } from "@chakra-ui/react";
import DataTable, { createTheme } from "react-data-table-component";

createTheme('chakra-dark', {
  text: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
  },
  background: {
    default: '#4A5568',
  },
  context: {
    background: '#4A5568',
    text: '#FFFFFF',
  },
  divider: {
    default: '#CBD5E0',
  },
  action: {
    button: '#fff',
    hover: '#fff',
    disabled: '#fff',
  },
  row: {
    hover: '##fff',
  },
}, 'dark');
createTheme('chakra-light', {
  text: {
    primary: '#000000',
    secondary: '#000000',
  },
  background: {
    default: '#e6e6e6',
  },
  context: {
    background: '#4A5568',
    text: '#FFFFFF',
  },
  divider: {
    default: '#CBD5E0',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'default');



const ChakraDataTable = ({ columns, data }) => {
  const { colorMode } = useColorMode()
  return (
    <DataTable
      highlightOnHover={true}
      responsive={true}
      title={"User List"}
      columns={columns}
      data={data}
      pagination={true}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 20, 30]}
      theme={colorMode === 'dark' ? 'chakra-dark' : 'chakra-light'}
    />
  );
}

export default ChakraDataTable;