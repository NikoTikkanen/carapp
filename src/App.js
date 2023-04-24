
import './App.css';
import Carlist from './components/Carlist'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
       <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">
            Carshop
          </Typography>
       
        </Toolbar>
      </AppBar>
      <Carlist/>
    </div>
  );
}

export default App;
