import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import theme from '../../js/theme';
import PersonaInfo from '../PersonalInfo/PersonaInfo';
import Skill from '../Skill/Skill';
import Portfolio from '../Portfolio/Portfolio';
import './App.less';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <div id="app">
        <PersonaInfo />
        <Skill />
        <Portfolio />
      </div>
    </ThemeProvider>
  );
}

export default App;
